'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useTheme } from 'next-themes';
import { FiMenu, FiX, FiLogOut, FiMoon, FiSun } from 'react-icons/fi';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const { user } = useStore();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          VeriLearn
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/guides" className="hover:text-primary transition">
            Guides
          </Link>
          <Link href="/workspace" className="hover:text-primary transition">
            Workspace
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="hover:text-primary transition">
                Dashboard
              </Link>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {theme === 'dark' ? <FiSun /> : <FiMoon />}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {theme === 'dark' ? <FiSun /> : <FiMoon />}
              </button>
              <Link
                href="/auth/signin"
                className="px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-50 dark:bg-gray-700 px-4 py-4 space-y-3">
          <Link href="/guides" className="block hover:text-primary transition">
            Guides
          </Link>
          <Link href="/workspace" className="block hover:text-primary transition">
            Workspace
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="block hover:text-primary transition">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition justify-center"
              >
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="block text-center px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="block text-center px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
