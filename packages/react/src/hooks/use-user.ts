import { useQuery } from '@tanstack/react-query';
import { useNeobank } from './use-neobank';
import { neobankKeys } from '../lib/query-keys';

/**
 * Hook to fetch current user details
 * Automatically disabled if userAddress is not configured
 */
export function useUser() {
  const { sdk, config } = useNeobank();

  return useQuery({
    queryKey: neobankKeys.user(config.userAddress),
    queryFn: () => sdk.user.getUser(),
    enabled: !!config.userAddress,
  });
}

/**
 * Hook to fetch current user's portfolio
 * Automatically disabled if userAddress is not configured
 */
export function usePortfolio() {
  const { sdk, config } = useNeobank();

  return useQuery({
    queryKey: neobankKeys.portfolio(config.userAddress),
    queryFn: () => sdk.portfolio.getPortfolio(),
    enabled: !!config.userAddress,
  });
}
