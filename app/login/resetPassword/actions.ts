'use server';
import { createClient } from '@/utils/supabase/server';
import {
  resetEmailSchema,
  resetEmailType,
  resetPasswordSchema,
  resetPasswordType,
} from './schemas';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function sentEmail(data: resetEmailType) {
  const parsedData = resetEmailSchema.safeParse(data);
  if (!parsedData.success) {
    return 'Invalid data';
  }

  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: `${headers().get('origin')}/login/resetPassword`,
  });

  if (error) {
    return 'Could not send email';
  }

  redirect('/login/resetPassword?resetEmailSuccess=true');
}

export async function resetPassword(token: string, data: resetPasswordType) {
  const parsedData = resetPasswordSchema.safeParse(data);
  if (!parsedData.success) {
    return 'Invalid data';
  }

  const supabase = createClient();
  supabase.auth.exchangeCodeForSession(token);
  const { error } = await supabase.auth.updateUser({
    password: data.password,
  });

  if (error) {
    console.error(error);
    return 'Could not reset password';
  }

  redirect('/login');
}
