/**
 * Bank information
 */
export interface BankInfo {
  name: string;
  legalName: string;
}

/**
 * User's position in a vault
 */
export interface PortfolioPosition {
  vaultName: string;
  vaultAddress: string;
  chainId: number;
  decimals: number;
  depositValueInAsset: string;
  depositValueInUsd: string;
  currentValueInAsset: string;
  currentValueInUsd: string;
}

/**
 * User's complete portfolio
 */
export interface Portfolio {
  bank: BankInfo;
  walletAddress: string;
  positions: PortfolioPosition[];
}
