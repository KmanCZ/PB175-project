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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { resetEmailSchema, resetEmailType } from './schemas';
import { sentEmail } from './actions';
import { toast } from 'sonner';
import { useState } from 'react';
import Link from 'next/link';

export default function ResetEmailForm() {
  const [pending, setPending] = useState(false);
  const form = useForm<resetEmailType>({
    resolver: zodResolver(resetEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setPending(true);
    const error = await sentEmail(data);
    setPending(false);
    if (error) {
      return toast(error);
    }
  });

  return (
    <Card className="w-96 mx-auto mt-40">
      <CardHeader>
        <CardTitle>Sent email for password reset</CardTitle>
        <CardDescription>
          Enter your email address under which you created profile to receive a
          password reset link.
        </CardDescription>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="user@email.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={pending}>
              Send Email
            </Button>
            <Link href="/login" className="text-center hover:underline">
              Back to login
            </Link>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
