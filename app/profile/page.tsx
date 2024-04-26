import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DeleteProfile from './deleteProfile';
import ChangePasswordForm from './changePasswordForm';
import EditProfileForm from './editProfileForm';
import { getUser } from '@/utils/prisma/getUser';

export default async function ProfilePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const profile = await getUser(user.id);

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
}
