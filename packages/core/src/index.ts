// Main SDK export
export { NeobankSDK } from './client';

// Configuration
export type { NeobankConfig } from './config';

// Error handling
export { NeobankError, isNeobankError, ErrorCodes } from './errors';
export type { ErrorCode } from './errors';

// Type exports
export type {
  ApiResponse,
  Vault,
  StrategyAllocation,
  User,
  Portfolio,
  PortfolioPosition,
  BankInfo,
  TransactionPayloadRequest,
  TransactionStep,
  TransactionPreview,
  TransactionSummary,
  TransactionPayload,
} from './types';
