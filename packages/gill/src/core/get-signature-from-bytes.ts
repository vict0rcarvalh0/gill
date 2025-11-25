import { getBase58Decoder } from "@solana/codecs";

/**
 * Converts signature bytes to a signature string.
 * @param sigBytes - The signature bytes to convert
 * @returns The base58-encoded signature string
 */
export function getSignatureFromBytes(sigBytes: Uint8Array): string {
  return getBase58Decoder().decode(sigBytes);
}
