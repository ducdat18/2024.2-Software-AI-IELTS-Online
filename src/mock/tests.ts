// src/mock/tests.ts
import { ListeningTest, ReadingTest, WritingTest, Test } from '@/types/test';

// Base data for all test types
const baseTestData = {
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: "admin-user",
};

// Mock Listening Test
export const mockListeningTest: ListeningTest = {
  ...baseTestData,
  id: "listening-test-1",
  title: "IELTS Listening Practice Test 1",
  skill: "listening",
  difficulty: "medium",
  duration: 40,
  description: "This listening test contains various question types to help you practice for the IELTS exam.",
  instructions: "Listen to the audio recordings and answer the questions that follow. You will hear each recording only once.",
  audioUrl: "/audio/sample-listening.mp3",
  audioLength: 1800, // 30 minutes
  sections: [
    {
      id: "section-1",
      title: "Section 1: Conversation between two people",
      description: "In this section, you will hear a conversation about accommodation arrangements.",
      questions: [
        {
          id: "q1",
          type: "multiple_choice",
          text: "What type of accommodation is the person looking for?",
          options: ["A shared apartment", "A studio flat", "A house", "A dormitory"],
          correctAnswer: "A studio flat",
          marks: 1
        },
        {
          id: "q2",
          type: "fill_in_the_blanks",
          text: "The maximum budget is $_____ per month.",
          correctAnswer: "800",
          marks: 1
        },
        {
          id: "q3",
          type: "true_false_not_given",
          text: "The apartment includes utility bills in the rent.",
          correctAnswer: "true",
          marks: 1
        }
      ]
    },
    {
      id: "section-2",
      title: "Section 2: Monologue",
      description: "In this section, you will hear information about a local community event.",
      questions: [
        {
          id: "q4",
          type: "multiple_choice",
          text: "What is the main purpose of the event?",
          options: ["Fundraising", "Community building", "Education", "Entertainment"],
          correctAnswer: "Community building",
          marks: 1
        },
        {
          id: "q5",
          type: "short_answer",
          text: "When will the event take place?",
          correctAnswer: "June 15th",
          marks: 1
        }
      ]
    }
  ]
};

// Mock Listening Test 2
export const mockListeningTest2: ListeningTest = {
  ...baseTestData,
  id: "listening-test-2",
  title: "IELTS Listening Practice Test 2",
  skill: "listening",
  difficulty: "hard",
  duration: 40,
  description: "Academic lectures and technical discussions with complex vocabulary.",
  instructions: "Listen to the audio recordings and answer the questions that follow. You will hear each recording only once.",
  audioUrl: "/audio/sample-listening-2.mp3",
  audioLength: 1830, // 30.5 minutes
  sections: [
    {
      id: "section-1",
      title: "Section 1: Academic Lecture",
      description: "In this section, you will hear a professor giving a lecture on environmental science.",
      questions: [
        {
          id: "q1",
          type: "multiple_choice",
          text: "What is the main topic of the lecture?",
          options: ["Climate change", "Renewable energy", "Water conservation", "Biodiversity"],
          correctAnswer: "Renewable energy",
          marks: 1
        },
        {
          id: "q2",
          type: "fill_in_the_blanks",
          text: "According to the professor, solar energy capacity has increased by _____ percent in the last decade.",
          correctAnswer: "300",
          marks: 1
        },
      ]
    },
    {
      id: "section-2",
      title: "Section 2: Technical Discussion",
      description: "In this section, you will hear two engineers discussing a project.",
      questions: [
        {
          id: "q3",
          type: "multiple_choice",
          text: "What challenge are the engineers discussing?",
          options: ["Budget constraints", "Time limitations", "Technical difficulties", "Resource allocation"],
          correctAnswer: "Technical difficulties",
          marks: 1
        },
        {
          id: "q4",
          type: "true_false_not_given",
          text: "The project will be completed by the end of the month.",
          correctAnswer: "false",
          marks: 1
        },
      ]
    }
  ]
};

