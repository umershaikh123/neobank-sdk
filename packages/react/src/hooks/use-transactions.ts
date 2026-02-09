import { useMutation } from '@tanstack/react-query';
import { useNeobank } from './use-neobank';
import { transactionRequestSchema, type TransactionRequestInput } from '../validation/schemas';
import type { TransactionPayload } from '@raga-neobank/core';

/**
 * Hook to build a deposit transaction payload
 */
export function useBuildDeposit() {
  const { sdk } = useNeobank();

  return useMutation({
    mutationFn: async (input: TransactionRequestInput) => {
      // Runtime validation (fails fast before hitting SDK/API)
      const validatedInput = transactionRequestSchema.parse(input);
      return sdk.transactions.buildDepositPayload(validatedInput);
    },
  });
}

/**
 * Hook to build a withdraw transaction payload
 */
export function useBuildWithdraw() {
  const { sdk } = useNeobank();

  return useMutation({
    mutationFn: async (input: TransactionRequestInput) => {
      const validatedInput = transactionRequestSchema.parse(input);
      return sdk.transactions.buildWithdrawPayload(validatedInput);
    },
  });
}

/**
 * Hook to build a redeem transaction payload
 */
export function useBuildRedeem() {
  const { sdk } = useNeobank();

  return useMutation({
    mutationFn: async (input: TransactionRequestInput) => {
      const validatedInput = transactionRequestSchema.parse(input);
      return sdk.transactions.buildRedeemPayload(validatedInput);
    },
  });
}
