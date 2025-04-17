// src/mock/user-progress.ts
import { UserProgress } from '@/types/result';
import { User } from '@/types/auth';

// Mock Users
export const mockCurrentUser: User = {
  id: "user-123",
  email: "user@example.com",
  name: "Nguyễn Văn A",
  role: "candidate",
  createdAt: new Date("2023-09-01"),
  updatedAt: new Date("2023-09-01")
};

// Mock User Progress
export const mockUserProgress: UserProgress = {
  userId: mockCurrentUser.id,
  listening: {
    testsTaken: 8,
    averageScore: 6.5,
    trend: [5.5, 6.0, 6.0, 6.5, 6.5, 7.0, 6.5, 6.5],
    improvementAreas: [
      "Identifying specific details",
      "Understanding accents",
      "Following fast speech"
    ]
  },
  reading: {
    testsTaken: 6,
    averageScore: 7.0,
    trend: [6.0, 6.5, 7.0, 7.0, 7.5, 7.0],
    improvementAreas: [
      "Understanding academic vocabulary",
      "Matching headings to paragraphs",
      "Completing summaries"
    ]
  },
  writing: {
    testsTaken: 5,
    averageScore: 6.0,
    trend: [5.5, 5.5, 6.0, 6.0, 6.5],
    improvementAreas: [
      "Task achievement in Task 1",
      "Developing ideas fully in Task 2",
      "Using a wider range of vocabulary"
    ]
  },
  overallProgress: {
    averageScore: 6.5,
    trend: [5.5, 6.0, 6.5, 6.5, 7.0],
    studyHours: 78,
    targetScore: 7.0,
    predictedScore: 6.8,
    recommendedTests: ["listening-test-2", "writing-test-1"]
  }
};

// Mock Results History (simplified for UI development)
export const mockResultsHistory = [
  {
    id: "result-1",
    testId: "listening-test-1",
    testTitle: "IELTS Listening Practice Test 1",
    skill: "listening",
    score: 6.5,
    date: new Date("2023-12-05"),
    isReviewed: true
  },
  {
    id: "result-2",
    testId: "reading-test-1",
    testTitle: "IELTS Academic Reading Practice Test 1",
    skill: "reading",
    score: 7.0,
    date: new Date("2023-11-28"),
    isReviewed: true
  },
  {
    id: "result-3",
    testId: "writing-test-1",
    testTitle: "IELTS Academic Writing Practice Test 1",
    skill: "writing",
    score: 6.5,
    date: new Date("2023-11-20"),
    isReviewed: true
  },
  {
    id: "result-4",
    testId: "listening-test-2",
    testTitle: "IELTS Listening Practice Test 2",
    skill: "listening",
    score: 7.0,
    date: new Date("2023-11-15"),
    isReviewed: true
  },
  {
    id: "result-5",
    testId: "reading-test-2",
    testTitle: "IELTS Academic Reading Practice Test 2",
    skill: "reading",
    score: 7.5,
    date: new Date("2023-11-07"),
    isReviewed: true
  }
];

// Mock Last Test Result (for dashboard display)
export const mockLastTestResult = {
  id: "result-1",
  testId: "listening-test-1",
  testTitle: "IELTS Listening Practice Test 1",
  skill: "listening",
  score: 6.5,
  date: new Date("2023-12-05"),
  breakdown: {
    section1: 7.0,
    section2: 6.0,
    section3: 7.0,
    section4: 6.0
  },
  correctAnswers: 27,
  totalQuestions: 40,
  timeSpent: "38 minutes",
  aiSuggestions: [
    "Practice listening to academic lectures",
    "Work on note-taking skills",
    "Focus on recognizing signposting language"
  ]
};

// Mock AI Feedback for writing
export const mockWritingAIFeedback = {
  taskAchievement: {
    score: 6,
    feedback: "You have addressed the task but some key points could be developed further. The graph has been described generally well but some important trends were not mentioned.",
    suggestions: [
      "Make sure to cover all the main features in Task 1",
      "Compare the data more explicitly",
      "Be more precise in your descriptions of trends"
    ]
  },
  coherenceCohesion: {
    score: 6,
    feedback: "Your response is generally coherent with some use of cohesive devices. Paragraphing is present but could be more logical in some places.",
    suggestions: [
      "Use a wider range of linking words",
      "Ensure each paragraph has a clear central topic",
      "Use more referencing terms (this, these, etc.)"
    ]
  },
  lexicalResource: {
    score: 6.5,
    feedback: "You use an adequate range of vocabulary with some flexibility. There are occasional errors in word choice but these don't impede communication.",
    suggestions: [
      "Incorporate more academic vocabulary",
      "Use more precise words to describe trends",
      "Try to avoid repetition of key terms"
    ]
  },
  grammaticalRange: {
    score: 6,
    feedback: "You use a mix of simple and complex structures but with some errors. Control of grammar is generally good but inconsistent in places.",
    suggestions: [
      "Review your use of articles (a, an, the)",
      "Pay attention to subject-verb agreement",
      "Try to use a wider variety of complex sentences"
    ]
  },
  sampleImprovement: `The line graph illustrates how average monthly temperatures fluctuate throughout the year in both Tokyo and London.

It is immediately apparent that Tokyo experiences more extreme temperature variations compared to London, which has a more moderate climate. During winter (December to February), both cities record their lowest temperatures, with Tokyo averaging approximately 5-7°C and London slightly warmer at around 8°C.

As spring progresses, both cities gradually warm up, though Tokyo's temperature rises more steeply. By summer (June to August), Tokyo becomes significantly hotter, reaching a peak of around 25-27°C in August, while London's summer temperatures plateau at approximately 18°C.

Tokyo's temperature then decreases more dramatically than London's during autumn months, eventually converging closer to London's temperatures by December.

Overall, while both cities follow similar seasonal patterns, Tokyo experiences a much wider temperature range (approximately 20°C difference between summer and winter) compared to London's more modest variation (about 10°C difference).`
};

// Recommended practice tests
export const mockRecommendedTests = [
  {
    id: "rec-test-1",
    title: "Listening: Understanding Academic Lectures",
    skill: "listening",
    difficulty: "medium",
    estimatedTime: "30 minutes",
    relevance: "Addresses your weakness in academic contexts"
  },
  {
    id: "rec-test-2",
    title: "Writing: Task 1 - Graph Description Practice",
    skill: "writing",
    difficulty: "medium",
    estimatedTime: "25 minutes",
    relevance: "Helps improve Task 1 performance"
  },
  {
    id: "rec-test-3",
    title: "Reading: Matching Headings Exercise",
    skill: "reading",
    difficulty: "hard",
    estimatedTime: "15 minutes",
    relevance: "Targets your specific difficulty with heading matches"
  }
];