// Mock Reading Test
export const mockReadingTest: ReadingTest = {
  ...baseTestData,
  id: "reading-test-1",
  title: "IELTS Academic Reading Practice Test 1",
  skill: "reading",
  difficulty: "medium",
  duration: 60,
  description: "This reading test contains passages on various topics with different question types.",
  instructions: "Read the passages and answer the questions that follow. You have 60 minutes to complete this test.",
  passage: `
    The History of Tea

    Tea is one of the most widely consumed beverages in the world, second only to water. Its origins can be traced back to ancient China over 5,000 years ago, where legend has it that Emperor Shen Nong discovered tea when leaves from a wild tree blew into his pot of boiling water.

    By the Tang Dynasty (618-907 CE), tea had become firmly established as the national drink of China, and tea cultivation and processing had been refined to an art. The first book about tea, "Cha Jing" (The Classic of Tea), was written by Lu Yu in the 8th century CE.

    Tea was first introduced to Japan in the 6th century by Buddhist monks who had traveled to China to study. However, it wasn't until the early 9th century that tea drinking became a regular practice in Japan, thanks to the efforts of the monk Eichu, who served tea to Emperor Saga.

    The Dutch East India Company introduced tea to Europe in the early 17th century. However, it was in England where tea gained particular prominence. The marriage of Charles II to Catherine of Braganza, a Portuguese princess who was an avid tea drinker, helped to popularize tea in the English court.
  `,
  sections: [
    {
      id: "section-1",
      title: "Passage 1",
      description: "Questions based on the passage about the history of tea.",
      questions: [
        {
          id: "q1",
          type: "multiple_choice",
          text: "According to the passage, how was tea discovered?",
          options: [
            "Through agricultural experimentation",
            "When leaves accidentally fell into boiling water",
            "As a medicinal compound",
            "Through trade with other countries"
          ],
          correctAnswer: "When leaves accidentally fell into boiling water",
          marks: 1
        },
        {
          id: "q2",
          type: "true_false_not_given",
          text: "The first book about tea was written during the Tang Dynasty.",
          correctAnswer: "true",
          marks: 1
        },
        {
          id: "q3",
          type: "fill_in_the_blanks",
          text: "Tea was introduced to Japan by ______.",
          correctAnswer: "Buddhist monks",
          marks: 1
        }
      ]
    },
    {
      id: "section-2",
      title: "Passage 2",
      description: "Additional questions about the spread of tea.",
      questions: [
        {
          id: "q4",
          type: "matching_headings",
          text: "Match the following countries with when tea was introduced:",
          options: [
            "A. 6th century",
            "B. 9th century",
            "C. 17th century",
            "D. 18th century"
          ],
          correctAnswer: ["Japan - A", "Europe - C"],
          marks: 2
        }
      ]
    }
  ]
};

// Mock Reading Test 2
export const mockReadingTest2: ReadingTest = {
  ...baseTestData,
  id: "reading-test-2",
  title: "IELTS Academic Reading Practice Test 2",
  skill: "reading",
  difficulty: "very_hard",
  duration: 60,
  description: "Environmental and social sciences passages with advanced vocabulary.",
  instructions: "Read the passages and answer the questions that follow. You have 60 minutes to complete this test.",
  passage: `
    Climate Change and Its Social Implications

    The phenomenon of climate change represents one of the most pressing challenges facing human civilization in the 21st century. Scientific consensus has established beyond reasonable doubt that anthropogenic greenhouse gas emissions are the primary driver of observed warming trends and associated environmental disruptions.

    While the physical science basis of climate change is well-documented, the social implications of this global phenomenon remain complex and multifaceted. Vulnerable populations, particularly those in developing nations, coastal regions, and impoverished communities, face disproportionate impacts despite having contributed least to the problem.

    The concept of climate justice has emerged as a framework for addressing these inequities, emphasizing the ethical dimensions of climate policy and the need for equitable burden-sharing in mitigation and adaptation efforts. This perspective challenges traditional approaches to environmental governance by highlighting historical responsibilities and differential capabilities.
  `,
  sections: [
    {
      id: "section-1",
      title: "Climate Change",
      description: "Questions about climate change science and impacts.",
      questions: [
        {
          id: "q1",
          type: "multiple_choice",
          text: "According to the passage, what is the primary driver of climate change?",
          options: [
            "Natural climate cycles",
            "Solar radiation fluctuations",
            "Anthropogenic greenhouse gas emissions",
            "Volcanic activity"
          ],
          correctAnswer: "Anthropogenic greenhouse gas emissions",
          marks: 1
        },
        {
          id: "q2",
          type: "true_false_not_given",
          text: "Developing nations have contributed most to climate change.",
          correctAnswer: "false",
          marks: 1
        }
      ]
    }
  ]
};

