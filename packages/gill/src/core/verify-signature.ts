import { Address, getPublicKeyFromAddress } from "@solana/addresses";
import type { ReadonlyUint8Array } from "@solana/codecs";
import { getBase58Encoder } from "@solana/codecs";
import { assertIsSignatureBytes, verifySignature } from "@solana/keys";


/**
 * Verifies a Solana Address had signed the given message.
 *
 * @param address - The Solana address expected to have signed the message
 * @param signature - The signature to verify
 * @param signedMessage - The original message that was signed
 * @returns Promise that resolves to `true` if the signature is valid, `false` otherwise
 *
 * @example
 * ```typescript
 * const isValid = await verifySignatureForAddress(
 *   "GC5AFcYqshWUnNK23MbWTXPix3FUagZt4fjUAt88FT59" as Address,
 *   "jrZaHRqiRojydQMxHqqe7FEkfeyw64KfPdF2ww1mm3hpVtGyxBvEU5NmHdZFoawYnYu62ujgqw3gcL2XHYbxd9K",
 *   "Hello, Solana!!"
 * );
 * console.log(isValid); // true or false
 * ```
 */
export async function verifySignatureForAddress(
  address: Address,
  signature: string | Uint8Array | ReadonlyUint8Array,
  message: string | Uint8Array,
): Promise<boolean> {
  const publicKey = await getPublicKeyFromAddress(address);
  if (typeof message === "string") {
    message = new TextEncoder().encode(message);
  }
  // Convert signature to Uint8Array if it's a string
  let signatureBytes: Uint8Array;
  if (typeof signature === "string") {
    const encoded = getBase58Encoder().encode(signature);
    signatureBytes = new Uint8Array(encoded);
  } else {
    // Convert ReadonlyUint8Array to Uint8Array
    signatureBytes = signature instanceof Uint8Array ? signature : new Uint8Array(signature);
  }
  // Assert it's a valid signature (64 bytes)
  assertIsSignatureBytes(signatureBytes);
  return verifySignature(publicKey, signatureBytes, message);
}
