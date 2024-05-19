'use client'

import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { acceptTodo } from "./actions";
import { user_profile } from "@prisma/client";

export default function AcceptTodo({todo}: {todo: {name: string, description: string | undefined, deadline: string | null, state: string, id: string, assignees: user_profile[], employees: user_profile[]}}) {
    const onClick = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const error = await acceptTodo(todo.id);
      if (error) {
        return toast(error);
      }
      setOpen(false);
    };
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="link" size="icon">
              <CheckIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Accept todo</DialogTitle>
              <DialogClose />
            </DialogHeader>
            <DialogDescription>
              Are you sure you want to accept this todo?
            </DialogDescription>
            <DialogFooter>
              <form onClick={onClick}>
              <DialogClose asChild className='mr-3'>
                <Button type='button' variant='secondary'>
                  Close
                </Button>
              </DialogClose>
              <Button variant='destructive' type='submit'>
                Accept
              </Button>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    )
}