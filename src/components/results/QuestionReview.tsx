// components/results/QuestionReview.tsx
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

export interface QuestionResult {
  id: string;
  text: string;
  type: string;
  userAnswer: string | string[];
  correctAnswer: string | string[];
  options?: string[];
  explanation?: string;
  isCorrect: boolean;
}

export interface SectionQuestions {
  title: string;
  questions: QuestionResult[];
}

interface QuestionReviewProps {
  sections: SectionQuestions[];
}

export default function QuestionReview({ sections }: QuestionReviewProps) {
  const [currentSection, setCurrentSection] = useState('0');

  // Format answer for display
  const formatAnswer = (answer: string | string[]) => {
    if (Array.isArray(answer)) {
      return answer.join(', ');
    }
    return answer;
  };

  // Handle section change
  const handleSectionChange = (value: string) => {
    setCurrentSection(value);
  };

  // Get badge color based on percentage
  const getBadgeColor = (correct: number, total: number) => {
    const percentage = (correct / total) * 100;
    if (percentage >= 80) return 'bg-green-600';
    if (percentage >= 60) return 'bg-blue-600';
    if (percentage >= 40) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Question Review</CardTitle>
        <CardDescription className="text-gray-400">
          Review your answers and see explanations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={currentSection} onValueChange={handleSectionChange}>
          <TabsList className="flex bg-gray-700 mb-6 h-auto p-1 overflow-x-auto">
            {sections.map((section, index) => {
              const correctCount = section.questions.filter(
                (q) => q.isCorrect
              ).length;
              const totalCount = section.questions.length;
              const badgeColor = getBadgeColor(correctCount, totalCount);

              return (
                <TabsTrigger
                  key={index}
                  value={index.toString()}
                  className="flex-shrink-0 text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-600 py-2 px-4"
                >
                  {section.title}
                  <Badge className={`ml-2 ${badgeColor} text-xs`}>
                    {correctCount}/{totalCount}
                  </Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {sections.map((section, sectionIndex) => (
            <TabsContent
              key={sectionIndex}
              value={sectionIndex.toString()}
              className="mt-0"
            >
              <div className="space-y-6">
                {section.questions.map((question, qIndex) => (
                  <div
                    key={question.id}
                    className="border-b border-gray-700 pb-6 last:border-0"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <span className="font-medium text-white mr-2">
                          Question {qIndex + 1}:
                        </span>
                        <span className="text-gray-300">{question.text}</span>
                      </div>
                      <Badge
                        className={
                          question.isCorrect ? 'bg-green-500' : 'bg-red-500'
                        }
                      >
                        {question.isCorrect ? 'Correct' : 'Incorrect'}
                      </Badge>
                    </div>

                    {question.type === 'multiple_choice' &&
                      question.options && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-400 mb-2">Options:</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {question.options.map((option, idx) => (
                              <div
                                key={idx}
                                className={`px-3 py-2 rounded text-sm ${
                                  formatAnswer(question.correctAnswer) ===
                                  option
                                    ? 'bg-green-800/30 border border-green-500 text-white'
                                    : formatAnswer(question.userAnswer) ===
                                      option
                                    ? 'bg-red-800/30 border border-red-500 text-white'
                                    : 'bg-gray-700 text-gray-300'
                                }`}
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 text-sm">
                      <div>
                        <p className="text-gray-400 mb-1">Your answer:</p>
                        <div
                          className={`px-3 py-2 rounded ${
                            question.isCorrect
                              ? 'bg-green-800/30 border border-green-500 text-white'
                              : 'bg-red-800/30 border border-red-500 text-white'
                          }`}
                        >
                          {formatAnswer(question.userAnswer) ||
                            'No answer provided'}
                        </div>
                      </div>
                      {!question.isCorrect && (
                        <div>
                          <p className="text-gray-400 mb-1">Correct answer:</p>
                          <div className="px-3 py-2 rounded bg-green-800/30 border border-green-500 text-white">
                            {formatAnswer(question.correctAnswer)}
                          </div>
                        </div>
                      )}
                    </div>

                    {question.explanation && (
                      <div>
                        <p className="text-gray-400 mb-1 text-sm">
                          Explanation:
                        </p>
                        <div className="px-3 py-2 bg-gray-700 rounded text-gray-300 text-sm">
                          {question.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
