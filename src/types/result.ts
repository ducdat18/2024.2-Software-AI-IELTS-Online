// src/types/result.d.ts

import { TestSkill } from './test';

export interface TestResult {
  id: string;
  userId: string;
  testId: string;
  skill: TestSkill;
  score: number; // Overall IELTS band score (0-9)
  submittedAt: Date;
  reviewedAt?: Date;
  timeSpent: number; // in seconds
  isAIReviewed: boolean;
}

export interface ListeningResult extends TestResult {
  skill: "listening";
  answers: ListeningAnswer[];
  detailedScores: {
    sectionScores: { sectionId: string; score: number }[];
    correctAnswers: number;
    totalQuestions: number;
  };
  aiAnalysis?: AIListeningAnalysis;
}

export interface ListeningAnswer {
  questionId: string;
  userAnswer: string | string[];
  isCorrect: boolean;
}

export interface AIListeningAnalysis {
  strengthAreas: string[];
  weaknessAreas: string[];
  improvementSuggestions: string[];
  questionTypePerformance: {
    type: string;
    correctPercentage: number;
    suggestedPractice?: string;
  }[];
}

export interface ReadingResult extends TestResult {
  skill: "reading";
  answers: ReadingAnswer[];
  detailedScores: {
    sectionScores: { sectionId: string; score: number }[];
    correctAnswers: number;
    totalQuestions: number;
  };
  aiAnalysis?: AIReadingAnalysis;
}

export interface ReadingAnswer {
  questionId: string;
  userAnswer: string | string[];
  isCorrect: boolean;
}

export interface AIReadingAnalysis {
  strengthAreas: string[];
  weaknessAreas: string[];
  improvementSuggestions: string[];
  questionTypePerformance: {
    type: string;
    correctPercentage: number;
    suggestedPractice?: string;
  }[];
  readingSpeed?: {
    wordsPerMinute: number;
    comparedToAverage: "slower" | "average" | "faster";
    suggestion?: string;
  };
}

export interface WritingResult extends TestResult {
  skill: "writing";
  responses: WritingResponse[];
  detailedScores: WritingDetailedScores;
  aiAnalysis: AIWritingAnalysis;
}

export interface WritingResponse {
  taskId: string;
  taskType: "task1" | "task2";
  content: string;
  wordCount: number;
}

export interface WritingDetailedScores {
  taskAchievement: number; // 0-9 band score with 0.5 increments
  coherenceCohesion: number;
  lexicalResource: number;
  grammaticalRange: number;
}

export interface AIWritingAnalysis {
  strengthAreas: string[];
  weaknessAreas: string[];
  improvementSuggestions: string[];
  taskAchievementAnalysis: {
    score: number;
    feedback: string;
    improvement: string;
  };
  coherenceCohesionAnalysis: {
    score: number;
    feedback: string;
    improvement: string;
  };
  lexicalResourceAnalysis: {
    score: number;
    feedback: string;
    improvement: string;
    suggestedVocabulary?: string[];
  };
  grammaticalRangeAnalysis: {
    score: number;
    feedback: string;
    improvement: string;
    commonErrors?: string[];
  };
  enhancedAnswer?: string;
}

export interface UserProgress {
  userId: string;
  listening: {
    testsTaken: number;
    averageScore: number;
    trend: number[]; // Last 5 scores
    improvementAreas: string[];
  };
  reading: {
    testsTaken: number;
    averageScore: number;
    trend: number[]; // Last 5 scores
    improvementAreas: string[];
  };
  writing: {
    testsTaken: number;
    averageScore: number;
    trend: number[]; // Last 5 scores
    improvementAreas: string[];
  };
  overallProgress: {
    averageScore: number;
    trend: number[]; // Last 5 overall scores
    studyHours: number;
    targetScore?: number;
    predictedScore?: number;
    recommendedTests: string[]; // Test IDs
  };
}

export interface ResultsFilters {
  userId?: string;
  skill?: TestSkill[];
  scoreRange?: {
    min: number;
    max: number;
  };
  dateRange?: {
    start: Date;
    end: Date;
  };
  sortBy?: "newest" | "oldest" | "score_high_to_low" | "score_low_to_high";
  page?: number;
  limit?: number;
}