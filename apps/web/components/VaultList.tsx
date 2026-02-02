'use client';

import { isNeobankError } from '@raga-neobank/core';
import { useVaults } from '../hooks/use-vaults';
import { cn } from '../lib/utils';

export function VaultList() {
  const { data: vaults = [], isLoading, error, refetch } = useVaults();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="h-48 rounded-xl bg-gray-50 border border-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 border border-red-100 rounded-xl">
        <p className="text-red-800 font-medium mb-2">Could not load vaults</p>
        <button onClick={() => refetch()} className="text-sm underline text-red-600 hover:text-red-800">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Vault Strategies</h2>
          <p className="text-sm text-gray-500 mt-1">Select a vault to start depositing assets.</p>
        </div>
        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
          {vaults.length} Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
        {vaults.map((vault) => (
          <div 
            key={vault.id} 
            className="group relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset",
                  vault.isEnabled ? "bg-green-50 text-green-700 ring-green-600/20" : "bg-gray-50 text-gray-600 ring-gray-500/20"
                )}>
                  {vault.isEnabled ? 'Live' : 'Inactive'}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                {vault.vaultName}
              </h3>
              
              <div className="flex items-center gap-2 mb-4">
                 <span className="text-xs text-gray-500 font-medium">Chain ID: {vault.chainId}</span>
                 <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
                 <code className="text-xs text-gray-500 font-mono bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                   {vault.vaultAddress.slice(0, 6)}...{vault.vaultAddress.slice(-4)}
                 </code>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-50 mt-auto">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Deposit Status</span>
                <div className="flex items-center gap-1.5">
                  <span className={cn("w-2 h-2 rounded-full ring-2 ring-white shadow-sm", vault.depositEnabled ? "bg-green-500" : "bg-red-500")}></span>
                  <span className={cn("font-semibold text-xs", vault.depositEnabled ? "text-gray-900" : "text-gray-500")}>
                    {vault.depositEnabled ? 'Open for Deposits' : 'Closed'}
                  </span>
                </div>
              </div>

              <button className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-900 text-xs font-bold uppercase tracking-wider rounded-lg border border-gray-200 transition-colors">
                View Strategy
              </button>
            </div>
          </div>
        ))}
        
        {/* Empty State Placeholder to fill grid if needed or just show available space */}
        {vaults.length === 0 && (
          <div className="col-span-full py-12 text-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl">
             <p className="text-gray-500 font-medium">No vaults found</p>
          </div>
        )}
      </div>
    </div>
  );
}