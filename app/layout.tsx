import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Restaurant Digital Solutions',
  description: 'Digital menu and ordering system for modern restaurants',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey="pk_test_Y2xlYXItbW9yYXktODMuY2xlcmsuYWNjb3VudHMuZGV2JA">
      <html lang="fr">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}