// Mock Writing Test
export const mockWritingTest: WritingTest = {
  ...baseTestData,
  id: "writing-test-1",
  title: "IELTS Academic Writing Practice Test 1",
  skill: "writing",
  difficulty: "hard",
  duration: 60,
  description: "This writing test contains two tasks: a graph description and an essay.",
  instructions: "Complete both tasks. You should spend about 20 minutes on Task 1 and 40 minutes on Task 2.",
  tasks: [
    {
      id: "task-1",
      type: "task1",
      question: "The graph below shows the average monthly temperatures in Tokyo and London. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
      wordCount: 150,
      imageUrl: "/images/temperature-graph.png",
      markingCriteria: {
        taskAchievement: "You should accurately report the main features of the graph, making appropriate comparisons.",
        coherenceCohesion: "Your response should be well-organized with clear progression and appropriate paragraphing.",
        lexicalResource: "You should use a range of vocabulary related to temperature trends and comparison.",
        grammaticalRange: "You should use a variety of sentence structures accurately."
      }
    },
    {
      id: "task-2",
      type: "task2",
      question: "Some people believe that technology has made our lives too complex. To what extent do you agree or disagree with this view?",
      wordCount: 250,
      markingCriteria: {
        taskAchievement: "You should address all parts of the question and present a clear position throughout.",
        coherenceCohesion: "Your essay should be well-organized with clear progression and good use of cohesive devices.",
        lexicalResource: "You should use a wide range of vocabulary with flexibility and precision.",
        grammaticalRange: "You should use a variety of complex structures with good control of grammar and punctuation."
      }
    }
  ]
};

// Mock Writing Test 2
export const mockWritingTest2: WritingTest = {
  ...baseTestData,
  id: "writing-test-2",
  title: "IELTS General Training Writing Practice Test",
  skill: "writing",
  difficulty: "medium",
  duration: 60,
  description: "Formal letter and opinion essay for General Training candidates.",
  instructions: "Complete both tasks. You should spend about 20 minutes on Task 1 and 40 minutes on Task 2.",
  tasks: [
    {
      id: "task-1",
      type: "task1",
      question: "You are unhappy with a recent purchase from an online store. Write a letter to the customer service department explaining what you purchased, what the problem is, and what action you would like them to take.",
      wordCount: 150,
      markingCriteria: {
        taskAchievement: "You should cover all three bullet points and maintain an appropriate tone for a formal letter.",
        coherenceCohesion: "Your letter should be well-organized with appropriate paragraphing and logical sequencing.",
        lexicalResource: "You should demonstrate a range of vocabulary appropriate for a formal complaint letter.",
        grammaticalRange: "You should use a mix of simple and complex sentence structures accurately."
      }
    },
    {
      id: "task-2",
      type: "task2",
      question: "Some people think that children should begin their formal education at a very early age, while others believe they should start school at around seven years old. Discuss both views and give your own opinion.",
      wordCount: 250,
      markingCriteria: {
        taskAchievement: "You should address both views and clearly present your own opinion.",
        coherenceCohesion: "Your essay should have a clear overall progression with effective use of cohesive devices.",
        lexicalResource: "You should use a wide range of vocabulary appropriately and accurately.",
        grammaticalRange: "You should demonstrate a wide range of grammatical structures with good control of punctuation and spelling."
      }
    }
  ]
};

// Combined test array for easy access - IMPORTANT: Add all tests with complete data here
export const mockTests: Test[] = [
  mockListeningTest,
  mockListeningTest2,
  mockReadingTest,
  mockReadingTest2,
  mockWritingTest,
  mockWritingTest2
];

// Simple navigation between tests
export const getNextTest = (currentTestId: string): Test | undefined => {
  const currentIndex = mockTests.findIndex(test => test.id === currentTestId);
  return currentIndex < mockTests.length - 1 ? mockTests[currentIndex + 1] : undefined;
};

export const getPreviousTest = (currentTestId: string): Test | undefined => {
  const currentIndex = mockTests.findIndex(test => test.id === currentTestId);
  return currentIndex > 0 ? mockTests[currentIndex - 1] : undefined;
};

// FIX: Use the same array (mockTests) for both lists and lookups 
// to avoid inconsistencies
export const mockTestList = mockTests;

// Helper functions for filtering tests by skill, difficulty, etc.
export const getTestsBySkill = (skill: string): Test[] => {
  return mockTests.filter(test => test.skill === skill);
};

export const getTestsByDifficulty = (difficulty: string): Test[] => {
  return mockTests.filter(test => test.difficulty === difficulty);
};

export const getTestById = (id: string): Test | undefined => {
  console.log("Searching for test with ID:", id);
  const test = mockTests.find(test => test.id === id);
  console.log("Found test:", test);
  return test;
};

// Debug helper function
export const debugTestIds = () => {
  console.log("Available test IDs:");
  mockTests.forEach(test => console.log(`- ${test.id} (${test.skill})`));
  return mockTests.map(test => test.id);
};