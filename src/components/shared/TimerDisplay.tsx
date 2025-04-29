// components/shared/timer-display.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';

interface TimerDisplayProps {
  durationInSeconds: number;
  onTimeUp: () => void;
  autoStart?: boolean;
}

export default function TimerDisplay({
  durationInSeconds,
  onTimeUp,
  autoStart = true,
}: TimerDisplayProps) {
  const [timeRemaining, setTimeRemaining] = useState(durationInSeconds);
  const [isActive, setIsActive] = useState(autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  // Initialize the timer when the component mounts
  useEffect(() => {
    console.log(`TimerDisplay initialized with ${durationInSeconds} seconds`);
    setTimeRemaining(durationInSeconds);

    if (autoStart) {
      setIsActive(true);
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [durationInSeconds, autoStart]);

  // The main timer logic
  useEffect(() => {
    if (!isActive || timeRemaining <= 0) {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // Call onTimeUp if time has run out
      if (timeRemaining <= 0) {
        console.log('Time is up! Calling onTimeUp callback');
        onTimeUp();
      }

      return;
    }

    console.log('Starting timer interval with', timeRemaining, 'seconds');

    // Start the timer
    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        const newValue = prev - 1;

        // Log every 10 seconds for debugging
        if (newValue % 10 === 0) {
          console.log(`Timer tick: ${newValue} seconds remaining`);
        }

        // Check if timer has reached zero
        if (newValue <= 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          console.log('Time is up! Calling onTimeUp callback');
          onTimeUp();
        }

        return Math.max(0, newValue);
      });
    }, 1000);

    // Cleanup when effect is re-run or component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, timeRemaining, onTimeUp]);

  // Color changes based on time remaining
  const getTimerColor = () => {
    const percentRemaining = (timeRemaining / durationInSeconds) * 100;
    if (percentRemaining < 10) return 'text-red-500 border-red-500';
    if (percentRemaining < 25) return 'text-yellow-500 border-yellow-500';
    return 'text-yellow-500 border-yellow-500';
  };

  return (
    <Badge variant="outline" className={`px-3 py-1 ${getTimerColor()}`}>
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
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      Time left: {formatTime(timeRemaining)}
    </Badge>
  );
}
