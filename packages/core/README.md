# @raga-neobank/core

Type-safe SDK for the Raga Neobank API. Provides a clean, promise-based interface for interacting with vault operations, user management, and transaction building.

## Features

- **Type-safe**: Full TypeScript support with comprehensive type definitions
- **Environment-agnostic**: Works in Node.js 18+ and modern browsers
- **Zero dependencies**: Uses native `fetch` API
- **Clean API**: Intuitive, promise-based interface
- **Error handling**: Custom error class with detailed error information
- **Dual package**: Supports both ESM and CommonJS

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
  userAddress: '0x...' // Your Ethereum address
});

// Fetch available vaults
const vaults = await sdk.vaults.list();

// Get user portfolio
const portfolio = await sdk.portfolio.getPortfolio();

// Build a deposit transaction
const depositTx = await sdk.transactions.buildDepositPayload({
  vaultId: '6e9b8e9f-bb3e-4e8a-b9ea-f3ab27449b38',
  amount: '1000000', // 1 USDC (6 decimals)
  chainId: 8453 // Base network
});
```

## Configuration

### NeobankConfig

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `apiKey` | `string` | Yes | - | Your API key for authentication |
| `userAddress` | `string` | No | - | User's Ethereum address (required for authenticated endpoints) |
| `baseUrl` | `string` | No | `https://backend.raga.finance` | API base URL |
| `timeout` | `number` | No | `30000` | Request timeout in milliseconds |

### Example

```typescript
const sdk = new NeobankSDK({
  apiKey: 'client_abc123',
  userAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0',
  baseUrl: 'https://backend.raga.finance', // Optional
  timeout: 30000 // Optional
});
```

## API Reference

### Vaults API

#### `vaults.list()`

Fetches a list of all available vaults.

```typescript
const vaults = await sdk.vaults.list();

console.log(vaults[0]);
// {
//   id: '6e9b8e9f-bb3e-4e8a-b9ea-f3ab27449b38',
//   vaultName: 'My Vault',
//   vaultAddress: '0x...',
//   chainId: 8453,
//   isEnabled: true,
//   depositEnabled: true,
//   strategyAllocations: [...]
// }
```

#### `vaults.get(vaultId)`

Fetches details for a specific vault.

```typescript
const vault = await sdk.vaults.get('6e9b8e9f-bb3e-4e8a-b9ea-f3ab27449b38');
```

**Parameters:**
- `vaultId` (string): UUID of the vault

**Returns:** `Vault` object

### User API

#### `user.getUser()`

Fetches the current user's details.

```typescript
const user = await sdk.user.getUser();

console.log(user);
// {
//   id: '123e4567-e89b-12d3-a456-426614174000',
//   address: '0x...',
//   isEnabled: true,
//   bankId: '123e4567-e89b-12d3-a456-426614174001',
//   createdOn: '2025-01-01T00:00:00Z',
//   updatedOn: '2025-01-01T00:00:00Z'
// }
```

**Requires:** `userAddress` in SDK configuration

### Portfolio API

#### `portfolio.getPortfolio()`

Fetches the user's portfolio including all positions.

```typescript
const portfolio = await sdk.portfolio.getPortfolio();

console.log(portfolio);
// {
//   bank: { name: 'xyz NeoBank', legalName: 'xyz Pvt Ltd' },
//   walletAddress: '0x...',
//   positions: [
//     {
//       vaultName: 'Morpho USDC Prime Vault',
//       vaultAddress: '0x...',
//       chainId: 8453,
//       depositValueInAsset: '1000000',
//       currentValueInAsset: '1030000',
//       ...
//     }
//   ]
// }
```

**Requires:** `userAddress` in SDK configuration

### Transactions API

#### `transactions.buildDepositPayload(request)`

Builds a deposit transaction payload.

```typescript
const depositTx = await sdk.transactions.buildDepositPayload({
  vaultId: '6e9b8e9f-bb3e-4e8a-b9ea-f3ab27449b38',
  amount: '1000000', // Amount in smallest unit (wei-like)
  chainId: 8453
});

console.log(depositTx);
// {
//   vaultId: '...',
//   vaultName: 'Default Vault',
//   txs: [
//     {
//       step: 1,
//       type: 'approve',
//       description: 'Approve USDC spending for vault deposit',
//       to: '0x...',
//       from: '0x...',
//       value: '0',
//       data: '0x...',
//       gasEstimate: '38704',
//       simulationSuccess: true
//     },
//     {
//       step: 2,
//       type: 'deposit',
//       description: 'Deposit USDC into Default Vault',
//       ...
//     }
//   ],
//   summary: {
//     inputAmount: '1000000',
//     assetSymbol: 'USDC',
//     preview: { expectedOutput: '996647', ... },
//     warnings: ['Insufficient balance: ...'],
//     userBalance: '5948280'
//   }
// }
```

**Parameters:**
- `vaultId` (string): UUID of the vault
- `amount` (string): Amount to deposit (in smallest unit)
- `chainId` (number): Chain ID (e.g., 8453 for Base)

**Returns:** `TransactionPayload` with multi-step transactions

**Requires:** `userAddress` in SDK configuration

#### `transactions.buildWithdrawPayload(request)`

Builds a withdraw transaction payload.

