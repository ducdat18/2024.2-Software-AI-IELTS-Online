// components/results/WritingFeedback.tsx
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

export interface WritingCriteria {
  name: string;
  score: number;
  feedback: string;
  suggestions: string[];
}

export interface WritingTask {
  id: string;
  type: 'task1' | 'task2';
  question: string;
  wordCount: number;
  userAnswer: string;
  criteria: WritingCriteria[];
  score: number;
}

interface WritingFeedbackProps {
  tasks: WritingTask[];
  sampleAnswer?: string;
  overallFeedback?: string;
}

export default function WritingFeedback({
  tasks,
  sampleAnswer,
  overallFeedback,
}: WritingFeedbackProps) {
  const [currentTask, setCurrentTask] = useState<string>(
    tasks[0]?.type || 'task1'
  );
  const [showSample, setShowSample] = useState(false);

  // Get the current task
  const activeTask = tasks.find((task) => task.type === currentTask);

  // Format the task type for display
  const formatTaskType = (type: string) => {
    return type === 'task1' ? 'Task 1' : 'Task 2';
  };

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 7) return 'text-green-500';
    if (score >= 6) return 'text-blue-500';
    if (score >= 5) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Handle value change with proper type casting
  const handleValueChange = (value: string) => {
    // Make sure value is either 'task1' or 'task2'
    if (value === 'task1' || value === 'task2') {
      setCurrentTask(value);
    }
  };

  if (!activeTask) {
    return <div className="text-gray-400">No writing tasks found</div>;
  }

  return (
    <div className="space-y-6">
      <Tabs value={currentTask} onValueChange={handleValueChange}>
        <TabsList className="grid grid-cols-2 bg-gray-700 mb-6">
          {tasks.map((task) => (
            <TabsTrigger
              key={task.id}
              value={task.type}
              className="text-gray-400 data-[state=active]:text-black"
            >
              {formatTaskType(task.type)}
              <Badge className="ml-2 bg-gray-600">
                {task.score.toFixed(1)}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {tasks.map((task) => (
          <TabsContent key={task.id} value={task.type} className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex justify-between items-center">
                      <span>{formatTaskType(task.type)} - Your Answer</span>
                      <Badge className={`text-sm ${getScoreColor(task.score)}`}>
                        Score: {task.score.toFixed(1)}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Word count: {task.wordCount}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-700 p-4 rounded-lg text-gray-200 whitespace-pre-line">
                      {task.userAnswer}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Detailed Feedback
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Analysis by criterion
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {task.criteria.map((criterion, index) => (
                        <div
                          key={index}
                          className="pb-4 border-b border-gray-700 last:border-0"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-white font-medium">
                              {criterion.name}
                            </h3>
                            <Badge className="bg-gray-600">
                              {criterion.score}/9
                            </Badge>
                          </div>
                          <p className="text-gray-300 mb-3 text-sm">
                            {criterion.feedback}
                          </p>

                          {criterion.suggestions &&
                            criterion.suggestions.length > 0 && (
                              <div>
                                <h4 className="text-gray-200 text-xs mb-2">
                                  Suggestions:
                                </h4>
                                <ul className="list-disc pl-5 space-y-1 text-gray-300 text-xs">
                                  {criterion.suggestions.map(
                                    (suggestion, idx) => (
                                      <li key={idx}>{suggestion}</li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Task prompt */}
            <Card className="bg-gray-800 border-gray-700 mt-6">
              <CardHeader>
                <CardTitle className="text-white text-lg">
                  Task Question
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{task.question}</p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {sampleAnswer && (
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
                onClick={() => setShowSample(!showSample)}
                className="text-blue-400 hover:text-blue-300"
              >
                {showSample ? 'Hide' : 'Show'}
              </Button>
            </CardDescription>
          </CardHeader>
          {showSample && (
            <CardContent>
              <div className="bg-gray-700 p-4 rounded-lg text-gray-200 whitespace-pre-line">
                {sampleAnswer}
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {overallFeedback && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Overall Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">{overallFeedback}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
