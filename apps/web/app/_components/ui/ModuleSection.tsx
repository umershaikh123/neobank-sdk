import { Accordion } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Lock, Globe } from "lucide-react"
import { MethodDetail } from "./MethodDetail"
import type { CoreModule } from "@/app/_data/types"

interface ModuleSectionProps {
  module: CoreModule
}

export function ModuleSection({ module }: ModuleSectionProps) {
  const Icon = module.icon

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
            <Icon className="h-4.5 w-4.5 text-foreground" />
          </div>
          <div>
            <h3 className="text-base font-semibold">{module.name}</h3>
            <p className="text-sm text-muted-foreground">{module.desc}</p>
          </div>
        </div>
        <Badge
          variant={module.auth ? "outline" : "secondary"}
          className="gap-1.5"
        >
          {module.auth ? (
            <Lock className="h-3 w-3" />
          ) : (
            <Globe className="h-3 w-3" />
          )}
          {module.auth ? "Authenticated" : "Public"}
        </Badge>
      </div>
      <Accordion type="multiple" className="space-y-0">
        {module.methods.map(m => (
          <MethodDetail key={m.name} method={m} />
        ))}
      </Accordion>
    </div>
  )
}
