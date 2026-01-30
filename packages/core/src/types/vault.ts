/**
 * Strategy allocation within a vault
 */
export interface StrategyAllocation {
  strategyId: string;
  allocationSplit: number;
}

/**
 * Vault details
 */
export interface Vault {
  id: string;
  curatorId: string;
  vaultName: string;
  vaultAddress: string;
  chainId: number;
  isEnabled: boolean;
  depositEnabled: boolean;
  strategyAllocations: StrategyAllocation[];
}
