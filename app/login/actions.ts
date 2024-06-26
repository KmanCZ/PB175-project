'use server';
import { redirect } from 'next/navigation';
import {
  loginType,
  loginSchema,
  registerType,
  registerSchema,
} from './schemas';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';

export async function login(formData: loginType) {
  const parsedData = await loginSchema.safeParse(formData);
  if (!parsedData.success) {
    return 'Invalid form data';
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    return 'Could not authenticate user';
  }

  redirect('/dashboard');
}

export async function register(formData: registerType) {
  const parsedData = await registerSchema.safeParse(formData);
  if (!parsedData.success) {
    return 'Invalid form data';
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      emailRedirectTo: `${headers().get('origin')}/auth/callback`,
    },
  });

  if (error && error.code === 'user_already_exists') {
    return error.message;
  }

  if (error) {
    console.error(error);
    return 'Could not authenticate user';
  }

  redirect('/login?registerSuccess=true');
}
