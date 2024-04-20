import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import CreateProfileForm from './createProfileForm';

export default async function CreateProfile() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <div>
      <CreateProfileForm />
    </div>
  );
}
