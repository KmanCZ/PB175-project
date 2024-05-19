'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { todo, user_profile } from "@prisma/client"
import GetTodoInfo from "./getTodoInfo"
import MarkAsCompleted from "./markAsCompleted"

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "done",
    header: "Done",
    cell: ({ row }) => (
      <MarkAsCompleted todo={row.original}/>
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
      <GetTodoInfo todo={row.original} />
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

export default function TodosEmployee({ data }: { data: {todos: todo[], profile: user_profile }}) {
  var data_filtered = [];
  for (var i = 0; i < data.todos.length; i++) {
    data_filtered.push({name: data.todos[i].name, deadline: (data.todos[i].deadline === null ? null : data.todos[i].deadline!.toLocaleDateString("en-US")), todo_id: data.todos[i].id, profile: data.profile, description: data.todos[i].description})
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data_filtered} />
    </div>
  )
}
