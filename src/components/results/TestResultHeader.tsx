// components/shared/test-result-header.tsx
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface TestResultHeaderProps {
  title: string;
  testType: 'reading' | 'listening' | 'writing';
  score: number;
  completedAt: Date;
  timeSpent: string;
  correctAnswers?: number;
  totalQuestions?: number;
}

export default function TestResultHeader({
  title,
  testType,
  score,
  completedAt,
  timeSpent,
  correctAnswers,
  totalQuestions,
}: TestResultHeaderProps) {
  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Determine score color based on band score
  const getScoreColor = (score: number) => {
    if (score >= 7.5) return 'text-green-500';
    if (score >= 6.0) return 'text-blue-500';
    if (score >= 5.0) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Get type badge color
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'reading':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'listening':
        return 'bg-purple-600 hover:bg-purple-700';
      case 'writing':
        return 'bg-green-600 hover:bg-green-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <div className="bg-gray-800 border-gray-700 p-6 rounded-lg mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {title}
            </h1>
            <Badge className={getTypeBadgeColor(testType)}>
              {testType.charAt(0).toUpperCase() + testType.slice(1)}
            </Badge>
          </div>
          <p className="text-gray-400">
            Completed on {formatDate(completedAt)} • Time spent: {timeSpent}
          </p>
        </div>
        <div className="flex flex-col items-center bg-gray-700 p-4 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">Band Score</div>
          <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
            {score.toFixed(1)}
          </div>
          {correctAnswers !== undefined && totalQuestions !== undefined && (
            <div className="text-sm text-gray-400 mt-1">
              {correctAnswers} / {totalQuestions} correct
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href={`/dashboard`}>
          <Button
            variant="outline"
            className="text-white bg-gray-700 border-gray-600"
          >
            <svg
              className="w-4 h-4 mr-2"
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
          </Button>
        </Link>
        <Link href={`/tests/${testType}`}>
          <Button
            variant="outline"
            className="text-white bg-gray-700 border-gray-600"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            More {testType} tests
          </Button>
        </Link>
      </div>
    </div>
  );
}
