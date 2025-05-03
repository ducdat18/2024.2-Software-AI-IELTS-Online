// components/results/ResultBreakdown.tsx
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

  // Get badge color based on percentage
  const getBadgeColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-600';
    if (percentage >= 60) return 'bg-blue-600';
    if (percentage >= 40) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  // Get text color based on percentage
  const getTextColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-blue-500';
    if (percentage >= 40) return 'text-yellow-500';
    return 'text-red-500';
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
        <div className="space-y-5">
          {sectionScores.map((section, index) => (
            <div key={index} className="pb-2 last:pb-0">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 font-medium">
                  {section.section}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`font-medium ${getTextColor(
                      section.percentage
                    )}`}
                  >
                    {section.score} / {section.total}
                  </span>
                  {showPercentage && (
                    <Badge className={`${getBadgeColor(section.percentage)}`}>
                      {section.percentage.toFixed(0)}%
                    </Badge>
                  )}
                </div>
              </div>
              <div className="relative">
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
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
