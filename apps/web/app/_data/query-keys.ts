import type { QueryKeyInfo } from "./types"

export const QUERY_KEYS: QueryKeyInfo[] = [
  { key: "neobankKeys.vaults.all()", scope: "All vault list queries" },
  { key: "neobankKeys.vaults.detail(id)", scope: "Single vault query by ID" },
  { key: "neobankKeys.user(address)", scope: "User profile for a wallet" },
  { key: "neobankKeys.portfolio(address)", scope: "Portfolio for a wallet" },
]
