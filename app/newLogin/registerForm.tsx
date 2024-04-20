'use client';
import { z } from 'zod';
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

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordAgain: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordAgain, {
    message: 'Passwords do not match',
    path: ['passwordAgain'],
  });

type schemaType = z.infer<typeof schema>;

export default function RegisterForm() {
  const form = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      passwordAgain: '',
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordAgain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Again</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Register</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
