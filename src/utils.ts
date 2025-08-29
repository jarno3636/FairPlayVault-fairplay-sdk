// src/utils.ts
import { keccak256, hexToBytes } from 'viem';

export function randomSalt32(): `0x${string}` {
  const arr = new Uint8Array(32);
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) crypto.getRandomValues(arr);
  else for (let i = 0; i < 32; i++) arr[i] = Math.floor(Math.random() * 256);
  return ('0x' + Array.from(arr, b => b.toString(16).padStart(2,'0')).join('')) as `0x${string}`;
}
export function commitOf(salt: `0x${string}`): `0x${string}` {
  return keccak256(hexToBytes(salt));
}
