import type { HookInfo } from "./types"

export const HOOKS_LIST: HookInfo[] = [
  {
    hook: "useVaults()",
    type: "Query",
    core: "sdk.vaults.list()",
    returns: "Vault[]",
  },
  {
    hook: "useVault(id)",
    type: "Query",
    core: "sdk.vaults.get(id)",
    returns: "Vault",
  },
  {
    hook: "useUser()",
    type: "Query",
    core: "sdk.user.getUser()",
    returns: "User",
  },
  {
    hook: "usePortfolio()",
    type: "Query",
    core: "sdk.portfolio.getPortfolio()",
    returns: "Portfolio",
  },
  {
    hook: "useBuildDeposit()",
    type: "Mutation",
    core: "sdk.transactions.buildDepositPayload()",
    returns: "TransactionPayload",
  },
  {
    hook: "useBuildWithdraw()",
    type: "Mutation",
    core: "sdk.transactions.buildWithdrawPayload()",
    returns: "TransactionPayload",
  },
  {
    hook: "useBuildRedeem()",
    type: "Mutation",
    core: "sdk.transactions.buildRedeemPayload()",
    returns: "TransactionPayload",
  },
  {
    hook: "useNeobank()",
    type: "Context",
    core: "—",
    returns: "{ sdk, config }",
  },
]
