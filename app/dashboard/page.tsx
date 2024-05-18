import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getUser } from '@/utils/prisma/getUser';
import TodosManager from './todosManager';
import TodosEmployee from './todosEmployee';
import { getEmployees, getTodos } from './actions';
import { toast } from 'sonner';
import { todo } from '@prisma/client';

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

  var todos

  if (profile.user_role == "manager") {
    const employees = await getEmployees(profile.organization);
    if (typeof employees == "string") {
      return toast(employees)
    }

    todos = <TodosManager input={{data: todos_data, profile: profile, employees: employees}}/>
  } else {
    todos = <TodosEmployee data={todos_data}/>
  }

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
