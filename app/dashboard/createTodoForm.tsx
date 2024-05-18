'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createTodoType, createTodoSchema } from "./schemas"
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";

import { CalendarIcon, Check } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox";   
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { createTodo } from "./actions";
import { user_profile } from "@prisma/client";
import { toast } from "sonner";

export default function createTodoForm(profile: user_profile, employees: user_profile[]) {
  const [pending, setPending] = useState(false);
  const form = useForm<createTodoType>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      name: "New todo",
      description: "",
      deadline: undefined,
      assignees: undefined,
    },
  })
   
  const onSubmit = form.handleSubmit(async (data) => {
    if (pending) return;
    setPending(true);
    const error = await createTodo(profile, data.name, data.description, data.deadline, data.assignees);
    setPending(false);
    if (error) {
      return toast(error);
    }
  });

  var employeesParsed: {name: string}[] = [];
  for (var i = 0; i < employees.length; i++) {
    employeesParsed.push({name: employees[i].first_name + " " + employees[i].last_name})
  }

  return (
    <Card className='w-96 mx-auto mt-4'>
      <CardHeader>
        <CardTitle>Create todo</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-3 justify-center'>
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
                <TableRow>
                  <TableHead className="w-[100px]">Select</TableHead>
                  <TableHead>Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
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
            <Button type='submit'>Create</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}