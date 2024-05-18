'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { getTodos } from "./actions"
import { todo, user_profile } from "@prisma/client"
import { toast } from "sonner"
import { CheckIcon, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "done",
    header: "Done",
    cell: ({ row }) => (
      <Button variant="link" size="icon">
        <CheckIcon className="h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
  },
  {
    accessorKey: "info",
    header: "Info",
    cell: ({ row }) => (
      <Button variant="link" size="icon">
        <MoreVertical className="h-4w-4" />
      </Button>
    )
  }
]

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }
   
  export function DataTable<TData, TValue>({
    columns,
    data,
  }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    })
   
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )
  }

export default async function TodosEmployee(profile: user_profile) {
  /**var todos: todo[] | string = await getTodos(profile);
  var data = [];

  if (typeof todos == "string") {
    return toast(todos);
  }

  for (var i = 0; i < todos.length; i++) {
    data.push({name: todos[i].name, deadline: todos[i].deadline})
  }**/

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={[{name: "tester", deadline: undefined}]} />
    </div>
  )
}
  