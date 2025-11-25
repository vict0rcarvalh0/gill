/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { Rpc } from "@solana/rpc";
import { SimulateTransactionApi } from "@solana/rpc-api";
import type { TransactionMessage, TransactionMessageWithFeePayer } from "@solana/transaction-messages";
import type { FullySignedTransaction, Transaction } from "@solana/transactions";
import { simulateTransactionFactory } from "../core/simulate-transaction";

const rpc = null as unknown as Rpc<SimulateTransactionApi>;
// Note: RpcDevnet, RpcTestnet, RpcMainnet types don't exist in granular packages
// // const rpcDevnet = null as unknown as RpcDevnet<SimulateTransactionApi>;
// // const rpcTestnet = null as unknown as RpcTestnet<SimulateTransactionApi>;
// // const rpcMainnet = null as unknown as RpcMainnet<SimulateTransactionApi>;

const baseTransaction = null as unknown as Transaction;
const compilableTransaction = null as unknown as TransactionMessage & TransactionMessageWithFeePayer;
const signedTransaction = null as unknown as Transaction & FullySignedTransaction;

// [DESCRIBE] simulateTransactionFactory
{
  {
    // It typechecks when either RPC is generic.
    simulateTransactionFactory({ rpc });
    // It typechecks when the RPC clusters match.
    // simulateTransactionFactory({ rpc: rpcDevnet });
    // simulateTransactionFactory({ rpc: rpcTestnet });
    // simulateTransactionFactory({ rpc: rpcMainnet });
  }
  {
    const simulateTransaction = simulateTransactionFactory({ rpc });

    // It can accept a compilable transaction
    simulateTransaction(compilableTransaction);
    simulateTransaction(baseTransaction);

    // It can accepted a signed transaction
    simulateTransaction(signedTransaction);
  }
}
