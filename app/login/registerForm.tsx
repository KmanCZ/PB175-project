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
import { registerSchema, registerType } from './schemas';
import { register } from './actions';
import { toast } from 'sonner';
import { useState } from 'react';

export default function RegisterForm() {
  const [pending, setPending] = useState(false);
  const form = useForm<registerType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordAgain: '',
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setPending(true);
    const error = await register(data);
    setPending(false);
    if (error) {
      return toast(error);
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
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
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='user@email.com' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='passwordAgain'
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
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
