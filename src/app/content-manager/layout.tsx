'use client';

import AuthGuard from '@/components/auth/AuthGuard';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ContentManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Get user name from localStorage
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        setUserName(user.name || user.email);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear user data and redirect to login
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  return (
    <AuthGuard requiredRole="content-manager">
      <div className="min-h-screen bg-black">
        {/* Top Bar */}
        <header className="fixed top-0 z-40 w-full bg-gray-900 border-b border-gray-800">
          <div className="flex h-16 items-center px-4 md:px-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-2 rounded-md p-2 text-gray-400 hover:bg-gray-800 md:hidden"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span className="sr-only">Toggle menu</span>
            </button>

            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">CM</span>
                </div>
                <p className="hidden md:block text-white font-bold text-xl uppercase tracking-wider">
                  Content Manager
                </p>
              </Link>
            </div>

            <div className="ml-auto flex items-center gap-4">
              <div className="hidden md:flex items-center">
                <span className="text-gray-400 mr-2">
                  Hello, {userName || 'Content Manager'}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="h-5 w-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Sidebar Overlay */}
        <div
          className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity md:hidden ${
            isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 border-r border-gray-800 bg-gray-900 pt-16 transition-transform md:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav className="flex flex-col gap-1 p-4">
            <Link
              href="/content-manager"
              className="flex items-center rounded-md px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </Link>

            <Link
              href="/content-manager/tests"
              className="flex items-center rounded-md px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              All Tests
            </Link>

            <Link
              href="/content-manager/create"
              className="flex items-center rounded-md px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create Test
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-h-screen pt-16 md:pl-64">{children}</main>
      </div>
    </AuthGuard>
  );
}
