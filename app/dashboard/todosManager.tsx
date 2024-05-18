'use client'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import createTodoForm from "./createTodoForm"
import { CheckIcon, CrossIcon, MoreVerticalIcon } from "lucide-react"
import { todo } from "@prisma/client"

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "accept",
    header: "Accept",
    cell: ({ row }) => (
      <Button variant="link" size="icon">
        <CheckIcon className="h-4 w-4" />
      </Button>
    )
  },
  {
    accessorKey: "deny",
    header: "Deny",
    cell: ({ row }) => (
      <Button variant="link" size="icon">
        <CrossIcon className="h-4 w-4" />
      </Button>
    )
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
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "info",
    header: "Info",
    cell: ({ row }) => (
      <Button variant="link" size="icon">
        <MoreVerticalIcon className="h-4 w-4" />
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

export default function TodosManager(data: todo[]) {
  var data_filtered = []
  for (var i = 0; i < data.length; i++) {
    data_filtered.push({name: data[i].name, deadline: data[i].deadline, state: data[i].accepted})
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data_filtered} />
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add todo</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New todo</DialogTitle>
            <DialogDescription>
              Fill in the needed information to create a new todo.
            </DialogDescription>
          </DialogHeader>
          {createTodoForm()}
        </DialogContent>
      </Dialog>
    </div>
  )
}
  