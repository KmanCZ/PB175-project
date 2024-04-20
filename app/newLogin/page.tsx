import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function NewLogin({
  searchParams,
}: {
  searchParams: { registerSuccess: boolean };
}) {
  return (
    <>
      {searchParams.registerSuccess && (
        <Alert>
          <AlertTitle>Registration successful</AlertTitle>
          <AlertDescription>
            Please check your email to verify your account.
          </AlertDescription>
        </Alert>
      )}
      <Tabs defaultValue="login" className="w-96">
        <TabsList className="w-96">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
      <Toaster />
    </>
  );
}
