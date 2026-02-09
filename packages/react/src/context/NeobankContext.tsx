'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { NeobankSDK, type NeobankConfig } from '@raga-neobank/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export interface NeobankContextValue {
  sdk: NeobankSDK;
  config: NeobankConfig;
}

const NeobankContext = createContext<NeobankContextValue | null>(null);

export interface NeobankProviderProps {
  config: NeobankConfig;
  queryClient?: QueryClient;
  children: React.ReactNode;
}

export function NeobankProvider({ config, queryClient, children }: NeobankProviderProps) {
  // Memoize SDK instance to prevent recreation on every render
  // Only recreate if config fields change
  const sdk = useMemo(() => {
    return new NeobankSDK(config);
  }, [config.apiKey, config.userAddress, config.baseUrl, config.timeout]);

  const contextValue = useMemo(() => ({
    sdk,
    config
  }), [sdk, config]);

  // Use provided client or create a default one if not provided
  // Note: In a real app, it's better to pass the client explicitly or have a parent QueryClientProvider
  const client = useMemo(() => queryClient || new QueryClient(), [queryClient]);

  return (
    <QueryClientProvider client={client}>
      <NeobankContext.Provider value={contextValue}>
        {children}
      </NeobankContext.Provider>
    </QueryClientProvider>
  );
}

export function useNeobankContext() {
  const context = useContext(NeobankContext);
  if (!context) {
    throw new Error('useNeobankContext must be used within a NeobankProvider');
  }
  return context;
}
