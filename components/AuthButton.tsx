import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import prisma from '@/utils/prisma/client';

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    try {
      profile = await prisma.user_profile.findUnique({
        where: {
          user_id: user.id,
        },
      });
    } catch (error) {
      profile = null;
    }
  }


  const signOut = async () => {
    'use server';

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/login');
  };

  return user ? (
    <div className="flex items-center gap-4">
      {profile && (
        <Link href="/profile" className="hover:underline">
          {profile.first_name} {profile.last_name}
        </Link>
      )}
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:underline">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
