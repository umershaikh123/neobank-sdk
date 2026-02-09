import { z } from 'zod';

export const addressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address');
export const uuidSchema = z.string().uuid('Invalid UUID format');

export const transactionRequestSchema = z.object({
  vaultId: uuidSchema,
  amount: z.string().regex(/^\d+$/, 'Amount must be a positive integer string'),
  chainId: z.number().int().positive('Chain ID must be a positive integer'),
});

export type TransactionRequestInput = z.infer<typeof transactionRequestSchema>;
