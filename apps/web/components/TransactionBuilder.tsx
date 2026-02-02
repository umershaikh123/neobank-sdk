"use client"

import { useState } from "react"
import { isNeobankError } from "@raga-neobank/core"
import { useBuildTransaction } from "../hooks/use-transactions"
import { cn } from "../lib/utils"

export function TransactionBuilder() {
  const [vaultId, setVaultId] = useState("e63b2ca2-75e8-43fa-9f1f-bc753502ecc8")
  const [amount, setAmount] = useState("1000000")
  const [chainId, setChainId] = useState("8453")
  const [txType, setTxType] = useState<"deposit" | "withdraw" | "redeem">(
    "deposit",
  )

  const {
    mutate: buildTransaction,
    data: result,
    isPending: loading,
    error: mutationError,
    reset,
  } = useBuildTransaction()

  const [validationError, setValidationError] = useState<string | null>(null)

  const handleBuild = () => {
    setValidationError(null)
    if (!vaultId || !amount || !chainId) {
      setValidationError("Please fill in all fields")
      return
    }

    buildTransaction({
      vaultId,
      amount,
      chainId: parseInt(chainId),
      type: txType,
    })
  }

  const getErrorMessage = (err: unknown) => {
    if (isNeobankError(err)) {
      return `Error ${err.code}: ${err.message} - ${err.detail || "No details"}`
    }
    if (err instanceof Error) {
      return err.message
    }
    return "Failed to build transaction"
  }

  const error =
    validationError || (mutationError ? getErrorMessage(mutationError) : null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Transaction Builder
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Configure and generate transaction payloads.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Configuration Panel */}
        <div className="xl:col-span-5 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6 pb-4 border-b border-gray-100">
              1. Configuration
            </h3>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 ml-1">
                  Action Type
                </label>
                <div className="grid grid-cols-3 gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
                  {["deposit", "withdraw", "redeem"].map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        setTxType(type as "deposit" | "withdraw" | "redeem")
                        reset()
                      }}
                      className={cn(
                        "py-2 text-xs font-semibold rounded-md capitalize transition-all",
                        txType === type
                          ? "bg-white text-indigo-600 shadow-sm border border-gray-100"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 ml-1">
                  Vault UUID
                </label>
                <input
                  type="text"
                  value={vaultId}
                  onChange={e => setVaultId(e.target.value)}
                  className="w-full text-sm bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-mono placeholder:text-gray-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 ml-1">
                    Amount (Wei)
                  </label>
                  <input
                    type="text"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="w-full text-sm bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 ml-1">
                    Chain ID
                  </label>
                  <input
                    type="text"
                    value={chainId}
                    onChange={e => setChainId(e.target.value)}
                    className="w-full text-sm bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-mono"
                  />
                </div>
              </div>

              <button
                onClick={handleBuild}
                disabled={loading}
                className={cn(
                  "w-full py-3 rounded-lg font-semibold text-sm shadow-sm transition-all mt-4",
                  loading
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100",
                )}
              >
                {loading ? "Generating Payload..." : "Generate Payload"}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-600">
                <span className="font-bold block mb-1">Error:</span>
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Results Panel */}
        <div className="xl:col-span-7">
          <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 min-h-[500px] flex flex-col">
            <div className="bg-gray-800/50 px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                2. Payload Output
              </h3>
              {result && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/30 uppercase tracking-wide">
                  Success
                </span>
              )}
            </div>

            <div className="p-6 flex-1 relative">
              {!result && !loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600">
                  <svg
                    className="w-12 h-12 mb-3 opacity-20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                    />
                  </svg>
                  <p className="text-sm">
                    Configure parameters to generate payload
                  </p>
                </div>
              )}

              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                  <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                  <p className="text-xs font-mono">Processing request...</p>
                </div>
              )}

              {result && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  {/* Summary Block */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                      <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider block mb-1">
                        Target Vault
                      </span>
                      <p className="text-gray-200 font-bold text-sm truncate">
                        {result.vaultName}
                      </p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                      <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider block mb-1">
                        Estimated Output
                      </span>
                      <p className="text-gray-200 font-bold text-sm">
                        {result.summary.preview.expectedOutput}{" "}
                        <span className="text-indigo-400">
                          {result.summary.preview.outputSymbol}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Steps Visualization */}
                  <div className="space-y-3">
                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider pl-1">
                      Execution Sequence
                    </p>

                    {result.txs.map((tx, idx) => (
                      <div
                        key={idx}
                        className="relative pl-6 pb-6 last:pb-0 border-l border-gray-700 ml-2"
                      >
                        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-gray-900"></div>

                        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 -mt-1.5 hover:border-gray-600 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-white bg-gray-700 px-1.5 py-0.5 rounded uppercase tracking-wider">
                              {tx.type}
                            </span>
                            <span
                              className={cn(
                                "text-[10px] px-1.5 py-0.5 rounded font-mono",
                                tx.simulationSuccess
                                  ? "text-green-400 bg-green-900/20"
                                  : "text-red-400 bg-red-900/20",
                              )}
                            >
                              Sim: {tx.simulationSuccess ? "OK" : "FAIL"}
                            </span>
                          </div>

                          <p className="text-gray-300 text-xs font-medium mb-2">
                            {tx.description}
                          </p>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-gray-900/50 p-2 rounded border border-gray-700/50">
                              <span className="block text-[9px] text-gray-500 uppercase">
                                To Address
                              </span>
                              <code className="text-[10px] text-gray-400 font-mono truncate block">
                                {tx.to}
                              </code>
                            </div>
                            <div className="bg-gray-900/50 p-2 rounded border border-gray-700/50">
                              <span className="block text-[9px] text-gray-500 uppercase">
                                Gas Limit
                              </span>
                              <code className="text-[10px] text-gray-400 font-mono block">
                                {tx.gasEstimate}
                              </code>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Warning Block */}
                  {result.summary.warnings.length > 0 && (
                    <div className="bg-yellow-900/20 border border-yellow-700/30 p-4 rounded-lg">
                      <p className="text-yellow-500 text-xs font-bold uppercase tracking-wider mb-2">
                        Warnings
                      </p>
                      <ul className="text-yellow-200/80 text-xs space-y-1 list-disc list-inside">
                        {result.summary.warnings.map((w, i) => (
                          <li key={i}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
