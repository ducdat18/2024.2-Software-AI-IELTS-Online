// app/results/listening/[resultId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ResultBreakdown from '@/components/results/ResultBreakdown';
import QuestionReview from '@/components/results/QuestionReview';
import AIFeedback from '@/components/results/AIFeedback';
import { Button } from '@/components/ui/button';
import { getDetailedResultById } from '@/mock/test-results';
import { ListeningTestResult } from '@/mock/test-results';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TestResultHeader from '@/components/results/TestResultHeader';

export default function ListeningTestResultPage() {
  const params = useParams();
  const resultId = params.resultId as string;
  const router = useRouter();

  const [resultData, setResultData] = useState<ListeningTestResult | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Get result data from our mock API
      const result = getDetailedResultById(resultId);

      if (!result) {
        setError('Result not found');
        setLoading(false);
        return;
      }

      if (result.skill !== 'listening') {
        setError('Invalid result type');
        setLoading(false);
        return;
      }

      setResultData(result as ListeningTestResult);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching result:', err);
      setError('Failed to load result data');
      setLoading(false);
    }
  }, [resultId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !resultData) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="bg-gray-800 border-gray-700 p-6 rounded-lg text-center">
          <h2 className="text-xl text-white mb-4">
            {error || 'Result not found'}
          </h2>
          <Button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Header with test info and score */}
      <TestResultHeader
        title={resultData.testTitle}
        testType="listening"
        score={resultData.score}
        completedAt={resultData.completedAt}
        timeSpent={resultData.timeSpent}
        correctAnswers={resultData.correctAnswers}
        totalQuestions={resultData.totalQuestions}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Score breakdown */}
        <div className="lg:col-span-1">
          <ResultBreakdown sectionScores={resultData.sectionScores} />
        </div>

        {/* AI Feedback */}
        <div className="lg:col-span-2">
          <AIFeedback feedbackAreas={resultData.aiFeedback} />
        </div>
      </div>

      {/* Improvement Strategies */}
      <Card className="bg-gray-800 border-gray-700 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Improvement Strategies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resultData.improvementStrategies.map((strategy, index) => (
              <Card key={index} className="bg-gray-700 border-gray-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">
                    {strategy.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">
                    {strategy.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Question Review */}
      <QuestionReview sections={resultData.questionReview} />
    </div>
  );
}
