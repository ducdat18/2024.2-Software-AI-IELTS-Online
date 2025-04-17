'use client';

import { useState, useEffect } from 'react';
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
import { getTestsBySkill } from '@/mock/tests';
import { TestDifficulty } from '@/types/test';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

export default function ListeningTestsPage() {
  const [tests, setTests] = useState(getTestsBySkill('listening'));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  useEffect(() => {
    let filteredTests = getTestsBySkill('listening');

    if (searchTerm) {
      filteredTests = filteredTests.filter(
        (test) =>
          test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (test.description &&
            test.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedDifficulty !== 'all') {
      filteredTests = filteredTests.filter(
        (test) => test.difficulty === selectedDifficulty
      );
    }

    setTests(filteredTests);
  }, [searchTerm, selectedDifficulty]);

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

  return (
    <div className="container mx-auto py-2">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          IELTS Listening Tests
        </h1>
        <p className="text-gray-400 max-w-3xl">
          Practice your listening skills with IELTS listening tests. Each test
          consists of 4 parts with different types of questions, helping you get
          used to the real exam format.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-3">
          <Input
            placeholder="Tìm kiếm bài thi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Tabs defaultValue="all" onValueChange={setSelectedDifficulty}>
            <TabsList className="grid grid-cols-4 w-full bg-gray-800">
              <TabsTrigger
                value="all"
                className="text-gray-400 data-[state=active]:text-black"
              >
                Tất cả
              </TabsTrigger>
              <TabsTrigger
                value="easy"
                className="text-gray-400 data-[state=active]:text-black"
              >
                Easy
              </TabsTrigger>
              <TabsTrigger
                value="medium"
                className="text-gray-400 data-[state=active]:text-black"
              >
                Medium
              </TabsTrigger>
              <TabsTrigger
                value="hard"
                className="text-gray-400 data-[state=active]:text-black"
              >
                Hard
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {tests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <Card
              key={test.id}
              className="bg-gray-800 border-gray-700 transition-all hover:border-blue-500"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-white">
                    {test.title}
                  </CardTitle>
                  <Badge className={getDifficultyColor(test.difficulty)}>
                    {test.difficulty === 'very_hard'
                      ? 'Very hard'
                      : test.difficulty === 'hard'
                      ? 'Hard'
                      : test.difficulty === 'medium'
                      ? 'Medium'
                      : 'Dễ'}
                  </Badge>
                </div>
                <CardDescription className="text-gray-400">
                  {test.description || 'Bài thi luyện kỹ năng nghe IELTS'}
                </CardDescription>
              </CardHeader>
              <CardContent className="py-2">
                <div className="flex flex-wrap gap-3 mb-3">
                  <div className="bg-gray-700 px-3 py-1 rounded-full text-sm text-white flex items-center">
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
                    {test.duration} minutes
                  </div>
                  <div className="bg-gray-700 px-3 py-1 rounded-full text-sm text-white flex items-center">
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
                    4 part
                  </div>
                  <div className="bg-gray-700 px-3 py-1 rounded-full text-sm text-white flex items-center">
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
                    40 questions
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/tests/listening/${test.id}`} className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Start doing test
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-800 rounded-lg">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-medium text-white mb-2">
            Không tìm thấy bài thi nào
          </h3>
          <p className="text-gray-400 mb-4">
            Không có bài thi nào phù hợp với tiêu chí tìm kiếm của bạn.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedDifficulty('all');
            }}
            className="text-black"
          >
            Xóa bộ lọc
          </Button>
        </div>
      )}
    </div>
  );
}