```typescript
const withdrawTx = await sdk.transactions.buildWithdrawPayload({
  vaultId: '6e9b8e9f-bb3e-4e8a-b9ea-f3ab27449b38',
  amount: '500000',
  chainId: 8453
});
```

**Parameters:** Same as `buildDepositPayload`

**Returns:** `TransactionPayload`

#### `transactions.buildRedeemPayload(request)`

Builds a redeem transaction payload.

```typescript
const redeemTx = await sdk.transactions.buildRedeemPayload({
  vaultId: '6e9b8e9f-bb3e-4e8a-b9ea-f3ab27449b38',
  amount: '500000',
  chainId: 8453
});
```

**Parameters:** Same as `buildDepositPayload`

**Returns:** `TransactionPayload`

## Error Handling

The SDK uses a custom `NeobankError` class for all API errors.

```typescript
import { NeobankSDK, isNeobankError } from '@raga-neobank/core';

try {
  const portfolio = await sdk.portfolio.getPortfolio();
} catch (error) {
  if (isNeobankError(error)) {
    console.error(`Error ${error.code}: ${error.message}`);
    console.error(`HTTP Status: ${error.statusCode}`);
    console.error(`Details: ${error.detail}`);
  } else {
    console.error('Unknown error:', error);
  }
}
```

### NeobankError Properties

| Property | Type | Description |
|----------|------|-------------|
| `message` | `string` | Error message |
| `code` | `number` | API error code |
| `statusCode` | `number` | HTTP status code |
| `detail` | `string \| null` | Additional error details |

### Common Error Codes

- `400` - Bad Request (invalid parameters)
- `403` - Forbidden (vault not linked or deposits disabled)
- `404` - Not Found (vault or user not found)
- `408` - Request Timeout
- `500` - Server Error

## Type Exports

All TypeScript types are exported for your convenience:

```typescript
import type {
  NeobankConfig,
  Vault,
  User,
  Portfolio,
  TransactionPayload,
  TransactionPayloadRequest,
  // ... and more
} from '@raga-neobank/core';
```

## Examples

### Complete Deposit Flow

```typescript
import { NeobankSDK, isNeobankError } from '@raga-neobank/core';

const sdk = new NeobankSDK({
  apiKey: process.env.NEOBANK_API_KEY!,
  userAddress: process.env.USER_ADDRESS!
});

async function depositToVault() {
  try {
    // 1. Get available vaults
    const vaults = await sdk.vaults.list();
    const targetVault = vaults.find(v => v.depositEnabled);

    if (!targetVault) {
      throw new Error('No vaults available for deposit');
    }

    // 2. Build deposit transaction
    const depositTx = await sdk.transactions.buildDepositPayload({
      vaultId: targetVault.id,
      amount: '1000000', // 1 USDC
      chainId: targetVault.chainId
    });

    // 3. Check for warnings
    if (depositTx.summary.warnings.length > 0) {
      console.warn('Warnings:', depositTx.summary.warnings);
    }

    // 4. Execute transactions (use with ethers.js, viem, etc.)
    for (const tx of depositTx.txs) {
      console.log(`Step ${tx.step}: ${tx.description}`);
      // Execute tx.to, tx.data, tx.value with your wallet library
    }

    // 5. Verify portfolio updated
    const portfolio = await sdk.portfolio.getPortfolio();
    console.log('Updated portfolio:', portfolio);

  } catch (error) {
    if (isNeobankError(error)) {
      console.error(`API Error ${error.code}: ${error.message}`);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

depositToVault();
```

### Fetch User Portfolio

```typescript
async function displayPortfolio() {
  const portfolio = await sdk.portfolio.getPortfolio();

  console.log(`Bank: ${portfolio.bank.name}`);
  console.log(`Wallet: ${portfolio.walletAddress}`);
  console.log('Positions:');

  portfolio.positions.forEach(position => {
    const profit = BigInt(position.currentValueInUsd) - BigInt(position.depositValueInUsd);
    const profitPercent = (Number(profit) / Number(position.depositValueInUsd) * 100).toFixed(2);

    console.log(`
      Vault: ${position.vaultName}
      Deposited: $${(Number(position.depositValueInUsd) / 1e6).toFixed(2)}
      Current: $${(Number(position.currentValueInUsd) / 1e6).toFixed(2)}
      Profit: ${profitPercent}%
    `);
  });
}
```

## Browser Usage

The SDK works in browsers with native `fetch` support:

```html
<script type="module">
  import { NeobankSDK } from '@raga-neobank/core';

  const sdk = new NeobankSDK({
    apiKey: 'your-api-key',
    userAddress: '0x...'
  });

  const vaults = await sdk.vaults.list();
  console.log(vaults);
</script>
```

## Node.js Usage

Requires Node.js 18 or higher (for native `fetch` support):

```typescript
import { NeobankSDK } from '@raga-neobank/core';

const sdk = new NeobankSDK({
  apiKey: process.env.API_KEY!,
  userAddress: process.env.USER_ADDRESS!
});
```

## Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Run tests
pnpm test

# Type checking
pnpm check-types

# Linting
pnpm lint
```

## License

MIT

## Support

For issues and questions, please visit [GitHub Issues](https://github.com/Nexus-2023/neobank-sdk/issues).
