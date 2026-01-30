/**
 * Validates that a string is not empty
 */
export function isNonEmptyString(value: string): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Validates that a string is a valid Ethereum address (0x-prefixed)
 */
export function isValidEthereumAddress(address: string): boolean {
  return typeof address === 'string' && /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validates that a string is a valid UUID
 */
export function isValidUUID(uuid: string): boolean {
  return typeof uuid === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);
}

/**
 * Validates that a value is a positive number
 */
export function isPositiveNumber(value: number): boolean {
  return typeof value === 'number' && value > 0 && !isNaN(value);
}

/**
 * Validates that a string represents a valid numeric amount
 */
export function isValidAmount(amount: string): boolean {
  return typeof amount === 'string' && /^\d+$/.test(amount) && BigInt(amount) > 0n;
}
