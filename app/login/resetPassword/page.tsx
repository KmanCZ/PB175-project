import { createClient } from '@/utils/supabase/server';
import ResetEmailForm from './resetEmailForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { redirect } from 'next/navigation';
import ResetPasswordForm from './resetPasswordForm';

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { resetEmailSuccess: boolean; code: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return redirect('/dashboard');
  }

  if (searchParams.code) {
    return <ResetPasswordForm token={searchParams.code} />;
  }

  return (
    <div className='w-screen flex flex-col justify-center items-center relative'>
      {searchParams.resetEmailSuccess && (
        <Alert className='absolute top-2'>
          <AlertTitle>Email was send!</AlertTitle>
          <AlertDescription>Please check your email.</AlertDescription>
        </Alert>
      )}
      <ResetEmailForm />
    </div>
  );
}
