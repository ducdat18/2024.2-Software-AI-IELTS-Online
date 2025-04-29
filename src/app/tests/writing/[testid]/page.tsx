// app/tests/writing/[testId]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTestById } from '@/mock/tests';
import { WritingTest } from '@/types/test';
import Image from 'next/image';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ConfirmDialog from '@/components/tests/ConfirmDialog';
import ProgressBar from '@/components/tests/ProgressBar';
import TestHeader from '@/components/tests/TestHeader';
import WordCounter from '@/components/tests/Writing/WordCounter';
import WritingEditor from '@/components/tests/Writing/WritingEditor';

export default function WritingTestPageId() {
  const params = useParams();
  const testId = params.testId as string;
  const router = useRouter();

  // Component state
  const [test, setTest] = useState<WritingTest | null>(null);
  const [currentTask, setCurrentTask] = useState('task1');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [wordCounts, setWordCounts] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<string | null>(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const autoSaveTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Load test data
  useEffect(() => {
    console.log('Loading test data');
    const testData = getTestById(testId);
    if (testData && testData.skill === 'writing') {
      setTest(testData as WritingTest);

      // Initialize answers with empty strings
      const initialAnswers: Record<string, string> = {};
      (testData as WritingTest).tasks.forEach((task) => {
        initialAnswers[task.id] = '';
      });
      setAnswers(initialAnswers);

      // Initialize word counts
      const initialWordCounts: Record<string, number> = {};
      (testData as WritingTest).tasks.forEach((task) => {
        initialWordCounts[task.id] = 0;
      });
      setWordCounts(initialWordCounts);
    } else {
      console.log('Test not found or not a writing test');
      router.push('/tests/writing');
    }
  }, [testId, router]);

  // Auto-save functionality
  useEffect(() => {
    // Clear previous timer on each answer change
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    if (Object.values(answers).some((answer) => answer.length > 0)) {
      setAutoSaveStatus('Saving...');

      autoSaveTimerRef.current = setTimeout(() => {
        // Simulate saving to server
        console.log('Auto-saving answers:', answers);
        setAutoSaveStatus('Saved');

        // Reset status after 3 seconds
        setTimeout(() => {
          setAutoSaveStatus(null);
        }, 3000);
      }, 1500);
    }

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [answers]);

  // Handle text input and update word count
  const handleTextChange = (taskId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [taskId]: value,
    }));

    const newWordCount = countWords(value);
    setWordCounts((prev) => ({
      ...prev,
      [taskId]: newWordCount,
    }));
  };

  // Count words in text
  const countWords = (text: string) => {
    if (!text || text.trim().length === 0) return 0;
    return text.trim().split(/\s+/).length;
  };

  // Handle submit
  // Cập nhật hàm handleSubmit trong file app/tests/writing/[testId]/page.tsx

  const handleSubmit = () => {
    setIsFinished(true);
    setConfirmSubmit(false);
    console.log('Submitted answers:', answers);
    console.log('Word counts:', wordCounts);

    // Tạo ID kết quả (trong thực tế, ID này sẽ được trả về từ API sau khi lưu kết quả)
    const resultId = `writing-result-${Date.now()}`;

    // Trong môi trường thực tế, bạn sẽ gửi dữ liệu đến API ở đây
    // await submitTestResult(testId, answers, wordCounts, ...);

    // Chuyển hướng đến trang kết quả
    router.push(`/results/writing/${resultId}`);
  };

  // Handle timer completion
  const handleTimeUp = () => {
    console.log('Time is up! Auto-submitting test.');
    handleSubmit();
  };

  // Calculate overall progress
  const calculateProgress = () => {
    if (!test) return 0;

    const task1WordCount = wordCounts[test.tasks[0].id] || 0;
    const task2WordCount = test.tasks[1]
      ? wordCounts[test.tasks[1].id] || 0
      : 0;

    const task1Target = test.tasks[0].wordCount || 150;
    const task2Target = test.tasks[1] ? test.tasks[1].wordCount || 250 : 0;

    const task1Progress = Math.min(task1WordCount / task1Target, 1);
    const task2Progress = Math.min(task2WordCount / task2Target, 1);

    // Task 2 is weighted more heavily
    return (task1Progress * 0.4 + task2Progress * 0.6) * 100;
  };

  // Get current task object
  const getCurrentTask = () => {
    if (!test) return null;
    return test.tasks.find((task) => task.type === currentTask) || null;
  };

  if (!test) {
    return (
      <div className="container mx-auto px-4 py-24 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const task = getCurrentTask();
  const progressValue = calculateProgress();

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Header with test info and timer */}
      <TestHeader
        title={test.title}
        description={test.description}
        durationInSeconds={test.duration * 60}
        onTimeUp={handleTimeUp}
        progress={progressValue}
        currentSection={currentTask === 'task1' ? 'Task 1' : 'Task 2'}
        autoSaveStatus={autoSaveStatus}
      />

      {/* Progress bar */}
      <ProgressBar value={progressValue} />

      {/* Task tabs */}
      <Tabs value={currentTask} onValueChange={setCurrentTask} className="mb-6">
        <TabsList className="bg-gray-700 w-full max-w-md mx-auto flex">
          <TabsTrigger
            value="task1"
            className="flex-1 text-gray-400 data-[state=active]:text-black"
          >
            Task 1
          </TabsTrigger>
          <TabsTrigger
            value="task2"
            className="flex-1 text-gray-400 data-[state=active]:text-black"
          >
            Task 2
          </TabsTrigger>
        </TabsList>

        {task && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Task Instructions and Prompt */}
            <div className="md:col-span-1">
              <Card className="bg-gray-800 border-gray-700 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-white">
                    {task.type === 'task1' ? 'Task 1' : 'Task 2'}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {task.type === 'task1'
                      ? 'Suggested time: 20 minutes'
                      : 'Suggested time: 40 minutes'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-white mb-4">{task.question}</div>

                  {/* For Task 1, display image if available */}
                  {task.type === 'task1' && task.imageUrl && (
                    <div className="bg-gray-700 p-3 rounded-lg mb-4">
                      <div className="relative overflow-hidden rounded-md">
                        {/* Use a larger width for Task 1 specifically */}
                        <div
                          className="h-64 md:h-80 w-full relative cursor-pointer"
                          onClick={() => setImageDialogOpen(true)}
                        >
                          <Image
                            src={task.imageUrl}
                            alt="Task 1 Image"
                            layout="fill"
                            objectFit="contain"
                            className="rounded-md hover:scale-[1.02] transition-transform"
                            priority
                          />
                        </div>
                        <div className="mt-2 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-gray-400 hover:text-white"
                            onClick={() => setImageDialogOpen(true)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                            View larger
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image Dialog for full-screen view */}
                  <Dialog
                    open={imageDialogOpen}
                    onOpenChange={setImageDialogOpen}
                  >
                    <DialogContent className="max-w-5xl bg-gray-900 border-gray-800 p-1">
                      <div className="relative w-full h-[80vh]">
                        {task.type === 'task1' && task.imageUrl && (
                          <Image
                            src={task.imageUrl}
                            alt="Task 1 Image (Full Size)"
                            layout="fill"
                            objectFit="contain"
                            className="rounded-md"
                            priority
                          />
                        )}
                      </div>
                      <div className="p-2 text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => setImageDialogOpen(false)}
                        >
                          Close
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Word count target */}
                  <div className="bg-gray-700 p-3 rounded-lg mb-4">
                    <WordCounter
                      text={answers[task.id] || ''}
                      targetCount={task.wordCount}
                    />
                  </div>

                  {/* Marking criteria */}
                  <div className="mb-4">
                    <h3 className="text-white font-medium mb-2">
                      Marking Criteria:
                    </h3>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• {task.markingCriteria.taskAchievement}</li>
                      <li>• {task.markingCriteria.coherenceCohesion}</li>
                      <li>• {task.markingCriteria.lexicalResource}</li>
                      <li>• {task.markingCriteria.grammaticalRange}</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Writing Area */}
            <div className="md:col-span-2">
              <WritingEditor
                taskId={task.id}
                value={answers[task.id] || ''}
                onChange={(value) => handleTextChange(task.id, value)}
                wordCount={wordCounts[task.id] || 0}
                targetWordCount={task.wordCount}
                placeholder={`Write your ${
                  task.type === 'task1' ? 'description' : 'essay'
                } here...`}
                actions={
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-white bg-gray-700 border-gray-600"
                      onClick={() => {
                        if (currentTask === 'task1') {
                          setCurrentTask('task2');
                        } else {
                          setCurrentTask('task1');
                        }
                      }}
                    >
                      {currentTask === 'task1'
                        ? 'Switch to Task 2'
                        : 'Switch to Task 1'}
                    </Button>

                    <Button
                      onClick={() => setConfirmSubmit(true)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Submit Test
                    </Button>
                  </>
                }
              />
            </div>
          </div>
        )}
      </Tabs>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={confirmSubmit}
        onOpenChange={setConfirmSubmit}
        onConfirm={handleSubmit}
        title="Confirm submission"
        description={
          <>
            Task 1: {wordCounts[test.tasks[0].id] || 0} /{' '}
            {test.tasks[0].wordCount} words
            {test.tasks[1] && (
              <span className="block mt-4">
                Task 2: {wordCounts[test.tasks[1].id] || 0} /{' '}
                {test.tasks[1].wordCount} words
              </span>
            )}
          </>
        }
      />
    </div>
  );
}
