'use server';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import prisma from '@/utils/prisma/client';
import {
  changePasswordSchema,
  changePasswordType,
  editProfileSchema,
  editProfileType,
} from './schemas';
import { revalidatePath } from 'next/cache';

export async function deleteProfile() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return 'Unexpected error';
  }

  try {
    await prisma.user_profile.delete({
      where: {
        user_id: user.id,
      },
    });
  } catch (error) {
    return 'Unexpected error';
  }

  supabase.auth.signOut();

  return redirect('/login');
}

export async function changePassword(data: changePasswordType) {
  const parsedData = changePasswordSchema.safeParse(data);
  if (!parsedData.success) {
    return 'Invalid data';
  }

  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({
    password: data.password,
  });

  if (error && error.code === 'same_password') {
    return error.message;
  }

  if (error) {
    return 'Unexpected error';
  }

  return 'Password changed successfully';
}

export async function editProfile(data: editProfileType) {
  const parsedData = editProfileSchema.safeParse(data);
  if (!parsedData.success) {
    return 'Invalid data';
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return 'Unexpected error';
  }

  try {
    await prisma.user_profile.update({
      where: {
        user_id: user.id,
      },
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
      },
    });
  } catch (error) {
    return 'Unexpected error';
  }

  revalidatePath('/', 'layout');
  return 'Profile updated successfully';
}
