'use client';

import React, { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useStore } from '@/lib/store';
import Navbar from '@/components/navbar/Navbar';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>VeriLearn - Learn Verilog HDL</title>
        <meta name="description" content="Learn Verilog HDL with interactive workspace and comprehensive guides" />
      </head>
      <body className="bg-light dark:bg-dark text-gray-900 dark:text-gray-100">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
