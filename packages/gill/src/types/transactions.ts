import type { Address } from "@solana/addresses";
import type { TransactionSigner } from "@solana/signers";
import type {
    BaseTransactionMessage,
    Instruction,
    TransactionMessageWithBlockhashLifetime,
    TransactionMessageWithFeePayer,
    TransactionMessageWithFeePayerSigner,
    TransactionVersion,
} from "@solana/transaction-messages";

import type { Simplify } from ".";

export type CreateTransactionInput<
  TVersion extends TransactionVersion | "auto",
  TFeePayer extends Address | TransactionSigner = TransactionSigner,
  TLifetimeConstraint extends TransactionMessageWithBlockhashLifetime["lifetimeConstraint"] | undefined = undefined,
> = {
  /** Compute unit limit value to set on this transaction */
  computeUnitLimit?: bigint | number;
  /** Compute unit price (in micro-lamports) to set on this transaction */
  computeUnitPrice?: bigint | number;
  /** Address or Signer that will pay transaction fees */
  feePayer: TFeePayer;
  /** List of instructions for this transaction */
  instructions: Instruction[];
  /**
   * Latest blockhash (aka transaction lifetime) for this transaction to
   * accepted for execution on the Solana network
   * */
  latestBlockhash?: TLifetimeConstraint;
  /**
   * Transaction version
   * - `auto` automatically selects based on instruction content (default)
   * - `legacy` for traditional transactions
   * - `0` for transactions using Address Lookup Tables
   *
   * @default `auto`
   * */
  version?: TVersion;
};

export type FullTransaction<
  TVersion extends TransactionVersion,
  TFeePayer extends TransactionMessageWithFeePayer | TransactionMessageWithFeePayerSigner,
  TBlockhashLifetime extends TransactionMessageWithBlockhashLifetime | undefined = undefined,
> = Simplify<
  BaseTransactionMessage<TVersion> &
    TFeePayer &
    (TBlockhashLifetime extends TransactionMessageWithBlockhashLifetime
      ? TransactionMessageWithBlockhashLifetime
      : object)
>;
