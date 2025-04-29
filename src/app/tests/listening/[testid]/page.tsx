'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
import { ListeningQuestion, ListeningTest } from '@/types/test';

export default function ListeningTestPageId() {
  // Use the useParams hook to get route parameters
  const params = useParams();
  const testId = params.testId as string;

  const router = useRouter();
  const [test, setTest] = useState<ListeningTest | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load test data
  useEffect(() => {
    console.log('Loading test with ID:', testId);

    const testData = getTestById(testId);
    if (testData && testData.skill === 'listening') {
      setTest(testData as ListeningTest);
      setTimeRemaining(testData.duration * 60);
    } else {
      console.log('Test not found or not a listening test:', testData);
      router.push('/tests/listening');
    }
  }, [testId, router]);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleAnswerChange = (
    questionId: string,
    answer: string | string[]
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedData = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSubmit = () => {
    setIsFinished(true);
    setConfirmSubmit(false);
    console.log('Submitted answers:', answers);

    // Redirect to results page (would be implemented in a real app)
    // router.push(`/results/listening-result-id`);
  };

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

  const isSectionComplete = () => {
    if (!test) return false;

    const currentSectionQuestions = test.sections[currentSection].questions;
    return currentSectionQuestions.every(
      (question) => answers[question.id] !== undefined
    );
  };

  const calculateProgress = () => {
    if (!test) return 0;

    const totalQuestions = test.sections.reduce(
      (acc, section) => acc + section.questions.length,
      0
    );
    const answeredQuestions = Object.keys(answers).length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  const getProgressColor = () => {
    const progress = calculateProgress();
    if (progress < 33) return 'bg-red-500';
    if (progress < 67) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const renderQuestion = (question: ListeningQuestion) => {
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
                  className=" bg-white"
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

      case 'fill_in_the_blanks':
        return (
          <Input
            placeholder="Nhập câu trả lời..."
            value={(answers[question.id] as string) || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
          />
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
                className=" bg-white"
              />
              <Label htmlFor={`${question.id}-true`} className="text-white">
                True
              </Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem
                value="false"
                id={`${question.id}-false`}
                className=" bg-white"
              />
              <Label htmlFor={`${question.id}-false`} className="text-white">
                False
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="not_given"
                id={`${question.id}-not-given`}
                className=" bg-white"
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

      case 'matching':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-white mb-2">Tùy chọn:</p>
              {question.options?.map((option, index) => (
                <div key={index} className="mb-2 bg-gray-700 p-2 rounded">
                  {option}
                </div>
              ))}
            </div>
            <div>
              <p className="text-white mb-2">Chọn các cặp phù hợp:</p>
              <Input
                placeholder="Ví dụ: A-1, B-3, C-2"
                value={(answers[question.id] as string) || ''}
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
        );

      case 'short_answer':
        return (
          <Input
            placeholder="Nhập câu trả lời ngắn..."
            value={(answers[question.id] as string) || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
          />
        );

      default:
        return <p className="text-gray-400">Loại câu hỏi không được hỗ trợ.</p>;
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

      {/* Progress bar with color based on progress level */}
      <div className="bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
        <div
          className={`h-full rounded-full ${getProgressColor()}`}
          style={{ width: `${progressValue}%` }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="bg-gray-800 border-gray-700 sticky top-24">
            <CardHeader>
              <CardTitle className="text-white">Sections</CardTitle>
              <CardDescription className="text-gray-400">
                Choose the test section
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={currentSection.toString()}
                onValueChange={(value) => setCurrentSection(parseInt(value))}
              >
                <TabsList className="grid grid-cols-4 w-full bg-gray-700">
                  {test.sections.map((_, index) => (
                    <TabsTrigger
                      key={index}
                      value={index.toString()}
                      className="text-gray-400 data-[state=active]:text-black"
                    >
                      {index + 1}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Audio player */}
              <div className="mt-6">
                <h3 className="text-white font-medium mb-2">Audio</h3>
                <audio
                  ref={audioRef}
                  src={test.audioUrl || '/audio/sample-listening.mp3'}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedData={handleLoadedData}
                  onEnded={() => setIsPlaying(false)}
                  className="hidden"
                />
                <div className="bg-gray-700 p-3 rounded-lg">
                  <div className="flex justify-between items-center text-gray-400 text-sm mb-2">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  <div className="relative w-full h-1 bg-gray-600 rounded-full mb-3">
                    <div
                      className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePlayPause}
                      className="text-black border-gray-600 hover:bg-gray-600 hover:text-white "
                    >
                      {isPlaying ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-gray-400 text-sm">
                  <p className="mb-1">Lưu ý:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>You will hear the audio only one time</li>
                    <li>
                      Ensure that headphone is available and you have enough
                      time to do the full test
                    </li>
                    <li>
                      Read the question carefully before finding the information
                    </li>
                  </ul>
                </div>
              </div>

              {/* Submit button */}
              <div className="mt-6">
                <Dialog open={confirmSubmit} onOpenChange={setConfirmSubmit}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Submit test
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-gray-700 text-white">
                    <DialogHeader>
                      <DialogTitle>Confirm submit</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        You have answered {Object.keys(answers).length}{' '}
                        questions on total{' '}
                        {test.sections.reduce(
                          (acc, section) => acc + section.questions.length,
                          0
                        )}{' '}
                        questions.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-yellow-500 mb-3">
                        Are you sure you want to submit? You will not be able to
                        go back after you have submitted.
                      </p>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="confirm" />
                        <label
                          htmlFor="confirm"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I understand and confirm submit
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
                        Confirm submit
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Questions */}
        <div className="md:col-span-2">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">
                Part {currentSection + 1}: {test.sections[currentSection].title}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {test.sections[currentSection].description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
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

          {/* Navigation buttons */}
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
              Previous
            </Button>
            {currentSection < test.sections.length - 1 ? (
              <Button
                onClick={handleNextSection}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next
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
              <Button
                onClick={() => setConfirmSubmit(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                Completed the exam
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
