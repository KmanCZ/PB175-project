import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getUser } from '@/utils/prisma/getUser';
import TodosManager from './todosManager';
import TodosEmployee from './todosEmployee';
import { getEmployees, getMoreInfo, getTodosEmployee, getTodosManager } from './actions';
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

  var todos_data: todo[] | string

  var todos

  if (profile.user_role === "manager") {
    const employees = await getEmployees(profile.organization);
    if (typeof employees === "string") {
      return toast(employees)
    }

    todos_data = await getTodosManager(profile);
    if (typeof todos_data === "string") {
      return toast(todos_data)
    }
    
    const connectingTables = await getMoreInfo(todos_data)
    if (typeof connectingTables === "string") {
      return toast(connectingTables)
    }

    todos = <TodosManager input={{data: todos_data, profile: profile, employees: employees, moreInfo: connectingTables}}/>
  } else {
    todos_data = await getTodosEmployee(profile);

    if (typeof todos_data === "string") {
      return toast(todos_data);
    }

    todos = <TodosEmployee data={{todos: todos_data, profile: profile}}/>
  }

  return (
    <div className='text-center'>
      <h1 className='text-4xl mt-5'>Dashboard</h1>
      <p>
        Welcome, {profile.first_name} {profile.last_name}
      </p>
      <p>Here you can see your todos.</p>
      {todos}
    </div>
  );
}
