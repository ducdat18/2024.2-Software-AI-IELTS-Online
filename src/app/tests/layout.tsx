// src/app/(tests)/layout.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export default function TestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>('listening');

  // Set active tab based on current path
  useEffect(() => {
    if (pathname.includes('/tests/listening')) {
      setActiveTab('listening');
    } else if (pathname.includes('/tests/reading')) {
      setActiveTab('reading');
    } else if (pathname.includes('/tests/writing')) {
      setActiveTab('writing');
    }
  }, [pathname]);

  // Check if we're on a test details page (e.g., /tests/listening/[testId])
  const isTestPage = /\/tests\/(listening|reading|writing)\/[^\/]+$/.test(
    pathname
  );

  // Skip the navigation tabs for specific test pages
  if (isTestPage) {
    return <div className="min-h-screen bg-black pb-16">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-black px-4 pb-16">
      <div className="container mx-auto px-4 pt-24">{children}</div>
    </div>
  );
}
