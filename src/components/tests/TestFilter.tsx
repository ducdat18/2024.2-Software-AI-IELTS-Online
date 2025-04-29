// components/ui/test-filters.tsx
'use client';

import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TestFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (value: string) => void;
  translatedLabels?: {
    all?: string;
    easy?: string;
    medium?: string;
    hard?: string;
    searchPlaceholder?: string;
  };
}

export default function TestFilters({
  searchTerm,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  translatedLabels = {},
}: TestFiltersProps) {
  // Use provided translations or default to English
  const labels = {
    all: translatedLabels.all || 'All',
    easy: translatedLabels.easy || 'Easy',
    medium: translatedLabels.medium || 'Medium',
    hard: translatedLabels.hard || 'Hard',
    searchPlaceholder:
      translatedLabels.searchPlaceholder || 'Search for tests...',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="md:col-span-3">
        <Input
          placeholder={labels.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>
      <div>
        <Tabs
          defaultValue={selectedDifficulty}
          onValueChange={onDifficultyChange}
        >
          <TabsList className="grid grid-cols-4 w-full bg-gray-800">
            <TabsTrigger
              value="all"
              className="text-gray-400 data-[state=active]:text-black"
            >
              {labels.all}
            </TabsTrigger>
            <TabsTrigger
              value="easy"
              className="text-gray-400 data-[state=active]:text-black"
            >
              {labels.easy}
            </TabsTrigger>
            <TabsTrigger
              value="medium"
              className="text-gray-400 data-[state=active]:text-black"
            >
              {labels.medium}
            </TabsTrigger>
            <TabsTrigger
              value="hard"
              className="text-gray-400 data-[state=active]:text-black"
            >
              {labels.hard}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
