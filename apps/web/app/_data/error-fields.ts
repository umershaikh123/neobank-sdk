import type { MethodField } from "./types"

export const ERROR_FIELDS: MethodField[] = [
  { name: "message", type: "string", desc: "Human-readable error description" },
  { name: "code", type: "number", desc: "API error code" },
  { name: "statusCode", type: "number", desc: "HTTP status code" },
  { name: "detail", type: "string | null", desc: "Additional error context" },
]
