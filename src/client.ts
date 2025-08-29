// src/client.ts
import type { Address } from 'viem';
import { parseAbi } from 'viem';
import type { ClientConfig, CreatePoolParams } from './types';
import { FAIRPLAY_VAULT_ABI } from './abi/FairplayVault';

export class FairplayClient {
  readonly chainId: number;
  readonly vault: Address;
  readonly pub: import('viem').PublicClient;
  readonly wallet?: import('viem').WalletClient;

  constructor(cfg: ClientConfig) {
    this.chainId = cfg.chainId ?? 8453;
    this.vault = cfg.vaultAddress;
    this.pub = cfg.publicClient;
    this.wallet = cfg.walletClient;
  }

  /** Read nextPoolId() */
  nextPoolId() {
    return this.pub.readContract({
      address: this.vault,
      abi: FAIRPLAY_VAULT_ABI,
      functionName: 'nextPoolId',
    }) as Promise<bigint>;
  }

  /** Write createPool(...) */
  async createPool(cp: CreatePoolParams) {
    if (!this.wallet) throw new Error('Wallet client required');
    const sim = await this.pub.simulateContract({
      address: this.vault,
      abi: FAIRPLAY_VAULT_ABI,
      functionName: 'createPool',
      args: [cp],
      account: this.wallet.account!,
    });
    const hash = await this.wallet.writeContract(sim.request);
    const receipt = await this.pub.waitForTransactionReceipt({ hash });
    return { hash, receipt };
  }

  /** Write enter(poolId, quantity) */
  async enter(poolId: bigint, quantity: number) {
    if (!this.wallet) throw new Error('Wallet client required');
    const sim = await this.pub.simulateContract({
      address: this.vault,
      abi: FAIRPLAY_VAULT_ABI,
      functionName: 'enter',
      args: [poolId, BigInt(quantity)],
      account: this.wallet.account!,
    });
    const hash = await this.wallet.writeContract(sim.request);
    return this.pub.waitForTransactionReceipt({ hash });
  }

  /** Write revealCreator(poolId, salt) */
  async revealCreator(poolId: bigint, salt32: `0x${string}`) {
    if (!this.wallet) throw new Error('Wallet client required');
    const sim = await this.pub.simulateContract({
      address: this.vault,
      abi: FAIRPLAY_VAULT_ABI,
      functionName: 'revealCreator',
      args: [poolId, salt32],
      account: this.wallet.account!,
    });
    const hash = await this.wallet.writeContract(sim.request);
    return this.pub.waitForTransactionReceipt({ hash });
  }

  /** Write finalizeAfterDeadlines(poolId) */
  async finalizeAfterDeadlines(poolId: bigint) {
    if (!this.wallet) throw new Error('Wallet client required');
    const sim = await this.pub.simulateContract({
      address: this.vault,
      abi: FAIRPLAY_VAULT_ABI,
      functionName: 'finalizeAfterDeadlines',
      args: [poolId],
      account: this.wallet.account!,
    });
    const hash = await this.wallet.writeContract(sim.request);
    return this.pub.waitForTransactionReceipt({ hash });
  }
}
