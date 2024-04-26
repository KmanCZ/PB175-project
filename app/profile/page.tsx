import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import prisma from '@/utils/prisma/client';
import DeleteProfile from './deleteProfile';
import ChangePasswordForm from './changePasswordForm';
import EditProfileForm from './editProfileForm';
import { toast } from 'sonner';

export default async function ProfilePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  try {
    const profile = await prisma.user_profile.findUnique({
      where: {
        user_id: user.id,
      },
    });

    if (!profile) {
      return redirect('/createProfile');
    }

    return (
      <div className="w-screen flex flex-col items-center gap-3 my-3">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <EditProfileForm
          user={{ firstName: profile.first_name, lastName: profile.last_name }}
        />
        <ChangePasswordForm />
        <DeleteProfile />
      </div>
    );
  } catch (error) {
    toast('Unexpected error occurred');
    return redirect('/');
  }
}
