'use client';

import { type Portfolio as PortfolioType, isNeobankError } from '@raga-neobank/core';
import { usePortfolio } from '../hooks/use-portfolio';
import { cn } from '../lib/utils';

export function Portfolio() {
  const { data: portfolio, isLoading, error, refetch } = usePortfolio();

  if (isLoading) {
    return <div className="h-64 rounded-xl bg-gray-50 border border-gray-100 animate-pulse" />;
  }

  if (error || !portfolio) return null;

  // Calculate totals
  const totalValue = portfolio.positions.reduce((acc, pos) => acc + Number(pos.currentValueInUsd), 0) / 1e6;
  const totalDeposit = portfolio.positions.reduce((acc, pos) => acc + Number(pos.depositValueInUsd), 0) / 1e6;
  const totalProfit = totalValue - totalDeposit;
  const totalProfitPercent = totalDeposit > 0 ? (totalProfit / totalDeposit) * 100 : 0;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-full">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">Portfolio Overview</h2>
          <p className="text-sm text-gray-500 mt-0.5">Performance metrics and asset distribution</p>
        </div>
        <div className="text-right hidden sm:block">
           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Managed By</p>
           <p className="text-xs font-semibold text-indigo-600">{portfolio.bank.name}</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Net Worth</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Total Return</p>
            <div className="flex items-baseline gap-2">
              <p className={cn("text-2xl font-bold", totalProfit >= 0 ? "text-green-600" : "text-red-600")}>
                {totalProfit >= 0 ? '+' : ''}{formatCurrency(totalProfit)}
              </p>
            </div>
            <span className={cn("text-xs font-medium", totalProfit >= 0 ? "text-green-600" : "text-red-600")}>
                {totalProfitPercent.toFixed(2)}% all time
            </span>
          </div>
        </div>

        {/* Positions List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800">Active Positions</h3>
            <span className="text-xs font-medium text-gray-500">{portfolio.positions.length} Assets</span>
          </div>

          {portfolio.positions.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </div>
              <p className="text-sm text-gray-600 font-medium">No active positions</p>
              <p className="text-xs text-gray-400 mt-1">Deposits will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {portfolio.positions.map((pos, idx) => {
                 const pVal = Number(pos.currentValueInUsd) / Math.pow(10, pos.decimals);
                 const pProfit = BigInt(pos.currentValueInUsd) - BigInt(pos.depositValueInUsd);
                 const isProfit = pProfit >= 0n;
                 
                 return (
                  <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-100 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-[10px] group-hover:bg-indigo-100 transition-colors">
                        $
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{pos.vaultName}</p>
                        <p className="text-[10px] text-gray-400 font-mono">Chain: {pos.chainId}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{formatCurrency(pVal)}</p>
                      <p className={cn("text-xs font-medium", isProfit ? "text-green-600" : "text-red-600")}>
                        {isProfit ? '↑' : '↓'} {(Math.abs(Number(pProfit)) / Number(pos.depositValueInUsd) * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                 );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}