import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { ArrowDown, Settings, Lock, Layers } from "lucide-react"
import { CodeBlock } from "@/app/_components/ui"

const ARCHITECTURE_LAYERS = [
  {
    label: "Your Next.js Application",
    sub: "Pages · Components · UI",
    className:
      "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800",
  },
  {
    label: "@raga-neobank/react",
    sub: "Hooks · Context · TanStack Query · Zod",
    className:
      "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800",
  },
  {
    label: "@raga-neobank/core",
    sub: "HTTP Client · Types · Error Handling",
    className:
      "bg-violet-50 border-violet-200 dark:bg-violet-950/20 dark:border-violet-800",
  },
  {
    label: "Raga Finance Backend API",
    sub: "REST · https://backend.raga.finance",
    className:
      "bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800",
  },
]

export function ArchitectureTab() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Architecture</h1>
        <p className="text-sm text-muted-foreground mt-1">
          How the packages fit together
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 pb-6">
          <div className="max-w-md mx-auto space-y-2">
            {ARCHITECTURE_LAYERS.map((layer, i) => (
              <div key={i}>
                <div
                  className={`rounded-lg border-2 px-5 py-3.5 text-center transition-transform hover:scale-[1.01] ${layer.className}`}
                >
                  <p className="font-semibold text-sm">{layer.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {layer.sub}
                  </p>
                </div>
                {i < ARCHITECTURE_LAYERS.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowDown className="h-4 w-4 text-muted-foreground/60" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm">Configuration</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { key: "apiKey", req: "Required" },
              { key: "userAddress", req: "Optional" },
              { key: "baseUrl", req: "Optional" },
              { key: "timeout", req: "Optional" },
            ].map((c, i) => (
              <div
                key={i}
                className="flex items-baseline justify-between text-sm"
              >
                <code className="font-mono text-[12px]">{c.key}</code>
                <span className="text-[11px] text-muted-foreground">
                  {c.req}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm">Authentication</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-xs text-muted-foreground mb-2">
              Headers sent automatically:
            </p>
            <div className="space-y-1.5">
              <div className="bg-muted/50 rounded px-2.5 py-1.5">
                <code className="text-[12px] font-mono">x-api-key</code>
              </div>
              <div className="bg-muted/50 rounded px-2.5 py-1.5">
                <code className="text-[12px] font-mono">x-user-address</code>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm">API Endpoints</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            {[
              "GET  /api/v1/vault/list",
              "GET  /api/v1/vault/:id",
              "POST /api/v1/sdk/getUser",
              "GET  /api/v1/sdk/portfolio",
              "POST /…/deposit",
              "POST /…/withdraw",
              "POST /…/redeem",
            ].map((ep, i) => (
              <div
                key={i}
                className="font-mono text-[11px] text-muted-foreground truncate"
              >
                {ep}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">API Response Envelope</CardTitle>
          <CardDescription>
            All responses follow a standard envelope. The SDK unwraps this
            automatically and returns only the data field.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock>{`interface ApiResponse<T> {
  code: number;          // API status code
  message: string;       // Status message
  detail: string | null; // Additional context
  data: T | null;        // ← SDK returns this
}`}</CodeBlock>
        </CardContent>
      </Card>
    </div>
  )
}
