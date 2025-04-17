// src/types/test.d.ts

export type TestSkill = "listening" | "reading" | "writing";

export type TestDifficulty = "easy" | "medium" | "hard" | "very_hard";

export interface Test {
  id: string;
  title: string;
  skill: TestSkill;
  difficulty: TestDifficulty;
  duration: number; // in minutes
  description?: string;
  instructions: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // User ID
}

export interface ListeningTest extends Test {
  skill: "listening";
  audioUrl: string;
  audioLength: number; // in seconds
  transcript?: string;
  sections: ListeningSection[];
}

export interface ListeningSection {
  id: string;
  title: string;
  description?: string;
  questions: ListeningQuestion[];
}

export type ListeningQuestionType = 
  | "multiple_choice" 
  | "fill_in_the_blanks" 
  | "matching" 
  | "true_false_not_given"
  | "short_answer";

export interface ListeningQuestion {
  id: string;
  type: ListeningQuestionType;
  text: string;
  options?: string[];
  correctAnswer: string | string[];
  marks: number;
}

export interface ReadingTest extends Test {
  skill: "reading";
  passage: string;
  sections: ReadingSection[];
}

export interface ReadingSection {
  id: string;
  title: string;
  description?: string;
  questions: ReadingQuestion[];
}

export type ReadingQuestionType = 
  | "multiple_choice" 
  | "fill_in_the_blanks" 
  | "matching_headings" 
  | "matching_information"
  | "true_false_not_given"
  | "yes_no_not_given"
  | "summary_completion"
  | "sentence_completion";

export interface ReadingQuestion {
  id: string;
  type: ReadingQuestionType;
  text: string;
  options?: string[];
  correctAnswer: string | string[];
  marks: number;
}

export interface WritingTest extends Test {
  skill: "writing";
  tasks: WritingTask[];
}

export type WritingTaskType = "task1" | "task2";

export interface WritingTask {
  id: string;
  type: WritingTaskType;
  question: string;
  wordCount: number; // Recommended word count
  imageUrl?: string; // For graphs, charts in Task 1
  sampleAnswer?: string;
  markingCriteria: WritingMarkingCriteria;
}

export interface WritingMarkingCriteria {
  taskAchievement: string;
  coherenceCohesion: string;
  lexicalResource: string;
  grammaticalRange: string;
}

export interface UserTestProgress {
  testId: string;
  userId: string;
  startedAt: Date;
  completedAt?: Date;
  lastPosition?: {
    section: number;
    question: number;
  };
  isCompleted: boolean;
}

export interface TestFilters {
  skills?: TestSkill[];
  difficulty?: TestDifficulty[];
  search?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  sortBy?: "newest" | "oldest" | "difficulty" | "popularity";
  page?: number;
  limit?: number;
}