'use client';

import { isNeobankError } from '@raga-neobank/core';
import { useUser } from '../hooks/use-user';
import { cn } from '../lib/utils';

export function UserProfile() {
  const { data: user, isLoading, error, refetch } = useUser();

  if (isLoading) {
    return (
      <div className="w-full h-48 rounded-xl bg-white border border-gray-200 animate-pulse" />
    );
  }

  if (error) {
    let errorMessage = 'Failed to fetch user';
    if (isNeobankError(error)) {
      errorMessage = `Error ${error.code}: ${error.message}`;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return (
      <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-900">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold">Profile Error</h3>
          <button 
            onClick={() => refetch()}
            className="text-xs font-medium text-red-700 hover:text-red-900 underline"
          >
            Retry
          </button>
        </div>
        <p className="text-xs opacity-80 break-words">{errorMessage}</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold shadow-inner ring-2 ring-white">
            {user.id.substring(0, 2).toUpperCase()}
          </div>
          <span className={cn(
            "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset",
            user.isEnabled 
              ? "bg-green-50 text-green-700 ring-green-600/20" 
              : "bg-red-50 text-red-700 ring-red-600/20"
          )}>
            {user.isEnabled ? 'Active' : 'Disabled'}
          </span>
        </div>
        
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">User Account</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <p className="text-xs text-gray-500 font-medium">Online</p>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-gray-100">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">User ID</p>
              <p className="text-sm font-medium text-gray-900 font-mono truncate" title={user.id}>
                {user.id}
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Wallet Address</p>
              <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1.5 rounded-md border border-gray-100">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                <code className="text-xs text-gray-600 font-mono truncate flex-1" title={user.address}>
                  {user.address}
                </code>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Bank ID</p>
                <p className="text-xs font-medium text-gray-900 truncate" title={user.bankId}>{user.bankId.split('-')[0]}...</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Joined</p>
                <p className="text-xs font-medium text-gray-900">
                  {new Date(user.createdOn).toLocaleDateString(undefined, { month: 'short', year: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}