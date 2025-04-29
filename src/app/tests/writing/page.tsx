// app/tests/writing/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { getTestsBySkill } from '@/mock/tests';
import EmptyState from '@/components/tests/EmptyState';
import TestCard from '@/components/tests/TestCard';
import TestFilters from '@/components/tests/TestFilter';

export default function WritingTestsPage() {
  const [tests, setTests] = useState(getTestsBySkill('writing'));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Filter tests based on search term and difficulty
  useEffect(() => {
    let filteredTests = getTestsBySkill('writing');

    if (searchTerm) {
      filteredTests = filteredTests.filter(
        (test) =>
          test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (test.description &&
            test.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedDifficulty !== 'all') {
      filteredTests = filteredTests.filter(
        (test) => test.difficulty === selectedDifficulty
      );
    }

    setTests(filteredTests);
  }, [searchTerm, selectedDifficulty]);

  // Handle resetting filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedDifficulty('all');
  };

  return (
    <div className="container mx-auto py-2">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          IELTS Writing Tests
        </h1>
        <p className="text-gray-400 max-w-3xl">
          Practice your writing skills with IELTS writing tests. Each test
          includes Task 1 and Task 2, with detailed instructions and marking
          criteria to help you prepare for the actual exam.
        </p>
      </div>

      {/* Filters */}
      <TestFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
      />

      {/* Test Cards or Empty State */}
      {tests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No tests found"
          description="No tests match your search criteria."
          buttonText="Clear filters"
          onButtonClick={handleClearFilters}
        />
      )}
    </div>
  );
}
