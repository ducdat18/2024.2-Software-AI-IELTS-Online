// app/results/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { getResultsByUserId } from '@/mock/test-results';
import { TestResultBase } from '@/mock/test-results';

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<TestResultBase[]>([]);
  const [filteredResults, setFilteredResults] = useState<TestResultBase[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Lấy tất cả kết quả bài kiểm tra của người dùng hiện tại
    // Trong thực tế, ID người dùng sẽ được lấy từ phiên đăng nhập
    const userId = 'user-123';
    const userResults = getResultsByUserId(userId);
    setResults(userResults);
    setFilteredResults(userResults);
  }, []);

  // Lọc kết quả khi thay đổi skill hoặc tìm kiếm
  useEffect(() => {
    let filtered = [...results];

    // Lọc theo kỹ năng
    if (selectedSkill !== 'all') {
      filtered = filtered.filter((result) => result.skill === selectedSkill);
    }

    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      filtered = filtered.filter((result) =>
        result.testTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredResults(filtered);
  }, [selectedSkill, searchTerm, results]);

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  // Lấy màu cho điểm số
  const getScoreColor = (score: number) => {
    if (score >= 7.5) return 'text-green-500';
    if (score >= 6.0) return 'text-blue-500';
    if (score >= 5.0) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Lấy màu cho badge kỹ năng
  const getSkillBadgeColor = (skill: string) => {
    switch (skill) {
      case 'reading':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'listening':
        return 'bg-purple-600 hover:bg-purple-700';
      case 'writing':
        return 'bg-green-600 hover:bg-green-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <div className="container mx-auto py-2">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Your Test Results
        </h1>
        <p className="text-gray-400 max-w-3xl">
          Review your performance in previous IELTS tests and track your
          progress over time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-3">
          <Input
            placeholder="Search results..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Tabs defaultValue={selectedSkill} onValueChange={setSelectedSkill}>
            <TabsList className="grid grid-cols-4 w-full bg-gray-800">
              <TabsTrigger
                value="all"
                className="text-gray-400 data-[state=active]:text-black"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="reading"
                className="text-gray-400 data-[state=active]:text-black"
              >
                Reading
              </TabsTrigger>
              <TabsTrigger
                value="listening"
                className="text-gray-400 data-[state=active]:text-black"
              >
                Listening
              </TabsTrigger>
              <TabsTrigger
                value="writing"
                className="text-gray-400 data-[state=active]:text-black"
              >
                Writing
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((result) => (
            <Card
              key={result.id}
              className="bg-gray-800 border-gray-700 transition-all hover:border-blue-500"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-white">
                    {result.testTitle}
                  </CardTitle>
                  <Badge className={getSkillBadgeColor(result.skill)}>
                    {result.skill.charAt(0).toUpperCase() +
                      result.skill.slice(1)}
                  </Badge>
                </div>
                <CardDescription className="text-gray-400">
                  Completed on {formatDate(result.completedAt)}
                </CardDescription>
              </CardHeader>
              <CardContent className="py-2">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-400">Band Score</div>
                  <div
                    className={`text-2xl font-bold ${getScoreColor(
                      result.score
                    )}`}
                  >
                    {result.score.toFixed(1)}
                  </div>
                </div>
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
                    {result.timeSpent}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() =>
                    router.push(`/results/${result.skill}/${result.id}`)
                  }
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-800 rounded-lg">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-medium text-white mb-2">
            No results found
          </h3>
          <p className="text-gray-400 mb-4">
            {searchTerm || selectedSkill !== 'all'
              ? 'No results match your search criteria.'
              : "You haven't completed any tests yet."}
          </p>
          {(searchTerm || selectedSkill !== 'all') && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedSkill('all');
              }}
              className="text-black"
            >
              Clear filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
