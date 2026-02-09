import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { Key } from "lucide-react"
import { CodeBlock } from "@/app/_components/ui"
import { HOOKS_LIST, QUERY_KEYS } from "@/app/_data"

export function ReactTab() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          React Hooks Reference
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          TanStack Query-powered hooks from @raga-neobank/react
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Provider Setup</CardTitle>
          <CardDescription>
            Wrap your app with NeobankProvider to initialize the SDK context and
            TanStack Query.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock>{`import { NeobankProvider } from '@raga-neobank/react';

function App() {
  return (
    <NeobankProvider
      config={{
        apiKey: 'your-api-key',
        userAddress: '0x...',
      }}
    >
      <YourApp />
    </NeobankProvider>
  );
}`}</CodeBlock>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Available Hooks</h2>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Hook</TableHead>
                <TableHead className="font-semibold w-[100px]">Type</TableHead>
                <TableHead className="font-semibold">Core Method</TableHead>
                <TableHead className="font-semibold">Returns</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {HOOKS_LIST.map((h, i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono text-[13px] font-medium">
                    {h.hook}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        h.type === "Mutation"
                          ? "destructive"
                          : h.type === "Query"
                            ? "default"
                            : "secondary"
                      }
                      className="text-[11px]"
                    >
                      {h.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-[13px] text-muted-foreground">
                    {h.core}
                  </TableCell>
                  <TableCell className="font-mono text-[13px] text-primary/80">
                    {h.returns}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Query Hooks</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            Auto-fetch on component mount with cached results and background
            re-fetching. Provide{" "}
            <code className="bg-muted px-1 py-0.5 rounded text-[13px] font-mono">
              isLoading
            </code>
            ,{" "}
            <code className="bg-muted px-1 py-0.5 rounded text-[13px] font-mono">
              error
            </code>
            , and{" "}
            <code className="bg-muted px-1 py-0.5 rounded text-[13px] font-mono">
              data
            </code>{" "}
            states automatically.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Mutation Hooks
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            Triggered on-demand via{" "}
            <code className="bg-muted px-1 py-0.5 rounded text-[13px] font-mono">
              mutate()
            </code>
            . Include Zod runtime validation before hitting the API. Provide{" "}
            <code className="bg-muted px-1 py-0.5 rounded text-[13px] font-mono">
              isPending
            </code>
            ,{" "}
            <code className="bg-muted px-1 py-0.5 rounded text-[13px] font-mono">
              error
            </code>
            , and{" "}
            <code className="bg-muted px-1 py-0.5 rounded text-[13px] font-mono">
              data
            </code>{" "}
            states.
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
            <Key className="h-[18px] w-[18px]" />
          </div>
          <div>
            <h3 className="text-base font-semibold">Query Keys</h3>
            <p className="text-sm text-muted-foreground">
              Cache management via neobankKeys factory
            </p>
          </div>
        </div>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Key Factory</TableHead>
                <TableHead className="font-semibold">Scope</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {QUERY_KEYS.map((q, i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono text-[13px] font-medium">
                    {q.key}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {q.scope}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
