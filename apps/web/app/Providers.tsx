"use client"
import React from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { NeobankProvider } from "@raga-neobank/react"

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_NEOBANK_API_KEY || "demo-key",
    userAddress: process.env.NEXT_PUBLIC_USER_ADDRESS?.toLowerCase() || "",
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NeobankProvider config={config}>{children}</NeobankProvider>
      <ReactQueryDevtools
        initialIsOpen={false}
        theme="dark"
        client={queryClient}
      />
    </QueryClientProvider>
  )
}
