import { useNeobankContext } from '../context/NeobankContext';

/**
 * Hook to access the initialized Neobank SDK instance and configuration
 */
export function useNeobank() {
  return useNeobankContext();
}
