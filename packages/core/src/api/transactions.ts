import type { BaseClient } from './base-client';
import type { TransactionPayload, TransactionPayloadRequest } from '../types/transaction';
import { ENDPOINTS } from '../utils/constants';
import { isValidUUID, isValidAmount, isPositiveNumber } from '../utils/validation';

/**
 * API client for transaction building operations
 */
export class TransactionsApi {
  constructor(private readonly client: BaseClient) {}

  /**
   * Validates transaction payload request
   */
  private validateRequest(request: TransactionPayloadRequest): void {
    if (!isValidUUID(request.vaultId)) {
      throw new Error('vaultId must be a valid UUID');
    }

    if (!isValidAmount(request.amount)) {
      throw new Error('amount must be a valid positive numeric string');
    }

    if (!isPositiveNumber(request.chainId)) {
      throw new Error('chainId must be a positive number');
    }
  }

  /**
   * Builds a deposit transaction payload
   * @param request - Deposit request parameters
   * @returns Transaction payload with multi-step transactions
   * @throws {Error} If request parameters are invalid
   * @throws {NeobankError} If the request fails
   */
  async buildDepositPayload(request: TransactionPayloadRequest): Promise<TransactionPayload> {
    this.validateRequest(request);

    return this.client.request<TransactionPayload>({
      endpoint: ENDPOINTS.BUILD_DEPOSIT_PAYLOAD,
      method: 'POST',
      body: request,
      requiresAuth: true,
    });
  }

  /**
   * Builds a withdraw transaction payload
   * @param request - Withdraw request parameters
   * @returns Transaction payload with multi-step transactions
   * @throws {Error} If request parameters are invalid
   * @throws {NeobankError} If the request fails
   */
  async buildWithdrawPayload(request: TransactionPayloadRequest): Promise<TransactionPayload> {
    this.validateRequest(request);

    return this.client.request<TransactionPayload>({
      endpoint: ENDPOINTS.BUILD_WITHDRAW_PAYLOAD,
      method: 'POST',
      body: request,
      requiresAuth: true,
    });
  }

  /**
   * Builds a redeem transaction payload
   * @param request - Redeem request parameters
   * @returns Transaction payload with multi-step transactions
   * @throws {Error} If request parameters are invalid
   * @throws {NeobankError} If the request fails
   */
  async buildRedeemPayload(request: TransactionPayloadRequest): Promise<TransactionPayload> {
    this.validateRequest(request);

    return this.client.request<TransactionPayload>({
      endpoint: ENDPOINTS.BUILD_REDEEM_PAYLOAD,
      method: 'POST',
      body: request,
      requiresAuth: true,
    });
  }
}
