import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

export function DocHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-md bg-foreground flex items-center justify-center">
            <span className="text-background font-bold text-xs">R</span>
          </div>
          <span className="font-semibold text-sm tracking-tight">
            Raga SDK
          </span>
          <Badge variant="outline" className="text-[10px] ml-1">
            v0.1.0
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs gap-1.5 text-muted-foreground"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            GitHub
          </Button>
        </div>
      </div>
    </header>
  )
}
