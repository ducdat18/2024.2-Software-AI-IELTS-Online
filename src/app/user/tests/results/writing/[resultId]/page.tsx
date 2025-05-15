// app/results/writing/[resultId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import WritingFeedback from '@/components/results/WritingFeedback';
import AIFeedback from '@/components/results/AIFeedback';
import { getDetailedResultById } from '@/mock/test-results';
import { WritingTestResult } from '@/mock/test-results';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import TestResultHeader from '@/components/results/TestResultHeader';

export default function WritingTestResultPage() {
  const params = useParams();
  const resultId = params.resultId as string;
  const router = useRouter();

  const [resultData, setResultData] = useState<WritingTestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('feedback');

  useEffect(() => {
    try {
      // Get result data from our mock API
      const result = getDetailedResultById(resultId);

      if (!result) {
        setError('Result not found');
        setLoading(false);
        return;
      }

      if (result.skill !== 'writing') {
        setError('Invalid result type');
        setLoading(false);
        return;
      }

      setResultData(result as WritingTestResult);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching result:', err);
      setError('Failed to load result data');
      setLoading(false);
    }
  }, [resultId]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

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
        testType="writing"
        score={resultData.score}
        completedAt={resultData.completedAt}
        timeSpent={resultData.timeSpent}
      />

      {/* Tab navigation */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
        <TabsList className="bg-gray-700 w-full max-w-md mx-auto grid grid-cols-2">
          <TabsTrigger
            value="feedback"
            className="text-gray-400 data-[state=active]:text-black"
          >
            Detailed Feedback
          </TabsTrigger>
          <TabsTrigger
            value="improvement"
            className="text-gray-400 data-[state=active]:text-black"
          >
            Improvement Plan
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {activeTab === 'feedback' ? (
        /* Writing Tasks Feedback */
        <WritingFeedback
          tasks={resultData.writingTasks}
          sampleAnswer={resultData.sampleImprovement}
        />
      ) : (
        /* Improvement Plan */
        <div className="space-y-6">
          <AIFeedback
            feedbackAreas={resultData.aiFeedback}
            improvementPoints={resultData.improvementPoints}
            sampleImprovement={resultData.sampleImprovement}
            showSample={true}
          />

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">
                Practice Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gray-700 border-gray-600">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-lg">
                      Task 1 Exercises
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>
                        Practice describing different types of graphs (line
                        graphs, bar charts, pie charts)
                      </li>
                      <li>
                        Learn vocabulary for describing trends and making
                        comparisons
                      </li>
                      <li>Do timed practice of 20 minutes per task</li>
                      <li>Review sample answers from high-scoring responses</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-gray-700 border-gray-600">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-lg">
                      Task 2 Exercises
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>
                        Practice planning essays with clear, logical paragraphs
                      </li>
                      <li>
                        Build a collection of topic-specific vocabulary for
                        common essay themes
                      </li>
                      <li>
                        Work on developing a wide range of complex sentence
                        structures
                      </li>
                      <li>
                        Practice writing strong introductions and conclusions
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
