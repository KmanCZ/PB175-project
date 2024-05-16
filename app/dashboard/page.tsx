import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getUser } from '@/utils/prisma/getUser';
import TodosManager from './todosManager';

export default async function DashboardPage() {
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
    <div className='text-center'>
      <h1 className='text-4xl mt-5'>Todos</h1>
      <p>
        Welcome, {profile.first_name} {profile.last_name}
      </p>
      <p>Here you can see your todos.</p>
      <TodosManager/>
    </div>
  );
}
