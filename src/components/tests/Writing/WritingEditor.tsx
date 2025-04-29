// components/test-types/writing/writing-editor.tsx
'use client';

import { useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface WritingEditorProps {
  taskId: string;
  value: string;
  onChange: (value: string) => void;
  wordCount: number;
  targetWordCount: number;
  onWordCountChange?: (count: number) => void;
  placeholder?: string;
  autoSave?: boolean;
  actions?: React.ReactNode;
}

export default function WritingEditor({
  taskId,
  value,
  onChange,
  wordCount,
  targetWordCount,
  onWordCountChange,
  placeholder = 'Write your answer here...',
  autoSave = true,
  actions,
}: WritingEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Get word count color based on target word count
  const getWordCountColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage < 70) return 'text-red-500';
    if (percentage < 90) return 'text-yellow-500';
    if (percentage <= 110) return 'text-green-500';
    return 'text-yellow-500'; // Too many words
  };

  // Count words in text
  const countWords = (text: string) => {
    if (!text || text.trim().length === 0) return 0;
    return text.trim().split(/\s+/).length;
  };

  // Focus textarea when component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Handle text change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    const newWordCount = countWords(newValue);
    if (onWordCountChange) {
      onWordCountChange(newWordCount);
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-white">Your Answer</CardTitle>
          <div
            className={`text-sm font-medium ${getWordCountColor(
              wordCount,
              targetWordCount
            )}`}
          >
            {wordCount} / {targetWordCount} words
          </div>
        </div>
        <CardDescription className="text-gray-400">
          {autoSave
            ? 'Write your answer below. Your response will be auto-saved.'
            : 'Write your answer below.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          ref={textareaRef}
          placeholder={placeholder}
          value={value}
          onChange={handleTextChange}
          className="min-h-[400px] w-full bg-gray-700 border-gray-600 text-white leading-relaxed resize-y focus:border-blue-500"
        />
      </CardContent>
      {actions && (
        <CardFooter className="flex justify-between">{actions}</CardFooter>
      )}

      <style jsx global>{`
        /* Improve textarea experience */
        textarea::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        /* Handle scrollbar styling */
        textarea::-webkit-scrollbar {
          width: 8px;
        }

        textarea::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        textarea::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        textarea::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </Card>
  );
}
