/**
 * Request payload for building transaction payloads
 */
export interface TransactionPayloadRequest {
  vaultId: string;
  amount: string;
  chainId: number;
}

/**
 * Individual transaction step in a multi-step flow
 */
export interface TransactionStep {
  step: number;
  type: 'approve' | 'deposit' | 'withdraw' | 'redeem';
  description: string;
  to: string;
  from: string;
  value: string;
  data: string;
  gasEstimate: string;
  gasCostInWei: string;
  simulationSuccess: boolean;
}

/**
 * Transaction preview information
 */
export interface TransactionPreview {
  expectedOutput: string;
  outputSymbol: string;
  exchangeRate: string;
}

/**
 * Summary of transaction details
 */
export interface TransactionSummary {
  inputAmount: string;
  assetSymbol: string;
  decimals: number;
  preview: TransactionPreview;
  warnings: string[];
  userBalance: string;
}

/**
 * Complete transaction payload response
 */
export interface TransactionPayload {
  vaultId: string;
  vaultName: string;
  vaultAddress: string;
  chainId: number;
  txs: TransactionStep[];
  summary: TransactionSummary;
}
