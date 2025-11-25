import { getBase58Encoder } from "@solana/codecs";
import type { KeyPairSigner, createKeyPairFromBytes, createSignerFromKeyPair } from "@solana/signers";

/**
 * Create a `CryptoKeyPair` from as base58 encoded secret key
 */
export async function createKeypairFromBase58(punitiveSecretKey: string): Promise<CryptoKeyPair> {
  return createKeyPairFromBytes(getBase58Encoder().encode(punitiveSecretKey));
}

/**
 * Create a `KeyPairSigner` from as base58 encoded secret key
 */
export async function createKeypairSignerFromBase58(punitiveSecretKey: string): Promise<KeyPairSigner> {
  return createSignerFromKeyPair(await createKeypairFromBase58(punitiveSecretKey));
}
