'use client'

import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { FormEvent } from "react";
import { denyTodo } from "./actions";
import { user_profile } from "@prisma/client";

export default function DenyTodo({todo}: {todo: {name: string, description: string | undefined, deadline: string | null, state: string, id: string, assignees: user_profile[][], employees: user_profile[]}}) {
    const onClick = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const error = await denyTodo(todo.id);
      if (error) {
        return toast(error);
      }
    };

    return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" size="icon">
              <XIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Deny todo</DialogTitle>
              <DialogClose />
            </DialogHeader>
            <DialogDescription>
              Are you sure you want to deny this todo?
            </DialogDescription>
            <DialogFooter>
              <form onClick={onClick}>
              <DialogClose asChild className='mr-3'>
                <Button type='button' variant='secondary'>
                  Close
                </Button>
              </DialogClose>
              <Button variant='destructive' type='submit'>
                Deny
              </Button>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    )
}