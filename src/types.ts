// src/types.ts
import type { Address } from 'viem';

export type CreatePoolParams = {
  deadline: bigint;
  revealDeadline: bigint;
  sentinelRevealDeadline: bigint;
  maxEntries: number;
  minEntries: number;
  entryPrice: bigint;
  builderFeeBps: number;
  protocolFeeBps: number;
  creatorCommitHash: `0x${string}`;
  creatorBond: bigint;
  sentinel: Address;
  sentinelCommitHash: `0x${string}`;
  sentinelBond: bigint;
  builderFeeRecipient: Address;
};

export type ClientConfig = {
  /** Base Mainnet by default (8453) */
  chainId?: number;
  /** Vault contract address on the chosen chain */
  vaultAddress: Address;
  /** viem PublicClient for reads */
  publicClient: import('viem').PublicClient;
  /** viem WalletClient for writes */
  walletClient?: import('viem').WalletClient;
};
