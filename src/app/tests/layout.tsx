'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function TestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>('listening');

  useEffect(() => {
    if (pathname.includes('/tests/listening')) {
      setActiveTab('listening');
    } else if (pathname.includes('/tests/reading')) {
      setActiveTab('reading');
    } else if (pathname.includes('/tests/writing')) {
      setActiveTab('writing');
    }
  }, [pathname]);

  const isTestPage = /\/tests\/(listening|reading|writing)\/[^\/]+$/.test(
    pathname
  );

  if (isTestPage) {
    return <div className="min-h-screen bg-black pb-16">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-black px-4 pb-16">
      <div className="container mx-auto px-4 pt-24">{children}</div>
    </div>
  );
}
