// components/test-types/writing/word-counter.tsx
'use client';

import { useMemo } from 'react';

interface WordCounterProps {
  text: string;
  targetCount: number;
  className?: string;
  showBar?: boolean;
  barHeight?: string;
}

export default function WordCounter({
  text,
  targetCount,
  className = '',
  showBar = true,
  barHeight = 'h-1',
}: WordCounterProps) {
  // Count words in text
  const wordCount = useMemo(() => {
    if (!text || text.trim().length === 0) return 0;
    return text.trim().split(/\s+/).length;
  }, [text]);

  // Calculate completion percentage
  const percentage = Math.min((wordCount / targetCount) * 100, 100);

  // Get word count color based on target word count
  const getWordCountColor = () => {
    if (percentage < 70) return 'text-red-500';
    if (percentage < 90) return 'text-yellow-500';
    if (percentage <= 110) return 'text-green-500';
    return 'text-yellow-500'; // Too many words
  };

  // Get progress bar color
  const getProgressBarColor = () => {
    if (percentage < 70) return 'bg-red-500';
    if (percentage < 90) return 'bg-yellow-500';
    if (percentage <= 110) return 'bg-green-500';
    return 'bg-yellow-500'; // Too many words
  };

  // Get text status
  const getTextStatus = () => {
    if (percentage < 70) return 'Too few words';
    if (percentage < 90) return 'Getting closer';
    if (percentage <= 110) return 'Good length';
    return 'Too many words';
  };

  return (
    <div className={`word-counter ${className}`}>
      <div className="flex justify-between items-center">
        <div className={`text-sm font-medium ${getWordCountColor()}`}>
          {wordCount} / {targetCount} words
        </div>
        {percentage >= 70 && (
          <div className="text-xs text-gray-400">{getTextStatus()}</div>
        )}
      </div>

      {showBar && (
        <div
          className={`mt-1 bg-gray-700 rounded-full ${barHeight} overflow-hidden`}
        >
          <div
            className={`${barHeight} rounded-full ${getProgressBarColor()}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}
