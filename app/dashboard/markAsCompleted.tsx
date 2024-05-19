'use client'

import { todo, user_profile } from "@prisma/client";
import { FormEvent } from "react";
import { toast } from "sonner";
import { markTodoAsCompleted } from "./actions";
import { profile } from "console";
import { CheckIcon } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";


export default function MarkAsCompleted({todo}: {todo: {name: string, deadline: Date | null, todo_id: string, profile: user_profile}}) {
  const onClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = await markTodoAsCompleted(todo.todo_id, todo.profile.user_id);
    if (error) {
      return toast(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="icon">
          <CheckIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mark as completed</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to mark this todo as completed?
        </DialogDescription>
        <DialogFooter>
          <form onClick={onClick}>
          <DialogClose asChild className='mr-3'>
            <Button type='button' variant='secondary'>
              Close
            </Button>
          </DialogClose>
          <Button variant='destructive' type='submit'>
            Mark as completed
          </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}