import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Login({
  searchParams,
}: {
  searchParams: { registerSuccess: boolean };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect('/dashboard');
  }

  return (
    <div className='w-screen flex flex-col justify-center items-center relative'>
      {searchParams.registerSuccess && (
        <Alert className='absolute top-2'>
          <AlertTitle>Registration successful</AlertTitle>
          <AlertDescription>
            Please check your email to verify your account.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue='login' className='w-96 mt-36'>
        <TabsList className='w-96'>
          <TabsTrigger value='login'>Login</TabsTrigger>
          <TabsTrigger value='register'>Register</TabsTrigger>
        </TabsList>
        <TabsContent value='login'>
          <LoginForm />
        </TabsContent>
        <TabsContent value='register'>
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
