# FairPlayVault-fairplay-sdk
@fairplayvault/sdk (scoped &amp; publishable)
# @fairplayvault/sdk

Features
	•	📦 Typed SDK (TypeScript/ESM/CJS ready)
	•	🎲 Commit–Reveal support (commitOf, randomSalt32)
	•	🔗 FairplayClient: create pool, enter, reveal, finalize
	•	🛠 Drop-in ABI export for advanced use
 Typed client for the **Fairplay Vault** on Base (USDC commit–reveal pools).

## Install

```bash
npm install @fairplayvault/sdk viem
Usage
import { createPublicClient, createWalletClient, http, parseAbi } from 'viem';
import { base } from 'viem/chains';
import { FairplayClient, commitOf, randomSalt32 } from '@fairplayvault/sdk';

const pub = createPublicClient({ chain: base, transport: http('https://mainnet.base.org') });
const wallet = /* your viem wallet client */;
const vault = '0xYourVaultAddressOnBase';

const fp = new FairplayClient({ vaultAddress: vault, publicClient: pub, walletClient: wallet });

const salt = randomSalt32();
const cp = {
  deadline: BigInt(Math.floor(Date.now()/1000) + 30*60),
  revealDeadline: BigInt(Math.floor(Date.now()/1000) + 40*60),
  sentinelRevealDeadline: 0n,
  maxEntries: 0,
  minEntries: 0,
  entryPrice: 1_000_000n,      // 1 USDC (6 decimals)
  builderFeeBps: 200,
  protocolFeeBps: 100,
  creatorCommitHash: commitOf(salt),
  creatorBond: 50_000_000n,    // 50 USDC
  sentinel: '0x0000000000000000000000000000000000000000',
  sentinelCommitHash: '0x' + '0'.repeat(64),
  sentinelBond: 0n,
  builderFeeRecipient: '0xYourAddress'
};

const { receipt } = await fp.createPool(cp);
console.log('created at', receipt.transactionHash);

Versioning & release
	•	Start at 0.1.0.
	•	Use Changesets (optional but nice): npx changeset init
	•	Tag releases: git tag v0.1.0 && git push --tags

Publish to npm
	1.	Create an npm org for @fairplayvault (free for public packages).
	2.	Login & publish:
npm login
npm publish --access public

7) CI (optional but recommended)
	•	GitHub Actions to lint, build, type-check on PRs and publish on tags.
	•	Example: on: push: tags: ["v*"] → run npm ci && npm run build && npm publish.

License

Use MIT for maximum adoption:
MIT License
MIT License

Copyright (c) 2025 Fairplay

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

[... full MIT license text ...]
