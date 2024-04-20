'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createProfileSchema, createProfileType } from './schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { createProfile } from './actions';
import { toast } from 'sonner';

export default function CreateProfileForm() {
  const [pending, setPending] = useState(false);
  const form = useForm<createProfileType>({
    resolver: zodResolver(createProfileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      organization: '',
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    if (pending) return;
    setPending(true);
    const error = await createProfile(data);
    setPending(false);
    toast(error);
  });

  return (
    <Card className="w-96 mx-auto mt-28">
      <CardHeader>
        <CardTitle>Create Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 justify-center">
        <Form {...form}>
          <form
            method="POST"
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
                    <Input {...field} placeholder="John" />
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
                    <Input {...field} placeholder="Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Acme Corp" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role in organization" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={pending}>
              Create Profile
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
