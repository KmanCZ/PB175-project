'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { editProfileSchema, editProfileType } from './schemas';
import { editProfile } from './actions';
import { toast } from 'sonner';
import { useState } from 'react';

export default function EditProfileForm({ user }: { user: editProfileType }) {
  const [pending, setPending] = useState(false);
  const form = useForm<editProfileType>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setPending(true);
    const error = await editProfile(data);
    setPending(false);
    if (error) {
      return toast(error);
    }
  });

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 justify-center">
        <Form {...form}>
          <form
            action=""
            className="flex flex-col gap-3 justify-center"
            onSubmit={onSubmit}
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={pending}>
              Edit informaton
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
