import AuthButton from '../components/AuthButton';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import Link from 'next/link';
import { Toaster } from '@/components/ui/sonner';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'PV175 Todo App',
  description: 'Simple todo app for PV175 course',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={GeistSans.className}>
      <body className='bg-background text-foreground'>
        <main className='h-screen'>
          <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
            <div className='w-full max-w-4xl flex justify-between items-center p-3 text-sm'>
              <Link href='/' className='font-bold text-2xl'>
                TODO APP
              </Link>
              <AuthButton />
            </div>
          </nav>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
