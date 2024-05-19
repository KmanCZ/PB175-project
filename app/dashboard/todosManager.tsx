'use client'
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import createTodoForm from "./createTodoForm"
import { XIcon } from "lucide-react"
import { todo, todo_assignee_user, user_profile } from "@prisma/client"
import { FormEvent, useState } from "react"
import { deleteTodo } from "./actions"
import { toast } from "sonner"
import AcceptTodo from "./acceptTodo"
import DenyTodo from "./denyTodo"
import EditTodo from "./editTodo"

export function DeleteTodo(todo: todo) {
  const onClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = await deleteTodo(todo.id);
    if (error) {
      return toast(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="icon">
          <XIcon className="h-4 w-4" color="red" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete todo</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this todo?
        </DialogDescription>
        <DialogFooter>
          <form onClick={onClick}>
          <DialogClose asChild className='mr-3'>
            <Button type='button' variant='secondary'>
              Close
            </Button>
          </DialogClose>
          <Button variant='destructive' type='submit'>
            Delete todo
          </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "accept",
    header: "Accept",
    cell: ({ row }) => (
      <AcceptTodo data={row.original} />
    )
  },
  {
    accessorKey: "deny",
    header: "Deny",
    cell: ({ row }) => (
      <DenyTodo data={row.original} />
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
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => (
      <EditTodo todo={row.original} />
    )
  },
  {
    accessorKey: "delete",
    header: "Delete",
    cell: ({ row }) => (
      DeleteTodo(row.original)
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

export default function TodosManager({ input }: {data: todo[], profile: user_profile, employees: user_profile[], moreInfo: todo_assignee_user[]}) {
  var data_filtered = []
  for (var i = 0; i < input.data.length; i++) {
    var employees: string[] = [];
    for (var j = 0; j < input.moreInfo.length; j++) {
      if (input.moreInfo[j].todo_id == input.data[i].id) {
        employees.push(input.employees.filter((employee: user_profile) => employee.user_id === input.moreInfo[j].user_id))
      }
    }
    data_filtered.push({name: input.data[i].name, description: input.data[i].description, deadline: (input.data[i].deadline === null ? null : input.data[i].deadline.toLocaleDateString("en-US")), state: input.data[i].accepted === true ? "Accepted" : (input.moreInfo[i].completed === true ? "Waiting for check" : "Pending"), id: input.data[i].id, assignees: employees, employees: input.employees})
  }

  const [open, setOpen] = useState(false);

  return (
    <div className="container mx-auto py-10">
      <Dialog open={open} onOpenChange={setOpen}>
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
          {createTodoForm(input.profile, input.employees, setOpen)}
        </DialogContent>
      </Dialog>
      <DataTable columns={columns} data={data_filtered} />
    </div>
  )
}
  