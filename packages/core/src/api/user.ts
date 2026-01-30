import type { BaseClient } from './base-client';
import type { User } from '../types/user';
import { ENDPOINTS } from '../utils/constants';

/**
 * API client for user-related operations
 */
export class UserApi {
  constructor(private readonly client: BaseClient) {}

  /**
   * Fetches the current user's details
   * @returns User object
   * @throws {NeobankError} If the request fails
   */
  async getUser(): Promise<User> {
    return this.client.request<User>({
      endpoint: ENDPOINTS.GET_USER,
      method: 'POST',
      requiresAuth: true,
    });
  }
}
