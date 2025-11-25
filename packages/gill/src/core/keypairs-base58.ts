import { getBase58Encoder } from "@solana/codecs";
import { KeyPairSigner, createKeyPairSignerFromBytes } from "@solana/signers";

/**
 * Create a `KeyPairSigner` from as base58 encoded secret key
 */
export async function createKeypairFromBase58(punitiveSecretKey: string): Promise<KeyPairSigner> {
  return createKeyPairSignerFromBytes(getBase58Encoder().encode(punitiveSecretKey));
}

/**
 * Create a `KeyPairSigner` from as base58 encoded secret key
 */
export async function createKeypairSignerFromBase58(punitiveSecretKey: string): Promise<KeyPairSigner> {
  return createKeypairFromBase58(punitiveSecretKey);
}
