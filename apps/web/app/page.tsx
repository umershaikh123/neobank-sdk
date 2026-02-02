"use client"

import { useMemo } from "react"
import { NeobankSDK } from "@raga-neobank/core"
import { SDKProvider } from "../lib/sdk-provider"
import { VaultList } from "../components/VaultList"
import { Portfolio } from "../components/Portfolio"
import { TransactionBuilder } from "../components/TransactionBuilder"
import { UserProfile } from "../components/UserProfile"
import "./demo.css"

export default function Home() {
  const sdk = useMemo(() => {
    const apiKey = process.env.NEXT_PUBLIC_NEOBANK_API_KEY
    const userAddress =
      process.env.NEXT_PUBLIC_USER_ADDRESS?.toLowerCase() || ""

    if (!apiKey) {
      return null
    }

    return new NeobankSDK({
      apiKey,
      userAddress,
    })
  }, [])

  if (!sdk) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <main className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.268 17c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Configuration Error
          </h1>
          <p className="text-gray-600 mb-6">
            <code className="bg-gray-100 px-1 py-0.5 rounded text-red-600 font-mono text-sm">
              NEXT_PUBLIC_NEOBANK_API_KEY
            </code>{" "}
            is not set. Please check your{" "}
            <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-900 font-mono text-sm">
              .env.local
            </code>{" "}
            file.
          </p>
          <div className="bg-blue-50 p-4 rounded-xl text-left">
            <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">
              Instructions
            </p>
            <p className="text-sm text-blue-900 leading-relaxed">
              Create a{" "}
              <code className="font-mono bg-blue-100 px-1 rounded">
                .env.local
              </code>{" "}
              file based on{" "}
              <code className="font-mono bg-blue-100 px-1 rounded">
                .env.example
              </code>{" "}
              and fill in your credentials to get started.
            </p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <SDKProvider sdk={sdk}>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
        {/* Navbar */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-md  ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                R
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">
                Raga<span className="text-gray-400 font-normal">SDK</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Documentation
              </a>
              <a
                href="#"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Support
              </a>
              <div className="w-px h-4 bg-gray-300 mx-1"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 border-2 border-white shadow-sm"></div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Developer Dashboard
              </h1>
              <p className="text-gray-500 mt-2 max-w-2xl">
                Manage your integrations, view vault performance, and test
                transaction payloads using the type-safe core SDK.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                Refresh Data
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
                Read Docs
              </button>
            </div>
          </div>

                    <div className="space-y-12">

                      

                      {/* Section 1: User & Portfolio Overview */}

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        <section>

                          <UserProfile />

                        </section>

                        <section>

                          <Portfolio />

                        </section>

                      </div>

          

                      {/* Section 2: Vaults */}

                      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

                        <VaultList />

                      </section>

          

                      {/* Section 3: Transaction Builder */}

                      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

                        <TransactionBuilder />

                      </section>

          

                    </div>
        </main>

        <footer className="bg-white border-t border-gray-200 mt-20 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-500 text-sm">
              Powered by{" "}
              <span className="font-bold text-gray-900">
                @raga-neobank/core
              </span>{" "}
              v0.1.0
            </p>
            <div className="flex justify-center gap-6 mt-4">
              <a href="#" className="text-gray-400 hover:text-gray-600 text-sm">
                GitHub
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 text-sm">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 text-sm">
                Discord
              </a>
            </div>
          </div>
        </footer>
      </div>
    </SDKProvider>
  )
}
