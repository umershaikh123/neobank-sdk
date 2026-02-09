import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Code2 } from "lucide-react"
import { FieldsTable } from "./FieldsTable"
import { CodeBlock } from "./CodeBlock"
import type { ApiMethod } from "@/app/_data/types"

interface MethodDetailProps {
  method: ApiMethod
}

export function MethodDetail({ method }: MethodDetailProps) {
  return (
    <AccordionItem
      value={method.name}
      className="border rounded-lg px-0 mb-3 last:mb-0 data-[state=open]:shadow-sm transition-shadow"
    >
      <AccordionTrigger className="px-5 py-4 hover:no-underline">
        <div className="flex items-start gap-3 text-left w-full pr-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <code className="text-sm font-semibold font-mono">
                {method.name}
              </code>
              <Badge
                variant={
                  method.hookType === "Mutation"
                    ? "destructive"
                    : method.hookType === "Query"
                      ? "default"
                      : "secondary"
                }
                className="text-[11px]"
              >
                {method.hookType}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{method.desc}</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-5 pb-5">
        <div className="space-y-5">
          {method.hook && (
            <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-md">
              <Code2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="text-xs text-muted-foreground">React Hook:</span>
              <code className="text-[13px] font-mono font-medium">
                {method.hook}
              </code>
            </div>
          )}

          {method.params &&
            typeof method.params !== "string" &&
            Array.isArray(method.params) && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Parameters
                </h4>
                <FieldsTable fields={method.params} />
              </div>
            )}
          {method.params === "Same as buildDepositPayload" && (
            <p className="text-sm text-muted-foreground italic">
              Same parameters as buildDepositPayload
            </p>
          )}

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Returns{" "}
              <code className="text-primary font-mono ml-1">
                {method.returnType}
              </code>
            </h4>
            <FieldsTable fields={method.fields} />
          </div>

          {method.sample && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Sample Response
              </h4>
              <CodeBlock>{JSON.stringify(method.sample, null, 2)}</CodeBlock>
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
