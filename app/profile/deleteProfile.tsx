'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { deleteProfile } from './actions';
import { toast } from 'sonner';
import { FormEvent } from 'react';

export default function DeleteProfile() {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = await deleteProfile();
    if (error) {
      return toast(error);
    }
  };
  return (
    <Card className='w-96'>
      <CardHeader>
        <CardTitle>Delete Profile</CardTitle>
        <CardDescription>This action cannot be undone.</CardDescription>
        <CardDescription>
          This option only deletes the credentials passed after the account registration (during account creation, such as name, surname, organisation and role). For full deletion contact the support team.
        </CardDescription>
      </CardHeader>
      <CardContent className='flex justify-center'>
        <Dialog>
          <DialogTrigger>
            <Button variant='destructive'>Delete Profile</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Profile</DialogTitle>
              <DialogClose />
            </DialogHeader>
            <DialogDescription>
              Are you sure you want to delete your profile?
            </DialogDescription>
            <DialogFooter>
              <form onSubmit={onSubmit}>
                <DialogClose asChild className='mr-3'>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <Button variant='destructive' type='submit'>
                  Delete Profile
                </Button>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
