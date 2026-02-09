# @raga-neobank/react

Headless React hooks and context for the Raga Neobank SDK. Built on top of TanStack Query (React Query) to provide robust state management, caching, and data fetching for your financial applications.

## Features

- **Headless UI**: Complete control over rendering and styling.
- **TanStack Query Power**: Built-in caching, loading states, and automatic re-fetching.
- **Type-Safe**: Fully typed hooks for data and mutations.
- **Context-Aware**: Simplified authentication and SDK instance management.
- **Zero Configuration**: Sensible defaults for stale times and invalidation strategies.

## Installation

```bash
npm install @raga-neobank/react @raga-neobank/core @tanstack/react-query
# or
pnpm add @raga-neobank/react @raga-neobank/core @tanstack/react-query
# or
yarn add @raga-neobank/react @raga-neobank/core @tanstack/react-query
```

> Note: `@raga-neobank/core` and `@tanstack/react-query` are peer dependencies.

## Setup

Wrap your application with the `NeobankProvider` to initialize the SDK context.

```tsx
import { NeobankProvider } from '@raga-neobank/react';
import { QueryClient } from '@tanstack/react-query';

// Optional: Pass your own QueryClient instance
const queryClient = new QueryClient();

function App() {
  const config = {
    apiKey: 'your-api-key',
    userAddress: '0x...', // Optional: defaults to unauthenticated if omitted
    baseUrl: 'https://backend.raga.finance' // Optional
  };

  return (
    <NeobankProvider config={config} queryClient={queryClient}>
      <YourApp />
    </NeobankProvider>
  );
}
```

## Hooks

### `useVaults`

Fetch the list of available strategy vaults.

```tsx
import { useVaults } from '@raga-neobank/react';

function VaultList() {
  const { data: vaults, isLoading, error } = useVaults();

  if (isLoading) return <div>Loading...</div>;
  
  return (
    <ul>
      {vaults?.map(vault => (
        <li key={vault.id}>{vault.vaultName}</li>
      ))}
    </ul>
  );
}
```

### `useUser`

Fetch the authenticated user's profile details.

```tsx
import { useUser } from '@raga-neobank/react';

function UserProfile() {
  const { data: user } = useUser();
  
  if (!user) return null;
  
  return (
    <div>
      <h1>Welcome, {user.id}</h1>
      <p>Status: {user.isEnabled ? 'Active' : 'Disabled'}</p>
    </div>
  );
}
```

### `usePortfolio`

Fetch the user's portfolio positions and bank details.

```tsx
import { usePortfolio } from '@raga-neobank/react';

function Portfolio() {
  const { data: portfolio } = usePortfolio();
  
  return (
    <div>
      <h2>Managed by {portfolio?.bank.name}</h2>
      {portfolio?.positions.map(pos => (
        <div key={pos.vaultAddress}>
          {pos.vaultName}: ${pos.currentValueInUsd}
        </div>
      ))}
    </div>
  );
}
```

### Transaction Hooks

Generate transaction payloads for deposits, withdrawals, and redemptions.

- `useBuildDeposit()`
- `useBuildWithdraw()`
- `useBuildRedeem()`

```tsx
import { useBuildDeposit } from '@raga-neobank/react';

function DepositForm() {
  const { mutate: buildDeposit, data: result, isPending } = useBuildDeposit();

  const handleDeposit = () => {
    buildDeposit({
      vaultId: '...',
      amount: '1000000', // 1 USDC
      chainId: 8453
    });
  };

  return (
    <div>
      <button onClick={handleDeposit} disabled={isPending}>
        {isPending ? 'Generating...' : 'Deposit'}
      </button>
      
      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}
```

## Advanced Usage

### Accessing SDK Directly

If you need to access the raw SDK instance or current configuration:

```tsx
import { useNeobank } from '@raga-neobank/react';

function MyComponent() {
  const { sdk, config } = useNeobank();
  // ...
}
```

### Query Keys

We export a query key factory `neobankKeys` to help you manually invalidate or manage queries.

```tsx
import { useQueryClient } from '@tanstack/react-query';
import { neobankKeys } from '@raga-neobank/react';

function RefreshButton() {
  const queryClient = useQueryClient();
  
  const refreshVaults = () => {
    // Invalidate all vault queries
    queryClient.invalidateQueries({ queryKey: neobankKeys.vaults.all() });
  };
  
  return <button onClick={refreshVaults}>Refresh</button>;
}
```

## License

MIT
