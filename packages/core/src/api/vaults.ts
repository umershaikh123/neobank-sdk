import type { BaseClient } from './base-client';
import type { Vault } from '../types/vault';
import { ENDPOINTS } from '../utils/constants';
import { isValidUUID } from '../utils/validation';

/**
 * API client for vault-related operations (public endpoints)
 */
export class VaultsApi {
  constructor(private readonly client: BaseClient) {}

  /**
   * Fetches a list of all available vaults
   * @returns Array of vault objects
   * @throws {NeobankError} If the request fails
   */
  async list(): Promise<Vault[]> {
    return this.client.publicRequest<Vault[]>({
      endpoint: ENDPOINTS.LIST_VAULTS,
      method: 'GET',
    });
  }

  /**
   * Fetches details for a specific vault
   * @param vaultId - UUID of the vault
   * @returns Vault object
   * @throws {Error} If vaultId is invalid
   * @throws {NeobankError} If the request fails
   */
  async get(vaultId: string): Promise<Vault> {
    if (!isValidUUID(vaultId)) {
      throw new Error('vaultId must be a valid UUID');
    }

    return this.client.publicRequest<Vault>({
      endpoint: `${ENDPOINTS.GET_VAULT}/${vaultId}`,
      method: 'GET',
    });
  }
}
