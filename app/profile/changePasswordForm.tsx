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
import { changePasswordSchema, changePasswordType } from './schemas';
import { changePassword } from './actions';
import { toast } from 'sonner';
import { useState } from 'react';

export default function ChangePasswordForm() {
  const [pending, setPending] = useState(false);
  const form = useForm<changePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setPending(true);
    const error = await changePassword(data);
    setPending(false);
    if (error) {
      return toast(error);
    }
  });

  return (
    <Card className='w-96'>
      <CardHeader>
        <CardTitle>Change password</CardTitle>
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
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Again</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={pending}>
              Change Password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
