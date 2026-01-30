import { describe, it, expect, vi } from 'vitest';
import { TransactionsApi } from '../src/api/transactions';
import { BaseClient } from '../src/api/base-client';
import type { ValidatedConfig } from '../src/config';
import type { TransactionPayloadRequest } from '../src/types/transaction';

const mockConfig: ValidatedConfig = {
  apiKey: 'test-api-key',
  userAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0',
  baseUrl: 'https://api.test.com',
  timeout: 5000,
};

describe('TransactionsApi', () => {
  describe('buildDepositPayload', () => {
    it('should validate request parameters', async () => {
      const client = new BaseClient(mockConfig);
      const api = new TransactionsApi(client);

      const invalidRequests: TransactionPayloadRequest[] = [
        { vaultId: 'invalid-uuid', amount: '1000000', chainId: 8453 },
        { vaultId: '6e9b8e9f-bb3e-4e8a-b9ea-f3ab27449b38', amount: '-100', chainId: 8453 },
        { vaultId: '6e9b8e9f-bb3e-4e8a-b9ea-f3ab27449b38', amount: '1000000', chainId: -1 },
      ];

      for (const request of invalidRequests) {
        await expect(api.buildDepositPayload(request)).rejects.toThrow(Error);
      }
    });

    it('should make request with valid parameters', async () => {
      const client = new BaseClient(mockConfig);
      const api = new TransactionsApi(client);

      const mockPayload = {
        vaultId: '6e9b8e9f-bb3e-4e8a-b9ea-f3ab27449b38',
        vaultName: 'Test Vault',
        vaultAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0',
        chainId: 8453,
        txs: [],
        summary: {
          inputAmount: '1000000',
          assetSymbol: 'USDC',
          decimals: 6,
          preview: {
            expectedOutput: '1000000',
            outputSymbol: 'wgUSDC',
            exchangeRate: '1.0',
          },
          warnings: [],
          userBalance: '5000000',
        },
      };

      vi.spyOn(client, 'request').mockResolvedValue(mockPayload);

      const request: TransactionPayloadRequest = {
        vaultId: '6e9b8e9f-bb3e-4e8a-b9ea-f3ab27449b38',
        amount: '1000000',
        chainId: 8453,
      };

      const result = await api.buildDepositPayload(request);
      expect(result).toEqual(mockPayload);
      expect(client.request).toHaveBeenCalledWith({
        endpoint: '/api/v1/sdk/buildTxPayload/deposit',
        method: 'POST',
        body: request,
        requiresAuth: true,
      });
    });
  });
});
