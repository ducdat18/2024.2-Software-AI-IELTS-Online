// components/shared/timer.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

interface TimerProps {
  initialSeconds: number;
  onTimeUp: () => void;
  isActive?: boolean;
  onTick?: (secondsRemaining: number) => void;
  autoStart?: boolean;
}

export default function Timer({
  initialSeconds,
  onTimeUp,
  isActive = true,
  onTick,
  autoStart = true,
}: TimerProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const [timerActive, setTimerActive] = useState(autoStart);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const prevTimeRef = useRef<number>(Date.now());

  // Initialize timer when component mounts or initialSeconds changes
  useEffect(() => {
    console.log(`Timer initialized with ${initialSeconds} seconds`);
    setSecondsRemaining(initialSeconds);

    // Store the start time for drift correction
    if (autoStart) {
      startTimeRef.current = Date.now();
      prevTimeRef.current = Date.now();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [initialSeconds, autoStart]);

  // Start, pause, or stop timer based on isActive prop
  useEffect(() => {
    console.log(`Timer active state changed to: ${isActive}`);
    setTimerActive(isActive && autoStart);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive, autoStart]);

  // The main timer loop
  useEffect(() => {
    if (!timerActive || secondsRemaining <= 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      if (secondsRemaining <= 0) {
        console.log('Timer reached zero - calling onTimeUp');
        onTimeUp();
      }
      return;
    }

    console.log(`Starting timer with ${secondsRemaining} seconds remaining`);

    // Use a more precise approach with drift correction
    timerRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - prevTimeRef.current) / 1000);

      if (elapsed >= 1) {
        setSecondsRemaining((prev) => {
          const newValue = Math.max(0, prev - elapsed);

          // Call onTick if provided
          if (onTick) {
            onTick(newValue);
          }

          // Check if timer has reached zero
          if (newValue <= 0 && prev > 0) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            console.log('Timer reached zero - calling onTimeUp');
            onTimeUp();
          }

          return newValue;
        });

        prevTimeRef.current = now;
      }
    }, 100); // Check more frequently to improve accuracy

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timerActive, secondsRemaining, onTimeUp, onTick]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  // Public methods (through refs in parent components)
  const getTimeRemaining = (): number => secondsRemaining;
  const startTimer = (): void => setTimerActive(true);
  const pauseTimer = (): void => setTimerActive(false);
  const resetTimer = (): void => {
    setSecondsRemaining(initialSeconds);
    startTimeRef.current = Date.now();
    prevTimeRef.current = Date.now();
  };

  // Expose public methods
  return {
    formattedTime: formatTime(secondsRemaining),
    secondsRemaining,
    isActive: timerActive,
    getTimeRemaining,
    startTimer,
    pauseTimer,
    resetTimer,
  };
}
