// app/tests/reading/[testId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { getTestById } from '@/mock/tests';
import { ReadingTest, ReadingQuestion } from '@/types/test';
import TestNavigation from '@/components/shared/TestNavigation';
import ConfirmDialog from '@/components/tests/ConfirmDialog';
import ProgressBar from '@/components/tests/ProgressBar';
import QuestionRenderer from '@/components/tests/QuestionRenderer';
import HighlightTools from '@/components/tests/Reading/HighlightTools';
import ReadingPassage from '@/components/tests/Reading/ReadingPassage';
import TestHeader from '@/components/tests/TestHeader';

interface Highlight {
  id: string;
  text: string;
  color: string;
}

export default function ReadingTestPageId() {
  const params = useParams();
  const testId = params.testId as string;
  const router = useRouter();

  // State
  const [test, setTest] = useState<ReadingTest | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [passageContent, setPassageContent] = useState<string>('');

  // Load test data
  useEffect(() => {
    console.log('Loading test with ID:', testId);

    const testData = getTestById(testId);
    if (testData && testData.skill === 'reading') {
      setTest(testData as ReadingTest);

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
  }, [testId, router]);

  // Handle highlighting text
  const handleHighlight = (selectedText: string, color: string) => {
    console.log(`Highlighting text: "${selectedText}" with color: ${color}`);
    const newHighlight = {
      id: `highlight-${Date.now()}`,
      text: selectedText,
      color: color,
    };

    setHighlights((prev) => [...prev, newHighlight]);
  };

  // Handle submission
  const handleSubmit = () => {
    setIsFinished(true);
    setConfirmSubmit(false);
    console.log('Submitted answers:', answers);

    // Tạo ID kết quả (trong thực tế, ID này sẽ được trả về từ API sau khi lưu kết quả)
    const resultId = testId.replace('test', 'result');

    // Trong môi trường thực tế, bạn sẽ gửi dữ liệu đến API ở đây
    // await submitTestResult(testId, answers, ...);

    // Chuyển hướng đến trang kết quả
    router.push(`/tests/results/reading/${resultId}`);
  };

  // Handle timer completion
  const handleTimeUp = () => {
    console.log('Time is up! Auto-submitting test.');
    handleSubmit();
  };

  // Toggle highlight color
  const toggleHighlightColor = (color: string) => {
    console.log('Toggling highlight color:', color);
    setActiveColor((prev) => {
      const newColor = prev === color ? null : color;
      console.log('New active color:', newColor);
      return newColor;
    });
  };

  // Clear all highlights
  const clearHighlights = () => {
    console.log('Clearing all highlights');
    setHighlights([]);
    setActiveColor(null);
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
      />

      {/* Progress bar */}
      <ProgressBar value={progressValue} />

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reading passage with highlighting tools */}
        <ReadingPassage
          title={`Reading Passage ${currentSection + 1}`}
          description={test.sections[currentSection].title}
          content={passageContent}
          highlights={highlights}
          onHighlight={handleHighlight}
          activeColor={activeColor}
        >
          <HighlightTools
            activeColor={activeColor}
            onColorSelect={toggleHighlightColor}
            onClearHighlights={clearHighlights}
          />
        </ReadingPassage>

        {/* Questions */}
        <div>
          <Card className="bg-gray-800 border-gray-700 h-full">
            <CardContent className="pt-6">
              <div className="space-y-8 overflow-auto h-[560px] pr-2">
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
        </div>
      </div>

      {/* Navigation buttons */}
      <TestNavigation
        onPrevious={handlePrevSection}
        onNext={handleNextSection}
        onSubmit={() => setConfirmSubmit(true)}
        isPreviousDisabled={currentSection === 0}
        isLastSection={currentSection === test.sections.length - 1}
        previousLabel="Previous Section"
        nextLabel="Next Section"
      />

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={confirmSubmit}
        onOpenChange={setConfirmSubmit}
        onConfirm={handleSubmit}
        title="Confirm submission"
        description={`You have answered ${
          Object.keys(answers).length
        } out of ${test.sections.reduce(
          (acc, section) => acc + section.questions.length,
          0
        )} questions.`}
      />
    </div>
  );
}
