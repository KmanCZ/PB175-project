'use server';

import { createClient } from '@/utils/supabase/server';
import { createProfileSchema, createProfileType } from './schemas';
import prisma from '@/utils/prisma/client';
import { redirect } from 'next/navigation';

export async function createProfile(data: createProfileType) {
  const parserdData = await createProfileSchema.safeParse(data);
  if (!parserdData.success) {
    return 'Invalid data';
  }

  const supabase = createClient();
  const { error, data: userData } = await supabase.auth.getUser();
  if (error) {
    return 'User not found';
  }

  const profile = await prisma.user_profile.create({
    data: {
      user_id: userData.user.id,
      first_name: parserdData.data.firstName,
      last_name: parserdData.data.lastName,
      organization: parserdData.data.organization,
      user_role: parserdData.data.role,
    },
  });

  if (!profile) {
    return 'Profile not created';
  }

  redirect('/dashboard');
}
