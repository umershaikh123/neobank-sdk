import type { BaseClient } from './base-client';
import type { Portfolio } from '../types/portfolio';
import { ENDPOINTS } from '../utils/constants';

/**
 * API client for portfolio-related operations
 */
export class PortfolioApi {
  constructor(private readonly client: BaseClient) {}

  /**
   * Fetches the user's portfolio including all positions
   * @returns Portfolio object with positions
   * @throws {NeobankError} If the request fails
   */
  async getPortfolio(): Promise<Portfolio> {
    return this.client.request<Portfolio>({
      endpoint: ENDPOINTS.GET_PORTFOLIO,
      method: 'GET',
      requiresAuth: true,
    });
  }
}
