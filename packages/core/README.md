# @raga-neobank/core

The official, type-safe SDK for the Raga Neobank API. This core library provides a universal, promise-based interface for interacting with our financial infrastructure, suitable for use in Node.js backends, CLI tools, and frontend applications.

## Features

- **Universal Support**: Works in Node.js (18+) and modern browsers.
- **Full Type-Safety**: Comprehensive TypeScript definitions for all API responses and requests.
- **Zero Dependencies**: Built on the native `fetch` API for maximum compatibility and minimal bundle size.
- **Robust Error Handling**: Typed error classes for granular control over API failures.

## Installation

```bash
npm install @raga-neobank/core
# or
pnpm add @raga-neobank/core
# or
yarn add @raga-neobank/core
```

## Quick Start

```typescript
import { NeobankSDK } from '@raga-neobank/core';

// Initialize the SDK
const sdk = new NeobankSDK({
  apiKey: 'your-api-key',
  userAddress: '0x...', // Optional: Required for authenticated endpoints
});

// 1. Fetch available vaults
const vaults = await sdk.vaults.list();

// 2. Get user portfolio
const portfolio = await sdk.portfolio.getPortfolio();

// 3. Build a transaction payload
const depositTx = await sdk.transactions.buildDepositPayload({
  vaultId: vaults[0].id,
  amount: '1000000', // 1 USDC (6 decimals)
  chainId: 8453
});
```

## Modules

The SDK is organized into logical domains:

- **`sdk.vaults`**: Public endpoints to list strategies and get vault details.
- **`sdk.user`**: Manage authenticated user profiles and settings.
- **`sdk.portfolio`**: Track positions, performance, and asset allocation.
- **`sdk.transactions`**: Generate simulation-verified transaction payloads for:
    - Deposits (`buildDepositPayload`)
    - Withdrawals (`buildWithdrawPayload`)
    - Redemptions (`buildRedeemPayload`)

## Configuration

```typescript
interface NeobankConfig {
  apiKey: string;           // Required
  userAddress?: string;     // Optional (defaults to unauthenticated)
  baseUrl?: string;         // Optional (defaults to production API)
  timeout?: number;         // Optional (defaults to 30s)
}
```

## Error Handling

All API errors throw a `NeobankError`.

```typescript
import { isNeobankError } from '@raga-neobank/core';

try {
  await sdk.portfolio.getPortfolio();
} catch (error) {
  if (isNeobankError(error)) {
    console.error(`API Error ${error.code}: ${error.message}`);
  }
}
```

## License

MIT