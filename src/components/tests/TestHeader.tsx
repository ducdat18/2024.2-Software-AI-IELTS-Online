// components/shared/test-header.tsx
'use client';

import { Badge } from '@/components/ui/badge';
import TimerDisplay from '../shared/TimerDisplay';

interface TestHeaderProps {
  title: string;
  description?: string;
  durationInSeconds: number;
  onTimeUp: () => void;
  progress: number;
  currentSection?: string;
  autoSaveStatus?: string | null;
}

export default function TestHeader({
  title,
  description,
  durationInSeconds,
  onTimeUp,
  progress,
  currentSection,
  autoSaveStatus,
}: TestHeaderProps) {
  // Get progress color based on value
  const getProgressColor = () => {
    if (progress < 33) return 'text-red-500 border-red-500';
    if (progress < 67) return 'text-yellow-500 border-yellow-500';
    return 'text-green-500 border-green-500';
  };

  return (
    <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>
        {description && <p className="text-gray-400">{description}</p>}
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <TimerDisplay
          durationInSeconds={durationInSeconds}
          onTimeUp={onTimeUp}
          autoStart={true}
        />

        <Badge variant="outline" className={`px-3 py-1 ${getProgressColor()}`}>
          <svg
            className="w-4 h-4 mr-1"
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
          Completed: {progress.toFixed(0)}%
        </Badge>

        {currentSection && (
          <Badge
            variant="outline"
            className="px-3 py-1 text-blue-500 border-blue-500"
          >
            <svg
              className="w-4 h-4 mr-1"
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
            {currentSection}
          </Badge>
        )}

        {autoSaveStatus && (
          <Badge
            variant="outline"
            className="px-3 py-1 text-green-500 border-green-500"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {autoSaveStatus}
          </Badge>
        )}
      </div>
    </div>
  );
}
