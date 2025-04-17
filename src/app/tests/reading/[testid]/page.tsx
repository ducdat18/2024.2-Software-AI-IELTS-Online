'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getTestById } from '@/mock/tests';
import { ReadingQuestion, ReadingTest } from '@/types/test';

// Define highlight interface
interface Highlight {
  id: string;
  text: string;
  color: string;
}

interface PageParams {
  params: {
    testId: string;
  };
}

export default function ReadingTestPageId({ params }: PageParams) {
  const router = useRouter();
  const [test, setTest] = useState<ReadingTest | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const passageRef = useRef<HTMLDivElement>(null);
  const [passageContent, setPassageContent] = useState<string>('');

  // Highlight colors with labels
  const highlightColors = [
    { name: 'Yellow', color: 'rgba(255, 255, 0, 0.4)' },
    { name: 'Green', color: 'rgba(0, 255, 0, 0.4)' },
    { name: 'Pink', color: 'rgba(255, 105, 180, 0.4)' },
    { name: 'Blue', color: 'rgba(173, 216, 230, 0.4)' },
  ];

  // Load test data
  useEffect(() => {
    console.log('Loading test with ID:', params.testId);

    const testData = getTestById(params.testId);
    if (testData && testData.skill === 'reading') {
      setTest(testData as ReadingTest);
      setTimeRemaining(testData.duration * 60);

      // Format passage with paragraphs
      if ((testData as ReadingTest).passage) {
        const formattedPassage = (testData as ReadingTest).passage
          .split('\n\n')
          .map(
            (para, index) =>
              `<p id="para-${index}" class="mb-4">${para.trim()}</p>`
          )
          .join('');
        setPassageContent(formattedPassage);
      }
    } else {
      console.log('Test not found or not a reading test:', testData);
      router.push('/tests/reading');
    }
  }, [params.testId, router]);

  // Apply highlights when highlights change
  useEffect(() => {
    if (!test) return;

    let highlightedContent = passageContent;

    // Apply highlights to content
    // Sort highlights by length (longest first) to avoid nested highlighting issues
    const sortedHighlights = [...highlights].sort(
      (a, b) => b.text.length - a.text.length
    );

    sortedHighlights.forEach((highlight) => {
      // Escape special regex characters in the search text
      const escapedText = highlight.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // Use regex to replace all occurrences, but avoid replacing inside HTML tags
      const regex = new RegExp(`(${escapedText})(?![^<]*>|[^<>]*<\/)`, 'g');
      highlightedContent = highlightedContent.replace(
        regex,
        `<span class="highlight-text" style="background-color: ${highlight.color};">$1</span>`
      );
    });

    if (passageRef.current) {
      passageRef.current.innerHTML = highlightedContent;
    }
  }, [highlights, passageContent, test]);

  // Timer effect
  useEffect(() => {
    if (!isFinished && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isFinished, timeRemaining]);

  // Highlight selected text with the active color
  const handleMouseUp = () => {
    if (!activeColor) return;

    const selection = window.getSelection();
    if (!selection || selection.toString().trim() === '') return;

    const selectedText = selection.toString().trim();
    if (selectedText) {
      const newHighlight: Highlight = {
        id: `highlight-${Date.now()}`,
        text: selectedText,
        color: activeColor,
      };

      setHighlights((prev) => [...prev, newHighlight]);

      // Clear selection after a short delay to show the highlight effect
      setTimeout(() => {
        if (window.getSelection) {
          window.getSelection()?.removeAllRanges();
        }
      }, 200);
    }
  };

  // Function to toggle highlight color selection
  const toggleHighlightColor = (color: string) => {
    setActiveColor((prev) => (prev === color ? null : color));
  };

  // Clear all highlights
  const clearHighlights = () => {
    setHighlights([]);
    setActiveColor(null);
  };

  // Format time display (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  // Handle answer changes
  const handleAnswerChange = (
    questionId: string,
    answer: string | string[]
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Handle test submission
  const handleSubmit = () => {
    setIsFinished(true);
    setConfirmSubmit(false);
    console.log('Submitted answers:', answers);
    // Redirect to results page (would be implemented in a real app)
    // router.push(`/results/reading-result-id`);
  };

  // Navigation between sections
  const handleNextSection = () => {
    if (test && currentSection < test.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  // Calculate overall progress
  const calculateProgress = () => {
    if (!test) return 0;

    const totalQuestions = test.sections.reduce(
      (acc, section) => acc + section.questions.length,
      0
    );
    const answeredQuestions = Object.keys(answers).length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  // Get progress color based on percentage
  const getProgressColor = () => {
    const progress = calculateProgress();
    if (progress < 33) return 'bg-red-500'; // Low progress
    if (progress < 67) return 'bg-yellow-500'; // Medium progress
    return 'bg-green-500'; // High progress
  };

  // Render question based on type
  const renderQuestion = (question: ReadingQuestion) => {
    switch (question.type) {
      case 'multiple_choice':
        return (
          <RadioGroup
            value={(answers[question.id] as string) || ''}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem
                  value={option}
                  id={`${question.id}-option-${index}`}
                  className="bg-white"
                />
                <Label
                  htmlFor={`${question.id}-option-${index}`}
                  className="text-white"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'true_false_not_given':
        return (
          <RadioGroup
            value={(answers[question.id] as string) || ''}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
          >
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem
                value="true"
                id={`${question.id}-true`}
                className="bg-white"
              />
              <Label htmlFor={`${question.id}-true`} className="text-white">
                True
              </Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem
                value="false"
                id={`${question.id}-false`}
                className="bg-white"
              />
              <Label htmlFor={`${question.id}-false`} className="text-white">
                False
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="not_given"
                id={`${question.id}-not-given`}
                className="bg-white"
              />
              <Label
                htmlFor={`${question.id}-not-given`}
                className="text-white"
              >
                Not Given
              </Label>
            </div>
          </RadioGroup>
        );

      case 'fill_in_the_blanks':
        return (
          <Input
            placeholder="Type your answer..."
            value={(answers[question.id] as string) || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
          />
        );

      case 'matching_headings':
        return (
          <div className="grid grid-cols-1 gap-4">
            {question.options?.map((option, index) => (
              <div key={index} className="mb-2">
                <div className="mb-1 font-medium text-white">{option}</div>
                <Input
                  placeholder="Enter matching paragraph (e.g., A, B, C)"
                  value={
                    ((answers[question.id] as string[]) || [])[index] || ''
                  }
                  onChange={(e) => {
                    const newAnswers = [
                      ...((answers[question.id] as string[]) || []),
                    ];
                    newAnswers[index] = e.target.value;
                    handleAnswerChange(question.id, newAnswers);
                  }}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            ))}
          </div>
        );

      default:
        return <p className="text-gray-400">Question type not supported.</p>;
    }
  };

  if (!test) {
    return (
      <div className="container mx-auto px-4 py-24 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const progressValue = calculateProgress();

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {test.title}
          </h1>
          <p className="text-gray-400">{test.description}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Badge
            variant="outline"
            className="px-3 py-1 text-yellow-500 border-yellow-500"
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Time left: {formatTime(timeRemaining)}
          </Badge>
          <Badge
            variant="outline"
            className={`px-3 py-1 border-${getProgressColor().substring(3)}`}
            style={{
              borderColor: `var(--${getProgressColor().substring(3)}`,
              color: `var(--${getProgressColor().substring(3)}`,
            }}
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Completed: {progressValue.toFixed(0)}%
          </Badge>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
        <div
          className={`h-full rounded-full ${getProgressColor()}`}
          style={{ width: `${progressValue}%` }}
        />
      </div>

      {/* Section tabs */}
      <div className="mb-6">
        <Tabs
          value={currentSection.toString()}
          onValueChange={(value) => setCurrentSection(parseInt(value))}
        >
          <TabsList className="bg-gray-700 w-full max-w-md mx-auto flex">
            {test.sections.map((_, index) => (
              <TabsTrigger
                key={index}
                value={index.toString()}
                className="flex-1 text-gray-400 data-[state=active]:text-black"
              >
                Section {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Split screen layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reading passage */}
        <div>
          <Card className="bg-gray-800 border-gray-700 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">
                Reading Passage {currentSection + 1}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {test.sections[currentSection].title}
              </CardDescription>
            </CardHeader>

            {/* Highlight toolbar - Now more prominent and at the top of the content */}
            <div className="px-4 py-3 bg-gray-700 border-t border-b border-gray-600">
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-sm font-medium text-white">
                  Highlight Tools:
                </div>

                <div className="flex items-center gap-2 ml-2">
                  {highlightColors.map((colorOption, index) => (
                    <button
                      key={index}
                      className={`w-7 h-7 rounded transition-all ${
                        activeColor === colorOption.color
                          ? 'ring-2 ring-white scale-110'
                          : 'hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: colorOption.color,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                      }}
                      onClick={() => toggleHighlightColor(colorOption.color)}
                      title={`Highlight with ${colorOption.name}`}
                    />
                  ))}
                </div>

                <button
                  className="ml-2 text-sm bg-gray-600 text-white hover:bg-gray-500 px-3 py-1 rounded transition-colors"
                  onClick={clearHighlights}
                >
                  Clear All Highlights
                </button>

                {activeColor && (
                  <div className="ml-auto text-sm text-yellow-300 font-medium bg-gray-800 px-3 py-1 rounded-full">
                    <span className="animate-pulse">✓</span> Select text to
                    highlight
                  </div>
                )}
              </div>
            </div>

            <CardContent className="pt-3">
              <div
                ref={passageRef}
                className="bg-gray-700 p-4 rounded-lg text-white text-justify leading-relaxed overflow-auto h-[560px] reading-passage"
                onMouseUp={handleMouseUp}
                style={{
                  userSelect: 'text',
                  WebkitUserSelect: 'text',
                  MozUserSelect: 'text',
                  cursor: activeColor ? 'pointer' : 'text',
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Questions */}
        <div>
          <Card className="bg-gray-800 border-gray-700 h-full">
            <CardHeader>
              <CardTitle className="text-white">Questions</CardTitle>
              <CardDescription className="text-gray-400">
                {test.sections[currentSection].description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8 overflow-auto h-[560px] pr-2">
                {test.sections[currentSection].questions.map(
                  (question, index) => (
                    <div
                      key={question.id}
                      className="border-b border-gray-700 pb-6 last:border-0"
                    >
                      <p className="text-white font-medium mb-3">
                        Question {index + 1}: {question.text}
                      </p>
                      {renderQuestion(question)}
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Navigation and submit */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevSection}
              disabled={currentSection === 0}
              className="border-gray-600 text-black"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous Section
            </Button>
            {currentSection < test.sections.length - 1 ? (
              <Button
                onClick={handleNextSection}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next Section
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            ) : (
              <Dialog open={confirmSubmit} onOpenChange={setConfirmSubmit}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Submit Test
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700 text-white">
                  <DialogHeader>
                    <DialogTitle>Confirm submission</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      You have answered {Object.keys(answers).length} out of{' '}
                      {test.sections.reduce(
                        (acc, section) => acc + section.questions.length,
                        0
                      )}{' '}
                      questions.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-yellow-500 mb-3">
                      Are you sure you want to submit? You cannot return to the
                      test after submission.
                    </p>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="confirm" />
                      <label
                        htmlFor="confirm"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I understand and confirm submission
                      </label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setConfirmSubmit(false)}
                      className="text-black"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Confirm submission
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>

      {/* Add CSS to enhance text selection and highlighting */}
      <style jsx global>{`
        /* Improve text selection appearance */
        ::selection {
          background: rgba(66, 153, 225, 0.4) !important;
          color: white !important;
        }

        /* Make paragraphs more selectable */
        .reading-passage p {
          margin-bottom: 1rem;
          line-height: 1.8;
          font-size: 1.05rem;
          user-select: text !important;
          -webkit-user-select: text !important;
          -moz-user-select: text !important;
          cursor: text;
          padding: 0.5rem;
          border-radius: 4px;
        }

        /* Make paragraphs slightly highlighted when hovered to help with selection */
        .reading-passage p:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }

        /* Style for highlighted text */
        .highlight-text {
          border-radius: 2px;
          padding: 0 2px;
          display: inline-block;
          line-height: 1.2em;
        }
      `}</style>
    </div>
  );
}
