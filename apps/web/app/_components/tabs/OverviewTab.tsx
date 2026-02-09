import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, GitBranch, Lock, Globe } from "lucide-react"
import { CORE_MODULES } from "@/app/_data"

export function OverviewTab() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Raga Neobank SDK</h1>
        <p className="text-muted-foreground max-w-2xl text-[15px] leading-relaxed">
          A type-safe developer toolkit for building financial applications on
          the Raga Finance platform. Two packages, one seamless experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base">@raga-neobank/core</CardTitle>
                <CardDescription>Universal API Client</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Zero-dependency HTTP client that works in Node.js, browsers, and
              CLI tools. Handles authentication, request/response processing,
              and typed error handling.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary">Zero Dependencies</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">4 Modules</Badge>
              <Badge variant="secondary">8 Methods</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <GitBranch className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base">@raga-neobank/react</CardTitle>
                <CardDescription>React Hooks & Context</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Headless React hooks built on TanStack Query. Provides caching,
              loading states, background re-fetching, and Zod runtime validation
              out of the box.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary">TanStack Query</Badge>
              <Badge variant="secondary">Zod Validation</Badge>
              <Badge variant="secondary">8 Hooks</Badge>
              <Badge variant="secondary">React 19+</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Core Methods", value: "8" },
          { label: "React Hooks", value: "8" },
          { label: "Type Definitions", value: "12+" },
          { label: "Core Dependencies", value: "0" },
        ].map((s, i) => (
          <Card key={i} className="text-center">
            <CardContent className="pt-5 pb-4">
              <p className="text-2xl font-bold tracking-tight">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CORE_MODULES.map(m => {
            const Icon = m.icon
            return (
              <Card
                key={m.id}
                className="hover:bg-muted/30 transition-colors cursor-default"
              >
                <CardContent className="flex items-center gap-3 py-4 px-5">
                  <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <Icon className="h-[18px] w-[18px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{m.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {m.methods.length} method{m.methods.length > 1 ? "s" : ""}
                    </p>
                  </div>
                  <Badge
                    variant={m.auth ? "outline" : "secondary"}
                    className="gap-1 shrink-0"
                  >
                    {m.auth ? (
                      <Lock className="h-3 w-3" />
                    ) : (
                      <Globe className="h-3 w-3" />
                    )}
                    {m.auth ? "Auth" : "Public"}
                  </Badge>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
