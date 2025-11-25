

import { type waitForRecentTransactionConfirmation } from "@solana/transaction-confirmation";
import { debug } from "./debug";
import { getExplorerLink } from "./explorer";
import type { BaseTransactionMessage, TransactionMessage, TransactionMessageWithFeePayer, assertIsTransactionMessageWithBlockhashLifetime } from "@solana/transaction-messages";
import { setTransactionMessageLifetimeUsingBlockhash } from "@solana/transaction-messages";
import type { FullySignedTransaction, Transaction, TransactionWithLifetime, assertIsFullySignedTransaction, assertIsSendableTransaction, assertIsTransactionWithBlockhashLifetime, assertIsTransactionWithinSizeLimit, sendAndConfirmTransactionFactory } from "@solana/transactions";
import { getBase64EncodedWireTransaction, getSignatureFromTransaction, signTransactionMessageWithSigners } from "@solana/transactions";
import type { GetLatestBlockhashApi, GetSignatureStatusesApi, SendTransactionApi, GetEpochInfoApi } from "@solana/rpc-api";
import type { Rpc } from "@solana/rpc";
import type { RpcSubscriptions } from "@solana/rpc-subscriptions";
import type { Signature } from "@solana/rpc-types";
import { Commitment } from "@solana/rpc-types";
import { SignatureNotificationsApi, SlotNotificationsApi } from "@solana/rpc-subscriptions-api";

interface SendAndConfirmTransactionWithBlockhashLifetimeConfig extends SendTransactionConfigWithoutEncoding {
  confirmRecentTransaction: (
    config: Omit<
      Parameters<typeof waitForRecentTransactionConfirmation>[0],
      "getBlockHeightExceedencePromise" | "getRecentSignatureConfirmationPromise"
    >,
  ) => Promise<void>;
  abortSignal?: AbortSignal;
  commitment: Commitment;
}

type SendTransactionConfigWithoutEncoding = Omit<
  NonNullable<Parameters<SendTransactionApi["sendTransaction"]>[1]>,
  "encoding"
>;

type SendableTransaction =
  | (TransactionMessage & TransactionMessageWithFeePayer)
  | (FullySignedTransaction & TransactionWithLifetime)
  | (BaseTransactionMessage & TransactionMessageWithFeePayer);

export type SendAndConfirmTransactionWithSignersFunction = (
  transaction: SendableTransaction,
  config?: Omit<
    SendAndConfirmTransactionWithBlockhashLifetimeConfig,
    "confirmRecentTransaction" | "rpc" | "transaction"
  >,
) => Promise<Signature>;

type SendAndConfirmTransactionWithSignersFactoryConfig<TCluster> = {
  rpc: Rpc<GetEpochInfoApi & GetSignatureStatusesApi & SendTransactionApi & GetLatestBlockhashApi> & {
    "~cluster"?: TCluster;
  };
  rpcSubscriptions: RpcSubscriptions<SignatureNotificationsApi & SlotNotificationsApi> & {
    "~cluster"?: TCluster;
  };
};

export function sendAndConfirmTransactionWithSignersFactory({
  rpc,
  rpcSubscriptions,
}: SendAndConfirmTransactionWithSignersFactoryConfig<"devnet">): SendAndConfirmTransactionWithSignersFunction;
export function sendAndConfirmTransactionWithSignersFactory({
  rpc,
  rpcSubscriptions,
}: SendAndConfirmTransactionWithSignersFactoryConfig<"testnet">): SendAndConfirmTransactionWithSignersFunction;
export function sendAndConfirmTransactionWithSignersFactory({
  rpc,
  rpcSubscriptions,
}: SendAndConfirmTransactionWithSignersFactoryConfig<"mainnet">): SendAndConfirmTransactionWithSignersFunction;
export function sendAndConfirmTransactionWithSignersFactory({
  rpc,
  rpcSubscriptions,
}: SendAndConfirmTransactionWithSignersFactoryConfig<"localnet">): SendAndConfirmTransactionWithSignersFunction;
export function sendAndConfirmTransactionWithSignersFactory<
  TCluster extends "devnet" | "mainnet" | "testnet" | "localnet" | undefined = undefined,
>({
  rpc,
  rpcSubscriptions,
}: SendAndConfirmTransactionWithSignersFactoryConfig<TCluster>): SendAndConfirmTransactionWithSignersFunction {
  // @ts-ignore - TODO(FIXME)
  const sendAndConfirmTransaction = sendAndConfirmTransactionFactory({ rpc, rpcSubscriptions });
  return async function sendAndConfirmTransactionWithSigners(transaction, config = { commitment: "confirmed" }) {
    let signedTransaction: (Transaction & FullySignedTransaction) | undefined;

    if ("messageBytes" in transaction === false) {
      if ("lifetimeConstraint" in transaction === false) {
        const { value: latestBlockhash } = await rpc.getLatestBlockhash().send({ abortSignal: config.abortSignal });
        transaction = setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, transaction);
        assertIsTransactionMessageWithBlockhashLifetime(transaction);
      }

      // Ensure the transaction has fee payer
      if ("feePayer" in transaction === false) {
        throw new Error("Transaction must have a fee payer");
      }

      // Sign the transaction and ensure it has all required properties
      signedTransaction = await signTransactionMessageWithSigners(transaction);
    }

    // If the signing branch didn't run above, `signedTx` will be undefined.
    // Use an explicit undefined check (instead of a truthy check) to avoid
    // accidental falsy value edge-cases and then assign the provided
    // `transaction` as a fully-signed transaction.
    if (!signedTransaction) {
      // Cast via unknown to acknowledge the developer intent: if the
      // caller passed a fully-signed transaction, treat it as such.
      signedTransaction = transaction as unknown as Transaction & FullySignedTransaction;
    }

    assertIsTransactionWithBlockhashLifetime(signedTransaction);
    assertIsTransactionWithinSizeLimit(signedTransaction);
    assertIsFullySignedTransaction(signedTransaction);
    assertIsSendableTransaction(signedTransaction);

    debug(`Sending transaction: ${getExplorerLink({ transaction: getSignatureFromTransaction(signedTransaction) })}`);
    debug(`Transaction as base64: ${getBase64EncodedWireTransaction(signedTransaction)}`, "debug");

    await sendAndConfirmTransaction(signedTransaction, config);
    return getSignatureFromTransaction(signedTransaction);
  };
}
