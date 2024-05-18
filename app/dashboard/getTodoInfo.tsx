'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogHeader } from "@/components/ui/dialog"
import { todo } from "@prisma/client"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { MoreVerticalIcon } from "lucide-react"

export default function getTodoInfo(data: todo) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="icon">
          <MoreVerticalIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Card className='flex flex-col w-96 mx-auto mt-4'>
          <CardHeader>
            <CardTitle>{data.name}</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-3'>
            <p>Description:</p>
            {data.description == null ? <p>none</p> : <p>{data.description}</p>}
            <p>Deadline</p>
            {data.deadline == null ? "none" : <Date>{data.deadline}</Date>}  
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}