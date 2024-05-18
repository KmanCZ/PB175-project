'use client'

import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CalendarIcon, PencilIcon } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form"
import { createTodoSchema, createTodoType } from "./schemas"
import { toast } from "sonner";
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { updateTodo } from "./actions"
import { user_profile } from "@prisma/client"

export default function EditTodo({todo}: {name: string, description: string | undefined, deadline: string | null, state: string, id: string, assignees: user_profile[], employees: user_profile[]}) {
    const [pending, setPending] = useState(false);
    var assignees_ids: string[] = []
    for (var i = 0; i < todo.assignees.length; i++) {
      assignees_ids.push(todo.assignees[i].user_id)
    }
    const form = useForm<createTodoType>({
      resolver: zodResolver(createTodoSchema),
      defaultValues: {
        name: todo.name,
        description: todo.description,
        deadline: (todo.deadline === null ? undefined : new Date(todo.deadline)),
        assignees: assignees_ids
      },
    })

    const onSubmit = form.handleSubmit(async (data) => {
      if (pending) return;
      setPending(true);
      const error = await updateTodo(todo.id, todo.name, todo.description, todo.deadline, todo.assignees);
      setPending(false);
      if (error) {
        return toast(error);
      }
      form.reset()
    });
  
    return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="icon">
          <PencilIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col gap-3 justify-center'>
          <CardHeader>
            <CardTitle>Edit todo</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-3'>
            <Form {...form}>
              <form
                action=''
                className='flex flex-col gap-3 justify-center'
                onSubmit={onSubmit}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} type='name' />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} type='description' />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='deadline'
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Deadline</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
    
                
                <Table>
                  <TableHeader>
                    <FormLabel>
                      Assignees
                    </FormLabel>
                    <TableRow>
                      <TableHead className="w-[100px]">Select</TableHead>
                      <TableHead>Name</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todo.employees.map((employee: user_profile) => (
                      <FormField
                        key={employee.user_id}
                        control={form.control}
                        name="assignees"
                        render={({ field }) => {
                          return (
                            <TableRow>
                              <TableCell>
                                <FormItem
                                  key={employee.user_id}
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(employee.user_id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, employee.user_id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== employee.user_id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                </FormItem>
                              </TableCell>
                              <TableCell>
                                {employee.first_name + " " + employee.last_name}
                              </TableCell>
                            </TableRow>
                          )
                        }}
                      />
                    ))}
                  </TableBody>
                </Table>
                <Button type='submit'>Save</Button>
              </form>
            </Form>
          </CardContent>
      </DialogContent>
    </Dialog>
  )
}