import { useQuery } from '@tanstack/react-query';
import { useNeobank } from './use-neobank';
import { neobankKeys } from '../lib/query-keys';
import type { Vault } from '@raga-neobank/core';

/**
 * Hook to fetch all available vaults
 */
export function useVaults() {
  const { sdk } = useNeobank();

  return useQuery({
    queryKey: neobankKeys.vaults.all(),
    queryFn: () => sdk.vaults.list(),
  });
}

/**
 * Hook to fetch a specific vault by ID
 */
export function useVault(vaultId: string) {
  const { sdk } = useNeobank();

  return useQuery({
    queryKey: neobankKeys.vaults.detail(vaultId),
    queryFn: () => sdk.vaults.get(vaultId),
    enabled: !!vaultId,
  });
}
