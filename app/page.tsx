import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';

export default async function Index() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect('/dashboard');
  }

  return (
    <div className='text-center flex flex-col align-middle justify-center h-[40rem]'>
      <h1 className='text-7xl mt-5'>PB175 TODO APP</h1>
      <p className='text-xl mt-1'>
        Oranize Your Workflow, Achieve More with Ease!
      </p>
      <div className='mt-3'>
        <Link className={buttonVariants()} href='/login'>
          Start Now!
        </Link>
      </div>
    </div>
  );
}
