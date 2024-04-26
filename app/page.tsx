import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Index() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect('/dashboard');
  }

  return (
    <div className='text-center'>
      <h1 className='text-4xl mt-5'>Main page</h1>
      <p>This page is under construction.</p>
    </div>
  );
}
