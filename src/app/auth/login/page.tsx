'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Mock user data for demonstration - in a real app, this would come from your API/backend
const mockUsers = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin' },
  {
    email: 'content@example.com',
    password: 'content123',
    role: 'content-manager',
  },
  { email: 'user@example.com', password: 'user123', role: 'user' },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would be an API call to your authentication endpoint
      // For demo purposes, we're using the mock data
      const user = mockUsers.find(
        (user) => user.email === email && user.password === password
      );

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (user) {
        // Successfully authenticated
        console.log('Login successful:', user);

        // Store user info in localStorage or sessionStorage
        // In a real app, you would store a JWT token or session info
        localStorage.setItem(
          'user',
          JSON.stringify({
            email: user.email,
            role: user.role,
          })
        );

        toast.success('Login successful! Redirecting...');

        // Redirect based on user role
        setTimeout(() => {
          if (user.role === 'content-manager') {
            router.push('/content-manager');
          } else if (user.role === 'admin') {
            router.push('/admin/dashboard');
          } else {
            router.push('/dashboard'); // Default redirect for regular users
          }
        }, 1000); // Small delay to show the success toast
      } else {
        // Authentication failed
        toast.error('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* ToastContainer for react-toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // Use dark theme to match your UI
      />

      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20"></div>

      {/* Decorative blurs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-900/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-md mx-auto">
          {/* Login Card */}
          <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-2xl">
            <div className="bg-gray-900 p-8 rounded-lg">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-400">
                  Log in to your account to continue
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password" className="text-white">
                      Password
                    </Label>
                    <Link
                      href="/auth/register"
                      className="text-sm text-blue-500 hover:text-blue-400"
                    >
                      Forgot password? Create a new one !
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                    className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label
                    htmlFor="remember-me"
                    className="ml-2 text-gray-300 text-sm"
                  >
                    Remember me
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center text-sm text-gray-400">
                Don't have an account?{' '}
                <Link
                  href="/auth/register"
                  className="text-blue-500 hover:text-blue-400 font-medium"
                >
                  Sign up now
                </Link>
              </div>

              {/* Demo Credentials */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <p className="text-gray-400 text-sm mb-2">Demo Accounts:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                  <div className="bg-gray-800 p-2 rounded">
                    <p className="text-gray-300">Content Manager</p>
                    <p className="text-gray-400">content@example.com</p>
                    <p className="text-gray-400">content123</p>
                  </div>
                  <div className="bg-gray-800 p-2 rounded">
                    <p className="text-gray-300">Admin</p>
                    <p className="text-gray-400">admin@example.com</p>
                    <p className="text-gray-400">admin123</p>
                  </div>
                  <div className="bg-gray-800 p-2 rounded">
                    <p className="text-gray-300">Regular User</p>
                    <p className="text-gray-400">user@example.com</p>
                    <p className="text-gray-400">user123</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
