import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl mt-5">Protectet page</h1>
      <p>Welcome, {user.email}</p>
      <p>This page is under construction.</p>
    </div>
  );
}
