// src/components/layout/header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Listening', href: '/tests/listening' },
    { name: 'Reading', href: '/tests/reading' },
    { name: 'Writing', href: '/tests/writing' },
    { name: 'Result', href: '/results' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || isMobileMenuOpen ? 'bg-black shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <p className="text-white font-bold text-2xl uppercase tracking-wider">
            IELTS Online
          </p>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-md font-medium transition-colors ${
                pathname === item.href
                  ? 'text-blue-500'
                  : 'text-white hover:text-blue-400'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login">
            <Button variant="outline" className="border-blue-500 text-black">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Register
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className="md:hidden flex items-center justify-center w-10 h-10 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="relative w-6 h-5">
            <span
              className={`absolute h-0.5 w-full bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'top-2 rotate-45' : 'top-0'
              }`}
            ></span>
            <span
              className={`absolute h-0.5 w-full bg-white top-2 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span
              className={`absolute h-0.5 w-full bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'
              }`}
            ></span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-black transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen py-4' : 'max-h-0 py-0'
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors p-2 ${
                  pathname === item.href
                    ? 'text-blue-500 bg-blue-900/20 rounded'
                    : 'text-white hover:text-blue-400'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-800">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="w-full border-blue-500 text-black"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Register
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
