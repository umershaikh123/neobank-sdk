"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Search, AlertTriangle, Code2 } from "lucide-react"
import { ModuleSection, FieldsTable } from "@/app/_components/ui"
import { CORE_MODULES, ERROR_FIELDS } from "@/app/_data"

export function CoreTab() {
  const [search, setSearch] = useState("")

  const filtered = CORE_MODULES.filter(m => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      m.name.toLowerCase().includes(q) ||
      m.methods.some(
        method =>
          method.name.toLowerCase().includes(q) ||
          method.hook?.toLowerCase().includes(q),
      )
    )
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Core SDK Reference
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            All methods in @raga-neobank/core
          </p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search methods..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {filtered.map((m, i) => (
        <div key={m.id}>
          <ModuleSection module={m} />
          {i < filtered.length - 1 && <Separator className="mt-8" />}
        </div>
      ))}

      <Separator />
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
            <AlertTriangle className="h-[18px] w-[18px]" />
          </div>
          <div>
            <h3 className="text-base font-semibold">Error Handling</h3>
            <p className="text-sm text-muted-foreground">
              All SDK errors are typed NeobankError instances
            </p>
          </div>
        </div>
        <FieldsTable fields={ERROR_FIELDS} />
        <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-md">
          <Code2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <span className="text-xs text-muted-foreground">Type guard:</span>
          <code className="text-[13px] font-mono font-medium">
            isNeobankError(error)
          </code>
          <span className="text-xs text-muted-foreground ml-1">
            — safely checks if an error is a NeobankError
          </span>
        </div>
      </div>
    </div>
  )
}
