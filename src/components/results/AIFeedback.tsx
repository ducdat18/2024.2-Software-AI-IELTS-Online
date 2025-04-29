// components/results/AIFeedback.tsx
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

export interface FeedbackItem {
  title: string;
  description: string;
  suggestions: string[];
  score?: number; // Made score optional since not all feedback items may have a score
}

interface AIFeedbackProps {
  feedbackAreas: FeedbackItem[];
  improvementPoints?: string[];
  sampleImprovement?: string;
  showSample?: boolean;
}

export default function AIFeedback({
  feedbackAreas,
  improvementPoints = [],
  sampleImprovement,
  showSample = false,
}: AIFeedbackProps) {
  const [showSampleAnswer, setShowSampleAnswer] = useState(showSample);

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 7) return 'text-green-500';
    if (score >= 6) return 'text-blue-500';
    if (score >= 5) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            AI-Assisted Feedback
          </CardTitle>
          <CardDescription className="text-gray-400">
            Personalized analysis and suggestions for improvement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {feedbackAreas.map((area, index) => (
              <div
                key={index}
                className="pb-4 border-b border-gray-700 last:border-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">{area.title}</h3>
                  {area.score !== undefined && (
                    <Badge
                      className={`bg-gray-700 ${
                        area.score ? getScoreColor(area.score) : ''
                      }`}
                    >
                      {area.score}/9
                    </Badge>
                  )}
                </div>
                <p className="text-gray-300 mb-3">{area.description}</p>
                {area.suggestions && area.suggestions.length > 0 && (
                  <div>
                    <h4 className="text-gray-200 mb-2 text-sm font-medium">
                      Suggestions:
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300 text-sm">
                      {area.suggestions.map((suggestion, idx) => (
                        <li key={idx}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            {improvementPoints.length > 0 && (
              <div>
                <h3 className="text-white font-medium mb-3">
                  Key areas for improvement:
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  {improvementPoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {sampleImprovement && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Sample Model Answer
            </CardTitle>
            <CardDescription className="text-gray-400 flex justify-between items-center">
              <span>An example of a high-scoring response</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSampleAnswer(!showSampleAnswer)}
                className="text-blue-400 hover:text-blue-300"
              >
                {showSampleAnswer ? 'Hide' : 'Show'}
              </Button>
            </CardDescription>
          </CardHeader>
          {showSampleAnswer && (
            <CardContent>
              <div className="bg-gray-700 p-4 rounded-lg text-gray-200 whitespace-pre-line">
                {sampleImprovement}
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
}
