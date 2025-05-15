'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTestById } from '@/mock/tests';
import {
  Test,
  ListeningTest,
  ReadingTest,
  WritingTest,
  ListeningSection,
  ReadingSection,
  WritingTask,
} from '@/types/test';

export default function TestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.testId as string;

  const [test, setTest] = useState<Test | null>(null);
  const [activeTab, setActiveTab] = useState<string>('details');
  const [newSectionName, setNewSectionName] = useState<string>('');
  const [isAddingSectionOpen, setIsAddingSectionOpen] =
    useState<boolean>(false);

  useEffect(() => {
    // In a real app, we would fetch test data from an API
    const fetchedTest = getTestById(testId);

    if (fetchedTest) {
      setTest(fetchedTest);
    } else {
      console.error(`Test with ID ${testId} not found`);
      // You could redirect to 404 page or content management dashboard
    }
  }, [testId]);

  const handleAddSection = () => {
    if (!newSectionName.trim()) return;

    // In a real app, this would be an API call to add the section
    console.log(`Adding new section "${newSectionName}" to test ${testId}`);

    // Mock implementation - create a new section
    const newSectionId = `section-${Date.now()}`;

    // Close the dialog and reset the form
    setIsAddingSectionOpen(false);
    setNewSectionName('');

    // Navigate to the new section detail page
    router.push(`/content-manager/tests/${testId}/sections/${newSectionId}`);
  };

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

  // Helper function to determine if test is a ListeningTest
  const isListeningTest = (test: Test): test is ListeningTest => {
    return test.skill === 'listening';
  };

  // Helper function to determine if test is a ReadingTest
  const isReadingTest = (test: Test): test is ReadingTest => {
    return test.skill === 'reading';
  };

  // Helper function to determine if test is a WritingTest
  const isWritingTest = (test: Test): test is WritingTest => {
    return test.skill === 'writing';
  };

  // Helper function to get sections based on test type
  const getSections = () => {
    if (!test) return [];

    if (isListeningTest(test)) {
      return test.sections;
    } else if (isReadingTest(test)) {
      return test.sections;
    } else if (isWritingTest(test)) {
      return test.tasks.map((task) => ({
        id: task.id,
        title: `${
          task.type === 'task1' ? 'Task 1' : 'Task 2'
        }: ${task.question.substring(0, 30)}...`,
        description: task.question,
        questions: [], // Writing tasks don't have questions
      }));
    }

    return [];
  };

  if (!test) {
    return (
      <div className="container mx-auto px-4 py-24 flex justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Link href="/content-manager">
              <Button
                variant="outline"
                size="sm"
                className="text-white border-gray-600"
              >
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back
              </Button>
            </Link>
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
          <h1 className="text-3xl font-bold text-white mb-2">{test.title}</h1>
          <p className="text-gray-400">{test.description}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-gray-600 text-white">
            <svg
              className="w-4 h-4 mr-2"
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
            Edit Test
          </Button>
          <Dialog
            open={isAddingSectionOpen}
            onOpenChange={setIsAddingSectionOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <svg
                  className="w-4 h-4 mr-2"
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
                Add Section
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700 text-white">
              <DialogHeader>
                <DialogTitle>Add New Section</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Create a new section for this test. You'll be able to add
                  questions after creating the section.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="section-name" className="text-white">
                    Section Name
                  </Label>
                  <Input
                    id="section-name"
                    placeholder="e.g., Section 1: Introduction"
                    value={newSectionName}
                    onChange={(e) => setNewSectionName(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingSectionOpen(false)}
                  className="border-gray-600 text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddSection}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Create Section
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs
        defaultValue="details"
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="bg-gray-800 w-full justify-start mb-6">
          <TabsTrigger
            value="details"
            className="text-gray-400 data-[state=active]:text-black"
          >
            Test Details
          </TabsTrigger>
          <TabsTrigger
            value="sections"
            className="text-gray-400 data-[state=active]:text-black"
          >
            Sections
          </TabsTrigger>
          <TabsTrigger
            value="preview"
            className="text-gray-400 data-[state=active]:text-black"
          >
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Test Information</CardTitle>
              <CardDescription className="text-gray-400">
                Detailed information about this test
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">
                    Test ID
                  </h3>
                  <p className="text-white">{test.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">
                    Title
                  </h3>
                  <p className="text-white">{test.title}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">
                    Skill
                  </h3>
                  <p className="text-white capitalize">{test.skill}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">
                    Difficulty
                  </h3>
                  <p className="text-white">
                    {formatDifficulty(test.difficulty)}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">
                    Duration
                  </h3>
                  <p className="text-white">{test.duration} minutes</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">
                    Created
                  </h3>
                  <p className="text-white">
                    {new Date(test.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">
                  Description
                </h3>
                <p className="text-white">
                  {test.description || 'No description provided'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">
                  Instructions
                </h3>
                <p className="text-white">
                  {test.instructions || 'No instructions provided'}
                </p>
              </div>

              {isListeningTest(test) && test.audioUrl && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">
                    Audio
                  </h3>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <audio controls className="w-full">
                      <source src={test.audioUrl} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                    <p className="text-gray-400 text-sm mt-2">
                      Audio Length: {Math.floor(test.audioLength / 60)} minutes{' '}
                      {test.audioLength % 60} seconds
                    </p>
                  </div>
                </div>
              )}

              {isReadingTest(test) && test.passage && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">
                    Passage
                  </h3>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-white whitespace-pre-line">
                      {test.passage}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sections">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Test Sections</h2>
            <Dialog
              open={isAddingSectionOpen}
              onOpenChange={setIsAddingSectionOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <svg
                    className="w-4 h-4 mr-2"
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
                  Add Section
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>

          {getSections().length > 0 ? (
            <div className="space-y-4">
              {getSections().map((section, index) => (
                <Link
                  href={`/content-manager/tests/${testId}/sections/${section.id}`}
                  key={section.id}
                >
                  <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-white text-lg">
                          {section.title}
                        </CardTitle>
                        {'questions' in section && (
                          <span className="text-sm px-2 py-1 bg-blue-900/30 rounded-full text-blue-400">
                            {section.questions.length} Questions
                          </span>
                        )}
                      </div>
                      <CardDescription className="text-gray-400">
                        {section.description || 'No description provided'}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-gray-700 p-4 mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">
                  No sections yet
                </h3>
                <p className="text-gray-400 text-center mb-6">
                  This test doesn't have any sections yet. Add sections to start
                  creating questions.
                </p>
                <Dialog
                  open={isAddingSectionOpen}
                  onOpenChange={setIsAddingSectionOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <svg
                        className="w-4 h-4 mr-2"
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
                      Add Your First Section
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="preview">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Test Preview</CardTitle>
              <CardDescription className="text-gray-400">
                This is how the test will appear to students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-700 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {test.title}
                </h2>
                <div className="flex space-x-4 mb-6">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-2"
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
                    <span className="text-gray-300">
                      {test.duration} minutes
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                      />
                    </svg>
                    <span
                      className={`text-xs px-2 py-1 rounded-full text-white ${getDifficultyBadgeColor(
                        test.difficulty
                      )}`}
                    >
                      {formatDifficulty(test.difficulty)}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Instructions
                  </h3>
                  <p className="text-gray-300">{test.instructions}</p>
                </div>

                {getSections().length > 0 ? (
                  <div className="space-y-4">
                    {getSections().map((section, index) => (
                      <div
                        key={section.id}
                        className="bg-gray-800 rounded-lg p-4"
                      >
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {section.title}
                        </h3>
                        <p className="text-gray-300 mb-4">
                          {section.description}
                        </p>

                        {'questions' in section &&
                        section.questions.length > 0 ? (
                          <div className="space-y-4">
                            {section.questions.map((question, qIndex) => (
                              <div
                                key={question.id}
                                className="border-t border-gray-700 pt-4"
                              >
                                <p className="text-white mb-2">
                                  Question {qIndex + 1}: {question.text}
                                </p>
                                {question.type === 'multiple_choice' &&
                                  question.options && (
                                    <div className="ml-4 space-y-2">
                                      {question.options.map(
                                        (option, oIndex) => (
                                          <div
                                            key={oIndex}
                                            className="flex items-center"
                                          >
                                            <div className="w-4 h-4 rounded-full border border-gray-500 mr-2"></div>
                                            <span className="text-gray-300">
                                              {option}
                                            </span>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">
                            No questions in this section
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-800 rounded-lg p-8 flex flex-col items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-600 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    <p className="text-gray-400 text-center">
                      This test doesn't have any content yet. Add sections and
                      questions to preview the test.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-gray-400 text-sm">
                Note: This is a preview only. Students will see the test with
                interactive elements and timers.
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
