'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockTests, getTestsBySkill } from '@/mock/tests';
import { Test } from '@/types/test';

export default function ContentManagementPage() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredTests, setFilteredTests] = useState<Test[]>(mockTests);
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    let tests = activeTab === 'all' ? mockTests : getTestsBySkill(activeTab);
    if (searchQuery) {
      tests = tests.filter((test) =>
        test.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    tests = [...tests].sort((a, b) => {
      if (sortBy === 'newest') {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sortBy === 'oldest') {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else if (sortBy === 'a-z') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    setFilteredTests(tests);
  }, [activeTab, searchQuery, sortBy]);

  const getSkillBadgeColor = (skill: string) => {
    switch (skill) {
      case 'listening':
        return 'bg-blue-500';
      case 'reading':
        return 'bg-green-500';
      case 'writing':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDifficultyBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'hard':
        return 'bg-orange-500';
      case 'very_hard':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDifficulty = (difficulty: string) => {
    return difficulty === 'very_hard'
      ? 'Very Hard'
      : difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Content Management
        </h1>
        <p className="text-gray-400 max-w-3xl">
          Create, edit, and manage IELTS test content for the platform. Add new
          tests, sections, and questions to keep the content fresh and engaging.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-3">
          <Input
            placeholder="Search tests by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="a-z">A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Tabs
          defaultValue="all"
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="bg-gray-800 w-full justify-start">
            <TabsTrigger
              value="all"
              className="text-gray-400 data-[state=active]:text-black"
            >
              All Tests
            </TabsTrigger>
            <TabsTrigger
              value="listening"
              className="text-gray-400 data-[state=active]:text-black"
            >
              Listening
            </TabsTrigger>
            <TabsTrigger
              value="reading"
              className="text-gray-400 data-[state=active]:text-black"
            >
              Reading
            </TabsTrigger>
            <TabsTrigger
              value="writing"
              className="text-gray-400 data-[state=active]:text-black"
            >
              Writing
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Link href="/admin/content-management/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Create New Test
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map((test) => (
          <Link
            href={`/admin/content-management/tests/${test.id}`}
            key={test.id}
          >
            <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-white">
                    {test.title}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full text-white ${getSkillBadgeColor(
                        test.skill
                      )}`}
                    >
                      {test.skill.charAt(0).toUpperCase() + test.skill.slice(1)}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full text-white ${getDifficultyBadgeColor(
                        test.difficulty
                      )}`}
                    >
                      {formatDifficulty(test.difficulty)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {test.description || 'No description provided'}
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Duration: {test.duration} mins
                  </span>
                  <span className="text-gray-500">
                    {new Date(test.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {/* Empty state */}
        {filteredTests.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center bg-gray-800 rounded-lg p-8">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-white mb-2">
              No tests found
            </h3>
            <p className="text-gray-400 mb-4">
              Try adjusting your search or create a new test
            </p>
            <Link href="/admin/content-management/create">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Create New Test
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
