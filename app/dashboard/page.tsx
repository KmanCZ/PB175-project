import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getUser } from '@/utils/prisma/getUser';
import TodosManager from './todosManager';
import TodosEmployee from './todosEmployee';
import { getTodos } from './actions';
import { toast } from 'sonner';
import { role, todo } from '@prisma/client';

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

  var todos_data: todo[] | string = await getTodos(profile);

  if (typeof todos_data == "string") {
    return toast(todos_data);
  }

  const todos = profile.user_role === 'manager' ? <TodosManager data={todos_data}/> : <TodosEmployee data={todos_data}/>

  return (
    <div className='text-center'>
      <h1 className='text-4xl mt-5'>Todos</h1>
      <p>
        Welcome, {profile.first_name} {profile.last_name}
      </p>
      <p>Here you can see your todos.</p>
      {todos}
    </div>
  );
}
