
import type { CreateTransactionInput, Simplify } from "../../../types";
import type { Address } from "@solana/addresses";
import type { TransactionMessageWithBlockhashLifetime, TransactionVersion } from "@solana/transaction-messages";
import type { TransactionSigner } from "@solana/signers";

export type TransactionBuilderInput<
  TVersion extends TransactionVersion = "legacy",
  TFeePayer extends Address | TransactionSigner = TransactionSigner,
  TLifetimeConstraint extends TransactionMessageWithBlockhashLifetime["lifetimeConstraint"] | undefined = undefined,
> = Simplify<
  Omit<CreateTransactionInput<TVersion, TFeePayer, TLifetimeConstraint>, "version" | "instructions" | "feePayer"> &
    Partial<Pick<CreateTransactionInput<TVersion, TFeePayer, TLifetimeConstraint>, "version">>
>;
