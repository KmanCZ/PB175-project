'use client'

import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { FormEvent } from "react";
import { acceptTodo } from "./actions";

export default function AcceptTodo({data}: {id: string}) {
    console.log(data.id)
    const onClick = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const error = await acceptTodo(data.id);
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