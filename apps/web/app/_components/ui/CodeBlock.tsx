"use client"

import { CopyButton } from "./CopyButton"

interface CodeBlockProps {
  children: string
}

export function CodeBlock({ children }: CodeBlockProps) {
  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton text={children} />
      </div>
      <pre className="bg-zinc-950 text-zinc-300 rounded-lg p-4 text-[13px] leading-relaxed overflow-x-auto font-mono border border-zinc-800">
        {children}
      </pre>
    </div>
  )
}
