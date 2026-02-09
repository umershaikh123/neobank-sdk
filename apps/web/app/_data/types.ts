import type { LucideIcon } from "lucide-react"

export interface MethodField {
  name: string
  type: string
  desc: string
}

export interface ApiMethod {
  name: string
  hook?: string
  hookType: "Query" | "Mutation" | "Context"
  desc: string
  params: MethodField[] | string | null
  returnType: string
  fields: MethodField[] | string
  sample: Record<string, unknown> | null
}

export interface CoreModule {
  id: string
  name: string
  icon: LucideIcon
  desc: string
  auth: boolean
  methods: ApiMethod[]
}

export interface HookInfo {
  hook: string
  type: "Query" | "Mutation" | "Context"
  core: string
  returns: string
}

export interface QueryKeyInfo {
  key: string
  scope: string
}
