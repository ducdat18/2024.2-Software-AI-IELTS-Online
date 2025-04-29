// components/test-types/listening/audio-player.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

interface AudioPlayerProps {
  audioUrl: string;
  title?: string;
  description?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  notes?: string[];
}

export default function AudioPlayer({
  audioUrl,
  title = 'Audio',
  description,
  onPlay,
  onPause,
  onEnded,
  notes = [
    'You will hear the audio only one time',
    'Ensure that headphone is available and you have enough time to do the full test',
    'Read the question carefully before finding the information',
  ],
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Format time in MM:SS format
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  // Handle play/pause button click
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        if (onPause) onPause();
      } else {
        audioRef.current.play();
        if (onPlay) onPlay();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update time display when audio plays
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Update duration when audio is loaded
  const handleLoadedData = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Handle audio ended event
  const handleEnded = () => {
    setIsPlaying(false);
    if (onEnded) onEnded();
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
        {description && (
          <CardDescription className="text-gray-400">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedData={handleLoadedData}
          onEnded={handleEnded}
          className="hidden"
        />
        <div className="bg-gray-700 p-3 rounded-lg">
          <div className="flex justify-between items-center text-gray-400 text-sm mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="relative w-full h-1 bg-gray-600 rounded-full mb-3">
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
              style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePlayPause}
              className="text-black border-gray-600 hover:bg-gray-600 hover:text-white"
            >
              {isPlaying ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </Button>
          </div>
        </div>
        {notes && notes.length > 0 && (
          <div className="mt-4 text-gray-400 text-sm">
            <p className="mb-1">Notes:</p>
            <ul className="list-disc pl-5 space-y-1">
              {notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
