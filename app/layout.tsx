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
        <main className='h-screen relative'>
          <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
            <div className='w-full max-w-4xl flex justify-between items-center p-3 text-sm'>
              <Link href='/' className='font-bold text-2xl'>
                TODO APP
              </Link>
              <AuthButton />
            </div>
          </nav>
          {children}
          <footer className='w-full flex absolute bottom-0 justify-center items-center border-t border-t-foreground/10 h-8 text-sm'>
            <span className='text-center'>
              Created by{' '}
              <a
                href='https://is.muni.cz/auth/osoba/536526'
                className='hover:underline'
              >
                Kristián Řehoř
              </a>{' '}
              &{' '}
              <a
                href='https://is.muni.cz/auth/osoba/536473'
                className='hover:underline'
              >
                Lenka Janíková
              </a>
            </span>
          </footer>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
