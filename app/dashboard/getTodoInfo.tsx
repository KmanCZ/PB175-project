'use client'

import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { todo } from "@prisma/client"
import { MoreVerticalIcon } from "lucide-react"

export default function GetTodoInfo({todo: data}: {todo: todo}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="icon">
          <MoreVerticalIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className='flex flex-col w-96 mx-auto mt-2'>
          <CardHeader>
            <CardTitle>{data.name}</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-3'>
            <h1>Description</h1>
            {data.description === null ? <p>none</p> : <p>{data.description}</p>}
            <h1>Deadline</h1>
            {data.deadline === null ? <p>none</p> : <div>{data.deadline.toString()}</div>}
          </CardContent>
        </div>
      </DialogContent>
    </Dialog>
  )
}