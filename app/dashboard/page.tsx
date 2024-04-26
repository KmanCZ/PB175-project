import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import prisma from '@/utils/prisma/client';
import { toast } from 'sonner';

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  try {
    const profile = await prisma.user_profile.findFirst({
      where: {
        user_id: user.id,
      },
    });

    if (!profile) {
      return redirect('/createProfile');
    }

    return (
      <div className="text-center">
        <h1 className="text-4xl mt-5">Protectet page</h1>
        <p>
          Welcome, {profile.first_name} {profile.last_name}
        </p>
        <p>This page is under construction.</p>
      </div>
    );
  } catch (error) {
    toast('Unexpected error occurred');
    return redirect('/');
  }
}
