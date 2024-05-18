'use client'

import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
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
        <div className='flex flex-col w-96 mx-auto mt-4'>
          <CardHeader>
            <CardTitle>{data.name}</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-3'>
            <p>Description:</p>
            {data.description == null ? <p>none</p> : <p>{data.description}</p>}
            <p>Deadline</p>
            {data.deadline == null ? "none" : <Date>{data.deadline}</Date>}
          </CardContent>
        </div>
      </DialogContent>
    </Dialog>
  )
}