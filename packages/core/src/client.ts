import { validateConfig, type NeobankConfig } from './config';
import { BaseClient } from './api/base-client';
import { TransactionsApi } from './api/transactions';
import { UserApi } from './api/user';
import { PortfolioApi } from './api/portfolio';
import { VaultsApi } from './api/vaults';

/**
 * Main SDK class for interacting with the Raga Neobank API
 *
 * @example
 * ```typescript
 * const sdk = new NeobankSDK({
 *   apiKey: 'client_abc123',
 *   userAddress: '0x...'
 * });
 *
 * // Fetch vaults
 * const vaults = await sdk.vaults.list();
 *
 * // Fetch user portfolio
 * const portfolio = await sdk.portfolio.getPortfolio();
 *
 * // Build deposit transaction
 * const depositTx = await sdk.transactions.buildDepositPayload({
 *   vaultId: '6e9b8e9f-bb3e-4e8a-b9ea-f3ab27449b38',
 *   amount: '1000000',
 *   chainId: 8453
 * });
 * ```
 */
export class NeobankSDK {
  /**
   * Transaction building operations (deposit, withdraw, redeem)
   */
  public readonly transactions: TransactionsApi;

  /**
   * User account operations
   */
  public readonly user: UserApi;

  /**
   * Portfolio operations
   */
  public readonly portfolio: PortfolioApi;

  /**
   * Vault operations (public endpoints)
   */
  public readonly vaults: VaultsApi;

  /**
   * Creates a new instance of the Neobank SDK
   * @param config - SDK configuration options
   * @throws {Error} If configuration is invalid
   */
  constructor(config: NeobankConfig) {
    const validatedConfig = validateConfig(config);
    const baseClient = new BaseClient(validatedConfig);

    // Initialize API modules
    this.transactions = new TransactionsApi(baseClient);
    this.user = new UserApi(baseClient);
    this.portfolio = new PortfolioApi(baseClient);
    this.vaults = new VaultsApi(baseClient);
  }
}
