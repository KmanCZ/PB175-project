import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUser } from '@/utils/prisma/getUser';

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    profile = await getUser(user.id);
  }

  const signOut = async () => {
    'use server';

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/login');
  };

  return user ? (
    <div className='flex items-center gap-4'>
      {profile && (
        <Link href='/profile' className='hover:underline'>
          {profile.first_name} {profile.last_name}
        </Link>
      )}
      <form action={signOut}>
        <button className='hover:underline'>
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href='/login'
      className='hover:underline'
    >
      Login
    </Link>
  );
}
