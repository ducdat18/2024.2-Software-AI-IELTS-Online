// components/ui/test-card.tsx
'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Test, TestDifficulty } from '@/types/test';

type TestInfoBadgeProps = {
  icon: React.ReactNode;
  text: string;
};

// Badge for test information like duration, sections, etc.
const TestInfoBadge: React.FC<TestInfoBadgeProps> = ({ icon, text }) => (
  <div className="bg-gray-700 px-3 py-1 rounded-full text-sm text-white flex items-center">
    {icon}
    {text}
  </div>
);

interface TestCardProps {
  test: Test;
}

export default function TestCard({ test }: TestCardProps) {
  // Get appropriate color for difficulty badge
  const getDifficultyColor = (difficulty: TestDifficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500 hover:bg-green-600';
      case 'medium':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'hard':
        return 'bg-orange-500 hover:bg-orange-600';
      case 'very_hard':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  // Format difficulty text
  const formatDifficulty = (difficulty: TestDifficulty) => {
    return difficulty === 'very_hard'
      ? 'Very hard'
      : difficulty === 'hard'
      ? 'Hard'
      : difficulty === 'medium'
      ? 'Medium'
      : 'Easy';
  };

  // Determine badges based on test type
  const getBadges = () => {
    const badges = [
      <TestInfoBadge
        key="duration"
        icon={
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
        }
        text={`${test.duration} minutes`}
      />,
    ];

    // Add test-specific badges
    switch (test.skill) {
      case 'reading':
        badges.push(
          <TestInfoBadge
            key="passages"
            icon={
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            }
            text="3 passages"
          />
        );
        break;
      case 'listening':
        badges.push(
          <TestInfoBadge
            key="parts"
            icon={
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            }
            text="4 parts"
          />
        );
        break;
      case 'writing':
        badges.push(
          <TestInfoBadge
            key="tasks"
            icon={
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            }
            text="2 tasks"
          />
        );
        break;
    }

    // Add questions badge for reading and listening
    if (test.skill === 'reading' || test.skill === 'listening') {
      badges.push(
        <TestInfoBadge
          key="questions"
          icon={
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
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          text="40 questions"
        />
      );
    }

    return badges;
  };

  return (
    <Card
      key={test.id}
      className="bg-gray-800 border-gray-700 transition-all hover:border-blue-500"
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl text-white">{test.title}</CardTitle>
          <Badge className={getDifficultyColor(test.difficulty)}>
            {formatDifficulty(test.difficulty)}
          </Badge>
        </div>
        <CardDescription className="text-gray-400">
          {test.description || `IELTS ${test.skill} practice test`}
        </CardDescription>
      </CardHeader>
      <CardContent className="py-2">
        <div className="flex flex-wrap gap-3 mb-3">{getBadges()}</div>
      </CardContent>
      <CardFooter>
        <Link href={`/tests/${test.skill}/${test.id}`} className="w-full">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Start test
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
