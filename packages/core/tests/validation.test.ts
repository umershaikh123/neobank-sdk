import { describe, it, expect } from 'vitest';
import {
  isNonEmptyString,
  isValidEthereumAddress,
  isValidUUID,
  isPositiveNumber,
  isValidAmount,
} from '../src/utils/validation';

describe('Validation Utils', () => {
  describe('isNonEmptyString', () => {
    it('should return true for non-empty strings', () => {
      expect(isNonEmptyString('hello')).toBe(true);
      expect(isNonEmptyString('  test  ')).toBe(true);
    });

    it('should return false for empty strings', () => {
      expect(isNonEmptyString('')).toBe(false);
      expect(isNonEmptyString('   ')).toBe(false);
    });
  });

  describe('isValidEthereumAddress', () => {
    it('should return true for valid Ethereum addresses', () => {
      expect(isValidEthereumAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0')).toBe(true);
      expect(isValidEthereumAddress('0x0000000000000000000000000000000000000000')).toBe(true);
    });

    it('should return false for invalid Ethereum addresses', () => {
      expect(isValidEthereumAddress('742d35Cc6634C0532925a3b844Bc9e7595f0bEb0')).toBe(false);
      expect(isValidEthereumAddress('0xinvalid')).toBe(false);
      expect(isValidEthereumAddress('')).toBe(false);
    });
  });

  describe('isValidUUID', () => {
    it('should return true for valid UUIDs', () => {
      expect(isValidUUID('6e9b8e9f-bb3e-4e8a-b9ea-f3ab27449b38')).toBe(true);
      expect(isValidUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
    });

    it('should return false for invalid UUIDs', () => {
      expect(isValidUUID('not-a-uuid')).toBe(false);
      expect(isValidUUID('6e9b8e9f-bb3e-4e8a-b9ea')).toBe(false);
      expect(isValidUUID('')).toBe(false);
    });
  });

  describe('isPositiveNumber', () => {
    it('should return true for positive numbers', () => {
      expect(isPositiveNumber(1)).toBe(true);
      expect(isPositiveNumber(100.5)).toBe(true);
    });

    it('should return false for non-positive numbers', () => {
      expect(isPositiveNumber(0)).toBe(false);
      expect(isPositiveNumber(-1)).toBe(false);
      expect(isPositiveNumber(NaN)).toBe(false);
    });
  });

  describe('isValidAmount', () => {
    it('should return true for valid amounts', () => {
      expect(isValidAmount('1000000')).toBe(true);
      expect(isValidAmount('1')).toBe(true);
    });

    it('should return false for invalid amounts', () => {
      expect(isValidAmount('0')).toBe(false);
      expect(isValidAmount('-100')).toBe(false);
      expect(isValidAmount('100.5')).toBe(false);
      expect(isValidAmount('abc')).toBe(false);
    });
  });
});
