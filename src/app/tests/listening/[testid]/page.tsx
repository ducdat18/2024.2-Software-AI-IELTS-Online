// app/tests/listening/[testId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { getTestById } from '@/mock/tests';
import { ListeningTest } from '@/types/test';

import { Button } from '@/components/ui/button';
import TestNavigation from '@/components/shared/TestNavigation';
import ConfirmDialog from '@/components/tests/ConfirmDialog';
import AudioPlayer from '@/components/tests/Listening/AudioPlayer';
import ProgressBar from '@/components/tests/ProgressBar';
import QuestionRenderer from '@/components/tests/QuestionRenderer';
import TestHeader from '@/components/tests/TestHeader';

export default function ListeningTestPageId() {
  const params = useParams();
  const testId = params.testId as string;
  const router = useRouter();

  // State
  const [test, setTest] = useState<ListeningTest | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  // Load test data
  useEffect(() => {
    console.log('Loading test with ID:', testId);

    const testData = getTestById(testId);
    if (testData && testData.skill === 'listening') {
      setTest(testData as ListeningTest);
    } else {
      console.log('Test not found or not a listening test:', testData);
      router.push('/tests/listening');
    }
  }, [testId, router]);

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

  // Handle audio playback events
  const handleAudioPlay = () => {
    setIsPlaying(true);
    console.log('Audio started playing');
  };

  const handleAudioPause = () => {
    setIsPlaying(false);
    console.log('Audio paused');
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    console.log('Audio playback completed');
  };

  const handleSubmit = () => {
    setIsFinished(true);
    setConfirmSubmit(false);
    console.log('Submitted answers:', answers);

    // Tạo ID kết quả (trong thực tế, ID này sẽ được trả về từ API sau khi lưu kết quả)
    const resultId = testId.replace('test', 'result');

    // Trong môi trường thực tế, bạn sẽ gửi dữ liệu đến API ở đây
    // await submitTestResult(testId, answers, ...);

    // Chuyển hướng đến trang kết quả
    router.push(`/tests/results/listening/${resultId}`);
  };

  // Handle timer completion
  const handleTimeUp = () => {
    console.log('Time is up! Auto-submitting test.');
    handleSubmit();
  };

  // Navigation functions
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

  // Calculate completion progress
  const calculateProgress = () => {
    if (!test) return 0;

    const totalQuestions = test.sections.reduce(
      (acc, section) => acc + section.questions.length,
      0
    );
    const answeredQuestions = Object.keys(answers).length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  // Check if current section is complete
  const isSectionComplete = () => {
    if (!test) return false;

    const currentSectionQuestions = test.sections[currentSection].questions;
    return currentSectionQuestions.every(
      (question) => answers[question.id] !== undefined
    );
  };

  // Loading state
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
      {/* Header with test info and timer */}
      <TestHeader
        title={test.title}
        description={test.description}
        durationInSeconds={test.duration * 60}
        onTimeUp={handleTimeUp}
        progress={progressValue}
        currentSection={`Part ${currentSection + 1}`}
      />

      {/* Progress bar */}
      <ProgressBar value={progressValue} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left sidebar with audio player and section navigation */}
        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Section tabs */}
            <Card className="bg-gray-800 border-gray-700">
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
              </CardContent>
            </Card>

            {/* Audio Player */}
            <AudioPlayer
              audioUrl={test.audioUrl || '/audio/sample-listening.mp3'}
              title="Audio"
              description="Listen carefully to answer the questions"
              onPlay={handleAudioPlay}
              onPause={handleAudioPause}
              onEnded={handleAudioEnded}
            />

            {/* Submit button */}
            <Button
              onClick={() => setConfirmSubmit(true)}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Submit test
            </Button>
          </div>
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
                    <QuestionRenderer
                      key={question.id}
                      question={question as any} // Type casting to match QuestionRenderer props
                      answer={answers[question.id] || ''}
                      onAnswerChange={handleAnswerChange}
                      index={index}
                    />
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Navigation buttons */}
          <TestNavigation
            onPrevious={handlePrevSection}
            onNext={handleNextSection}
            onSubmit={() => setConfirmSubmit(true)}
            isPreviousDisabled={currentSection === 0}
            isLastSection={currentSection === test.sections.length - 1}
            previousLabel="Previous"
            nextLabel="Next"
            submitLabel="Complete the exam"
          />
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={confirmSubmit}
        onOpenChange={setConfirmSubmit}
        onConfirm={handleSubmit}
        title="Confirm submission"
        description={`You have answered ${
          Object.keys(answers).length
        } questions out of total ${test.sections.reduce(
          (acc, section) => acc + section.questions.length,
          0
        )} questions.`}
        warningText="Are you sure you want to submit? You will not be able to go back after you have submitted."
      />
    </div>
  );
}
