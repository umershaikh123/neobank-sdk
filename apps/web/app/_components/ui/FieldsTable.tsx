import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import type { MethodField } from "@/app/_data/types"

interface FieldsTableProps {
  fields: MethodField[] | string
}

export function FieldsTable({ fields }: FieldsTableProps) {
  if (typeof fields === "string") {
    return <p className="text-sm text-muted-foreground">{fields}</p>
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold w-50">Field</TableHead>
            <TableHead className="font-semibold w-40">Type</TableHead>
            <TableHead className="font-semibold">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((f, i) => (
            <TableRow key={i}>
              <TableCell className="font-mono text-[13px] text-primary/80">
                {f.name}
              </TableCell>
              <TableCell className="text-muted-foreground text-[13px]">
                {f.type}
              </TableCell>
              <TableCell className="text-sm">{f.desc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
