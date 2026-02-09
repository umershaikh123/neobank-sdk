export const neobankKeys = {
  all: ['raga-neobank'] as const,
  user: (address?: string) => [...neobankKeys.all, 'user', address] as const,
  portfolio: (address?: string) => [...neobankKeys.all, 'portfolio', address] as const,
  vaults: {
    all: () => [...neobankKeys.all, 'vaults'] as const,
    detail: (id: string) => [...neobankKeys.all, 'vaults', id] as const,
  },
};
