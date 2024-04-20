'use server';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import prisma from '@/utils/prisma/client';
import { changePasswordType, editProfileType } from './schemas';

export async function deleteProfile() {}

export async function changePassword(data: changePasswordType) {
  return 'Not implemented';
}

export async function editProfile(data: editProfileType) {
  return 'Not implemented';
}
