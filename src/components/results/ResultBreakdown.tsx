// components/results/ResultBreakdown.tsx
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export interface SectionScore {
  section: string;
  score: number;
  total: number;
  percentage: number;
}

interface ResultBreakdownProps {
  sectionScores: SectionScore[];
  showPercentage?: boolean;
}

export default function ResultBreakdown({
  sectionScores,
  showPercentage = true,
}: ResultBreakdownProps) {
  // Get progress color based on percentage
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Score Breakdown</CardTitle>
        <CardDescription className="text-gray-400">
          Your performance across different sections
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sectionScores.map((section, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-300 text-sm">{section.section}</span>
                <span className="text-gray-300 text-sm">
                  {section.score} / {section.total}
                  {showPercentage && (
                    <span className="ml-2 text-gray-400">
                      ({section.percentage.toFixed(0)}%)
                    </span>
                  )}
                </span>
              </div>
              <div className="relative">
                {/* Using custom progress styling since indicatorClassName is not supported */}
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getProgressColor(
                      section.percentage
                    )}`}
                    style={{ width: `${section.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
