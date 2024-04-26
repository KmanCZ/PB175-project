import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import CreateProfileForm from './createProfileForm';
import { getUser } from '@/utils/prisma/getUser';

export default async function CreateProfile() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const profile = await getUser(user.id);
  if (profile) {
    return redirect('/profile');
  }

  return (
    <div>
      <CreateProfileForm />
    </div>
  );
}
