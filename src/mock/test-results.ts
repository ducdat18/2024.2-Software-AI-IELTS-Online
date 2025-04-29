// src/mock/test-results.ts
import { getTestById } from '@/mock/tests';

// Types for test results
export interface SectionScore {
  section: string;
  score: number;
  total: number;
  percentage: number;
}

export interface FeedbackItem {
  title: string;
  description: string;
  suggestions: string[];
  score?: number;
}

export interface QuestionResult {
  id: string;
  text: string;
  type: string;
  userAnswer: string | string[];
  correctAnswer: string | string[];
  options?: string[];
  explanation?: string;
  isCorrect: boolean;
}

export interface SectionQuestions {
  title: string;
  questions: QuestionResult[];
}

export interface ImprovementStrategy {
  title: string;
  description: string;
}

export interface WritingCriteria {
  name: string;
  score: number;
  feedback: string;
  suggestions: string[];
}

export interface WritingTask {
  id: string;
  type: 'task1' | 'task2';
  question: string;
  wordCount: number;
  userAnswer: string;
  criteria: WritingCriteria[];
  score: number;
}

export interface TestResultBase {
  id: string;
  testId: string;
  testTitle: string;
  skill: 'reading' | 'listening' | 'writing';
  score: number;
  completedAt: Date;
  timeSpent: string;
}

export interface ReadingTestResult extends TestResultBase {
  skill: 'reading';
  correctAnswers: number;
  totalQuestions: number;
  sectionScores: SectionScore[];
  questionReview: SectionQuestions[];
  aiFeedback: FeedbackItem[];
}

export interface ListeningTestResult extends TestResultBase {
  skill: 'listening';
  correctAnswers: number;
  totalQuestions: number;
  sectionScores: SectionScore[];
  questionReview: SectionQuestions[];
  aiFeedback: FeedbackItem[];
  improvementStrategies: ImprovementStrategy[];
}

export interface WritingTestResult extends TestResultBase {
  skill: 'writing';
  writingTasks: WritingTask[];
  aiFeedback: FeedbackItem[];
  improvementPoints: string[];
  sampleImprovement: string;
}

// Mock Reading Test Results
export const mockReadingResults: ReadingTestResult[] = [
  {
    id: 'reading-result-1',
    testId: 'reading-test-1',
    testTitle: 'IELTS Academic Reading Practice Test 1',
    skill: 'reading',
    score: 7.5,
    completedAt: new Date('2023-12-05'),
    timeSpent: '54 minutes',
    correctAnswers: 28,
    totalQuestions: 40,
    sectionScores: [
      { section: 'Passage 1', score: 11, total: 14, percentage: (11/14)*100 },
      { section: 'Passage 2', score: 9, total: 13, percentage: (9/13)*100 },
      { section: 'Passage 3', score: 8, total: 13, percentage: (8/13)*100 },
    ],
    questionReview: generateReadingQuestionReview(),
    aiFeedback: [
      {
        title: 'Reading Comprehension',
        description: 'You demonstrated good understanding of explicit information but struggled with implicit meanings and inferences.',
        suggestions: [
          'Practice identifying unstated implications in academic texts',
          'Focus on understanding the author\'s perspective and tone',
          'Work on recognizing paraphrased information'
        ]
      },
      {
        title: 'Vocabulary Skills',
        description: 'Your vocabulary range is adequate for understanding most of the text, but some academic terms caused difficulty.',
        suggestions: [
          'Expand your academic vocabulary, particularly in science and technology',
          'Create a word bank of synonyms for common academic terms',
          'Practice word-formation exercises to recognize different forms of words'
        ]
      },
      {
        title: 'Time Management',
        description: 'You spent too much time on the first passage, which limited your time for the third passage.',
        suggestions: [
          'Allocate specific time limits for each passage (about 20 minutes each)',
          'Practice skimming techniques to quickly identify key information',
          'For difficult questions, make an educated guess and move on rather than spending too much time'
        ]
      }
    ]
  },
  {
    id: 'reading-result-2',
    testId: 'reading-test-2',
    testTitle: 'IELTS Academic Reading Practice Test 2',
    skill: 'reading',
    score: 6.5,
    completedAt: new Date('2023-11-15'),
    timeSpent: '58 minutes',
    correctAnswers: 24,
    totalQuestions: 40,
    sectionScores: [
      { section: 'Passage 1', score: 10, total: 14, percentage: (10/14)*100 },
      { section: 'Passage 2', score: 8, total: 13, percentage: (8/13)*100 },
      { section: 'Passage 3', score: 6, total: 13, percentage: (6/13)*100 },
    ],
    questionReview: generateReadingQuestionReview(),
    aiFeedback: [
      {
        title: 'Detail Recognition',
        description: 'You performed well on general understanding questions but missed several specific details.',
        suggestions: [
          'Practice identifying key details within complex sentences',
          'Pay more attention to qualifying language (e.g., "sometimes", "often", "rarely")',
          'Work on questions requiring precise factual information'
        ]
      },
      {
        title: 'Skimming and Scanning',
        description: 'Your performance suggests you may benefit from improved skimming and scanning techniques.',
        suggestions: [
          'Practice quickly identifying paragraph topics by reading first and last sentences',
          'Learn to recognize keywords and their synonyms/paraphrases in the text',
          'Develop a systematic approach to locating information in the text'
        ]
      },
      {
        title: 'Higher-order Skills',
        description: 'Questions requiring inference or understanding the author\'s purpose were challenging for you.',
        suggestions: [
          'Practice identifying the author\'s tone and attitude',
          'Work on questions that ask about the purpose of paragraphs or sections',
          'Develop skills in recognizing the logical structure of arguments'
        ]
      }
    ]
  }
];

// Mock Listening Test Results
export const mockListeningResults: ListeningTestResult[] = [
  {
    id: 'listening-result-1',
    testId: 'listening-test-1',
    testTitle: 'IELTS Listening Practice Test 1',
    skill: 'listening',
    score: 7.0,
    completedAt: new Date('2023-12-01'),
    timeSpent: '37 minutes',
    correctAnswers: 29,
    totalQuestions: 40,
    sectionScores: [
      { section: 'Section 1', score: 9, total: 10, percentage: 90 },
      { section: 'Section 2', score: 8, total: 10, percentage: 80 },
      { section: 'Section 3', score: 7, total: 10, percentage: 70 },
      { section: 'Section 4', score: 5, total: 10, percentage: 50 },
    ],
    questionReview: generateListeningQuestionReview(),
    aiFeedback: [
      {
        title: 'Listening Comprehension',
        description: 'You performed well on descriptive sections but struggled with academic lectures.',
        suggestions: [
          'Practice listening to longer academic lectures or podcasts',
          'Focus on understanding the main points and supporting details',
          'Work on note-taking while listening to lengthy explanations'
        ]
      },
      {
        title: 'Accent Recognition',
        description: 'You had some difficulty with certain accents, particularly in Section 4.',
        suggestions: [
          'Listen to a variety of English accents through documentaries or interviews',
          'Focus on speakers from different regions (UK, US, Australia, etc.)',
          'Practice with listening materials that feature different accents'
        ]
      },
      {
        title: 'Number Recognition',
        description: 'You missed several answers involving numbers, dates, and measurements.',
        suggestions: [
          'Practice specific exercises focused on numbers and measurements',
          'Pay attention to units of measurement (km, kg, etc.)',
          'Listen for clues like "approximately," "just over," etc.'
        ]
      }
    ],
    improvementStrategies: [
      {
        title: 'Prediction',
        description: 'Before the audio begins, read the questions and predict the type of information needed (a name, a number, etc.). This prepares your mind to listen for specific details.'
      },
      {
        title: 'Keywords',
        description: 'Identify keywords in questions and listen for synonyms or paraphrases of these words in the audio.'
      },
      {
        title: 'Note-taking',
        description: 'Practice efficient note-taking techniques. Focus on recording key information rather than trying to write everything.'
      },
      {
        title: 'Spelling',
        description: 'Pay attention to spelling, especially for names, places, and technical terms. Listen for spelling clarifications in the audio.'
      }
    ]
  },
  {
    id: 'listening-result-2',
    testId: 'listening-test-2',
    testTitle: 'IELTS Listening Practice Test 2',
    skill: 'listening',
    score: 6.0,
    completedAt: new Date('2023-11-10'),
    timeSpent: '40 minutes',
    correctAnswers: 23,
    totalQuestions: 40,
    sectionScores: [
      { section: 'Section 1', score: 8, total: 10, percentage: 80 },
      { section: 'Section 2', score: 7, total: 10, percentage: 70 },
      { section: 'Section 3', score: 5, total: 10, percentage: 50 },
      { section: 'Section 4', score: 3, total: 10, percentage: 30 },
    ],
    questionReview: generateListeningQuestionReview(),
    aiFeedback: [
      {
        title: 'Academic Context',
        description: 'You had significant difficulty with academic contexts in Sections 3 and 4.',
        suggestions: [
          'Regularly listen to academic lectures and discussions on platforms like YouTube or podcasts',
          'Practice with materials that contain academic vocabulary and concepts',
          'Work on understanding the relationships between ideas in academic discussions'
        ]
      },
      {
        title: 'Spelling and Grammar',
        description: 'Several of your answers had spelling errors that made them incorrect.',
        suggestions: [
          'Pay attention to common spelling patterns in English',
          'Review basic grammar rules for singular/plural and verb forms',
          'Practice transcribing spoken words accurately'
        ]
      },
      {
        title: 'Distraction Management',
        description: 'You seemed to be misled by distractors in the audio.',
        suggestions: [
          'Practice identifying when speakers correct themselves or change direction',
          'Listen for qualifying phrases like "however," "on the other hand," etc.',
          'Pay attention to the final answer, not just the first information mentioned'
        ]
      }
    ],
    improvementStrategies: [
      {
        title: 'Focused Practice',
        description: 'Dedicate extra practice time to the more challenging academic sections (3 and 4).'
      },
      {
        title: 'Active Listening',
        description: 'Engage actively with the material by predicting answers and confirming or adjusting as you listen.'
      },
      {
        title: 'Vocabulary Building',
        description: 'Build your academic vocabulary to better understand lectures and discussions.'
      },
      {
        title: 'Transfer Skills',
        description: 'Write exactly what you hear - practice transferring the correct information to your answer sheet.'
      }
    ]
  }
];

// Mock Writing Test Results
export const mockWritingResults: WritingTestResult[] = [
  {
    id: 'writing-result-1',
    testId: 'writing-test-1',
    testTitle: 'IELTS Academic Writing Practice Test 1',
    skill: 'writing',
    score: 6.5,
    completedAt: new Date('2023-11-20'),
    timeSpent: '58 minutes',
    writingTasks: [
      {
        id: 'task1',
        type: 'task1',
        question: 'The graph below shows the average monthly temperatures in Tokyo and London. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
        wordCount: 178,
        userAnswer: `The line graph compares the average monthly temperatures in Tokyo and London throughout a year.

Overall, Tokyo has more extreme temperature variations than London, which maintains a more moderate climate throughout the year.

In January, both cities experience their lowest temperatures, with Tokyo at about 5°C and London slightly warmer at around 8°C. As spring approaches, temperatures in both cities gradually rise, but Tokyo warms up more rapidly than London.

By July and August, Tokyo reaches its highest temperatures of approximately 25°C, while London peaks at only about 18°C during the same period. This shows a significant difference of 7°C between the two cities in summer.

After August, temperatures in both cities begin to decline, with Tokyo cooling more dramatically than London through autumn. By December, Tokyo's temperature falls back to around 6°C, while London returns to about 8°C.

In conclusion, while both cities follow similar seasonal patterns, Tokyo experiences a much wider temperature range (approximately 20°C difference between summer and winter) compared to London's more modest variation (about 10°C difference).`,
        criteria: [
          {
            name: 'Task Achievement',
            score: 7,
            feedback: 'You have covered the key trends in the graph and made appropriate comparisons between the two cities. The summary includes the main temperature patterns throughout the year.',
            suggestions: [
              'Include more precise figures for some months to strengthen your analysis',
              'Highlight the rate of change more explicitly in the transitional seasons'
            ]
          },
          {
            name: 'Coherence & Cohesion',
            score: 7,
            feedback: 'Your response has a clear organizational structure with appropriate paragraphing. You use cohesive devices effectively to connect ideas.',
            suggestions: [
              'Use a wider range of linking expressions',
              'Consider organizing information by seasons rather than chronologically for more coherent comparisons'
            ]
          },
          {
            name: 'Lexical Resource',
            score: 6,
            feedback: 'You use an adequate range of vocabulary with some flexibility. There is good use of topic-specific terms related to climate and temperature.',
            suggestions: [
              'Incorporate more precise vocabulary for describing trends (e.g., "fluctuates," "plateaus")',
              'Use more synonyms to avoid repetition of words like "temperatures" and "rises"'
            ]
          },
          {
            name: 'Grammatical Range & Accuracy',
            score: 6,
            feedback: 'You use a mix of simple and complex sentence structures with reasonable accuracy. There are some minor errors but they don\'t impede communication.',
            suggestions: [
              'Use a wider variety of complex structures',
              'Pay attention to article usage in some sentences'
            ]
          }
        ],
        score: 6.5
      },
      {
        id: 'task2',
        type: 'task2',
        question: 'Some people believe that technology has made our lives too complex. To what extent do you agree or disagree with this view?',
        wordCount: 278,
        userAnswer: `In today's rapidly evolving world, technology has become an integral part of our daily lives. Some individuals argue that technological advancements have unnecessarily complicated our existence. This essay will discuss the extent to which I agree with this perspective.

On one hand, technology has undoubtedly added layers of complexity to modern life. The constant stream of notifications from multiple devices demands our attention throughout the day, potentially leading to information overload and decreased focus. Furthermore, many people feel pressured to keep up with the latest gadgets and software updates, which can be both financially and mentally taxing. The need to remember numerous passwords and navigate through different interfaces for various services also adds to the cognitive burden that was absent in pre-digital times.

However, I believe that the complexity added by technology is outweighed by the simplification it brings to many aspects of life. Online banking and digital payments have eliminated the need for physical visits to financial institutions and carrying cash. Video conferencing allows for instant communication with people across the globe, removing geographical barriers. Smartphones have consolidated numerous tools—cameras, maps, calculators, calendars—into single devices that fit in our pockets, actually reducing physical complexity.

Moreover, artificial intelligence and automation have taken over many routine tasks, from spell-checking to home cleaning with robot vacuums, thereby simplifying daily chores. These technologies, when implemented thoughtfully, serve to streamline rather than complicate our routines.

In conclusion, while technology does introduce certain complexities, I largely disagree with the view that it has made life too complex overall. Instead, it has primarily replaced traditional complexities with different ones, while simultaneously simplifying numerous aspects of daily living. The key lies in mindful adoption of technology and maintaining balance in its usage, which can lead to a more efficient and less complicated lifestyle.`,
        criteria: [
          {
            name: 'Task Response',
            score: 8,
            feedback: 'You have fully addressed all parts of the task with a clear position that is developed throughout. You present a well-balanced argument with both sides considered before reaching a conclusion.',
            suggestions: [
              'Consider providing more specific examples of technologies to strengthen your arguments',
              'Include a brief counterargument to your conclusion to show deeper critical thinking'
            ]
          },
          {
            name: 'Coherence & Cohesion',
            score: 7,
            feedback: 'Your essay is well-organized with a clear progression of ideas. You use paragraphing effectively and employ a range of cohesive devices.',
            suggestions: [
              'Use more sophisticated linking words to show relationships between ideas',
              'Consider using a more varied paragraph structure to enhance the flow'
            ]
          },
          {
            name: 'Lexical Resource',
            score: 7,
            feedback: 'You demonstrate a good range of vocabulary related to technology and its impacts. There is some good use of less common vocabulary items.',
            suggestions: [
              'Incorporate more academic collocations',
              'Use more precise synonyms to avoid repetition of key terms like "complexity" and "technology"'
            ]
          },
          {
            name: 'Grammatical Range & Accuracy',
            score: 7,
            feedback: 'You use a variety of complex structures with generally good control. There are a few minor errors but they don\'t impede communication.',
            suggestions: [
              'Include more complex conditional structures',
              'Pay attention to article usage in some sentences'
            ]
          }
        ],
        score: 7.5
      }
    ],
    aiFeedback: [
      {
        title: 'Task Achievement/Response',
        description: 'You have addressed the task but some key points could be developed further. The graph has been described generally well but some important trends were not mentioned.',
        suggestions: [
          'Make sure to cover all the main features in Task 1',
          'Compare the data more explicitly',
          'Be more precise in your descriptions of trends'
        ],
        score: 6
      },
      {
        title: 'Coherence & Cohesion',
        description: 'Your response is generally coherent with some use of cohesive devices. Paragraphing is present but could be more logical in some places.',
        suggestions: [
          'Use a wider range of linking words',
          'Ensure each paragraph has a clear central topic',
          'Use more referencing terms (this, these, etc.)'
        ],
        score: 6
      },
      {
        title: 'Lexical Resource',
        description: 'You use an adequate range of vocabulary with some flexibility. There are occasional errors in word choice but these don\'t impede communication.',
        suggestions: [
          'Incorporate more academic vocabulary',
          'Use more precise words to describe trends',
          'Try to avoid repetition of key terms'
        ],
        score: 6.5
      },
      {
        title: 'Grammatical Range',
        description: 'You use a mix of simple and complex structures but with some errors. Control of grammar is generally good but inconsistent in places.',
        suggestions: [
          'Review your use of articles (a, an, the)',
          'Pay attention to subject-verb agreement',
          'Try to use a wider variety of complex sentences'
        ],
        score: 6
      }
    ],
    improvementPoints: [
      'Develop your ideas with more specific examples and details',
      'Use a wider range of linking words and phrases to connect ideas',
      'Incorporate more academic vocabulary and collocations',
      'Vary your sentence structures more to demonstrate grammatical range',
      'Allocate your time better between Task 1 and Task 2'
    ],
    sampleImprovement: `The line graph illustrates how average monthly temperatures fluctuate throughout the year in both Tokyo and London.

It is immediately apparent that Tokyo experiences more extreme temperature variations compared to London, which has a more moderate climate. During winter (December to February), both cities record their lowest temperatures, with Tokyo averaging approximately 5-7°C and London slightly warmer at around 8°C.

As spring progresses, both cities gradually warm up, though Tokyo's temperature rises more steeply. By summer (June to August), Tokyo becomes significantly hotter, reaching a peak of around 25-27°C in August, while London's summer temperatures plateau at approximately 18°C.

Tokyo's temperature then decreases more dramatically than London's during autumn months, eventually converging closer to London's temperatures by December.

Overall, while both cities follow similar seasonal patterns, Tokyo experiences a much wider temperature range (approximately 20°C difference between summer and winter) compared to London's more modest variation (about 10°C difference).`
  },
  {
    id: 'writing-result-2',
    testId: 'writing-test-2',
    testTitle: 'IELTS General Training Writing Practice Test',
    skill: 'writing',
    score: 7.0,
    completedAt: new Date('2023-10-30'),
    timeSpent: '62 minutes',
    writingTasks: [
      {
        id: 'task1',
        type: 'task1',
        question: 'You are unhappy with a recent purchase from an online store. Write a letter to the customer service department explaining what you purchased, what the problem is, and what action you would like them to take.',
        wordCount: 163,
        userAnswer: `Dear Sir/Madam,

I am writing to express my dissatisfaction with a recent purchase I made from your online store on 15 October 2023.

I ordered a wireless Bluetooth headphone set (Model XH-2000) for $149.99, which was delivered on 20 October. Upon opening the package and testing the product, I discovered several issues with the headphones.

Firstly, the right earpiece produces a constant static noise whenever music is playing. Secondly, the battery life lasts only about two hours, despite the product description stating it would last for eight hours. Finally, the charging case does not close properly, making it difficult to charge the headphones.

Given these problems, I would like to request a full refund. I have attached a copy of my invoice (Order #45678) and photos showing the defects mentioned.

I would appreciate it if this matter could be resolved within the next seven days. I look forward to your prompt response.

Yours faithfully,
John Smith`,
        criteria: [
          {
            name: 'Task Achievement',
            score: 8,
            feedback: 'You have fully addressed all three bullet points, clearly explaining what was purchased, the problems, and the action you want taken. Your letter follows the appropriate formal format.',
            suggestions: [
              'You could provide slightly more detail about the purchase process',
              'Consider mentioning your customer satisfaction history with the company'
            ]
          },
          {
            name: 'Coherence & Cohesion',
            score: 7,
            feedback: 'Your letter is well-organized with clear paragraphing and logical progression. You use a range of cohesive devices effectively.',
            suggestions: [
              'You could use a slightly wider range of linking words',
              'Consider using more referencing (e.g., "these issues" instead of repeating "the problems")'
            ]
          },
          {
            name: 'Lexical Resource',
            score: 7,
            feedback: 'You use vocabulary accurately and appropriately for the context of a formal complaint letter. There is good use of specific terms related to the product.',
            suggestions: [
              'Consider using more precise vocabulary in some places',
              'You could include more formal expressions typical of business correspondence'
            ]
          },
          {
            name: 'Grammatical Range & Accuracy',
            score: 7,
            feedback: 'You use a mix of sentence structures with good control. There are no significant grammatical errors.',
            suggestions: [
              'Try incorporating more complex sentence structures',
              'Consider using more passive constructions for formal effect'
            ]
          }
        ],
        score: 7.0
      },
      {
        id: 'task2',
        type: 'task2',
        question: 'Some people think that children should begin their formal education at a very early age, while others believe they should start school at around seven years old. Discuss both views and give your own opinion.',
        wordCount: 264,
        userAnswer: `The appropriate age for children to begin formal education is a topic that generates considerable debate. While some advocate for early academic training, others prefer delaying structured schooling until around age seven. This essay will examine both perspectives before offering my own position.

Proponents of early formal education, typically beginning at age three or four, argue that young children's brains are highly receptive to learning during these formative years. They contend that early exposure to structured learning environments develops crucial cognitive, social, and linguistic skills that provide a strong foundation for future academic success. Additionally, early schooling can help identify learning difficulties or developmental delays, allowing for prompt intervention. For working parents, structured early education also offers reliable childcare.

On the other hand, those who favor later school entry point to Scandinavian educational models, where formal schooling often begins at age seven. They argue that young children learn best through play and exploration rather than structured lessons. Delaying formal education, they suggest, allows children more time to develop emotional maturity and self-regulation skills necessary for classroom success. Some research indicates that pushing academic content too early may create stress and negative associations with learning.

In my view, a balanced approach is most beneficial. I believe structured early learning experiences are valuable, but these should be predominantly play-based and developmentally appropriate rather than focused on academic achievements. Kindergartens and preschools should emphasize social skills, creativity, and learning through discovery, gradually introducing more formal elements as children mature.

In conclusion, while both early and delayed formal education have merits, I believe the quality and type of early learning experiences matter more than their timing. A gradual transition from play-based to more structured learning seems most appropriate for young children's development.`,
        criteria: [
          {
            name: 'Task Response',
            score: 8,
            feedback: 'You have addressed both views and clearly stated your own opinion. Your essay demonstrates a nuanced understanding of the issue with well-developed arguments.',
            suggestions: [
              'Include more specific examples to support your points',
              'Your conclusion could more explicitly restate your position'
            ]
          },
          {
            name: 'Coherence & Cohesion',
            score: 7,
            feedback: 'Your essay is well-organized with clear paragraphing and good use of cohesive devices. Ideas flow logically from one to the next.',
            suggestions: [
              'Use a wider variety of linking expressions',
              'Consider using more referencing to avoid repetition'
            ]
          },
          {
            name: 'Lexical Resource',
            score: 7,
            feedback: 'You use a good range of vocabulary with general accuracy. There is evidence of flexibility in how you express ideas.',
            suggestions: [
              'Incorporate more uncommon vocabulary items',
              'Use more precise terms in some places'
            ]
          },
          {
            name: 'Grammatical Range & Accuracy',
            score: 7,
            feedback: 'You use a variety of complex structures with good control. There are very few grammatical errors.',
            suggestions: [
              'Use a wider range of complex grammatical structures',
              'Include more conditional sentences to discuss hypothetical situations'
            ]
          }
        ],
        score: 7.5
      }
    ],
    aiFeedback: [
      {
        title: 'Task Achievement/Response',
        description: 'Your responses generally address the tasks well. For Task 1, you cover all bullet points clearly. For Task 2, you discuss both views and express your opinion effectively.',
        suggestions: [
          'Include more specific examples in Task 2',
          'Make your position in the conclusion of Task 2 more explicit',
          'Consider developing some points in greater depth'
        ],
        score: 7
      },
      {
        title: 'Coherence & Cohesion',
        description: 'Both tasks show good organization with appropriate paragraphing. You use a range of cohesive devices effectively, though there could be more variety.',
        suggestions: [
          'Use a wider range of linking words and phrases',
          'Improve referencing to reduce repetition',
          'Consider using more organizational patterns (e.g., problem-solution, cause-effect)'
        ],
        score: 7
      },
      {
        title: 'Lexical Resource',
        description: 'You demonstrate a good vocabulary range appropriate to both tasks. Your word choice is generally accurate and appropriate.',
        suggestions: [
          'Incorporate more topic-specific vocabulary',
          'Use more academic collocations in Task 2',
          'Consider using more precise adjectives and adverbs'
        ],
        score: 7
      },
      {
        title: 'Grammatical Range',
        description: 'You use a mix of simple and complex structures with good control. There are very few errors that affect meaning.',
        suggestions: [
          'Incorporate more complex sentence types',
          'Use more passive structures where appropriate',
          'Consider using more modal verbs to express nuanced opinions'
        ],
        score: 7
      }
    ],
    improvementPoints: [
      'Develop your arguments with more specific examples and evidence',
      'Use a wider range of cohesive devices and linking expressions',
      'Incorporate more academic vocabulary, especially in Task 2',
      'Experiment with more complex grammatical structures',
      'Make your conclusion more impactful by clearly restating your position'
    ],
    sampleImprovement: `Dear Sir/Madam,

I am writing to express my dissatisfaction regarding a recent purchase made from your online store (Order #45678) on 15 October 2023.

The item in question is a pair of XH-2000 Wireless Bluetooth Headphones, priced at $149.99, which was delivered to my address on 20 October. Upon careful examination of the product, I have identified several significant defects that have rendered the headphones unusable for their intended purpose.

Firstly, the right earpiece consistently emits a distracting static noise during playback, severely compromising the audio quality. Secondly, despite the advertised 8-hour battery life that was a key factor in my purchasing decision, the headphones function for only approximately 2 hours on a full charge. Finally, the charging case has a faulty closing mechanism, making it impossible to properly charge the headphones when not in use.

Given these substantial issues that prevent the product from functioning as advertised, I am requesting a full refund. I have attached copies of the purchase invoice and photographic evidence documenting the aforementioned defects for your reference.

I would appreciate your prompt attention to this matter and expect a resolution within seven business days. Should you require any additional information, please do not hesitate to contact me via the details provided below.

Yours faithfully,
John Smith`
  }
];

// Helper functions to generate question review data
function generateReadingQuestionReview(): SectionQuestions[] {
  return [
    {
      title: 'Passage 1',
      questions: Array(14).fill(null).map((_, i) => ({
        id: `p1-q${i+1}`,
        text: `This is a sample question ${i+1} for Passage 1`,
        type: i % 3 === 0 ? 'multiple_choice' : 'fill_in_the_blanks',
        userAnswer: i % 4 === 0 ? 'incorrect answer' : 'correct answer',
        correctAnswer: i % 4 === 0 ? 'correct answer' : 'correct answer',
        options: i % 3 === 0 ? ['option A', 'option B', 'correct answer', 'option D'] : undefined,
        explanation: 'This explanation clarifies why this answer is correct.',
        isCorrect: i % 4 !== 0
      }))
    },
    {
      title: 'Passage 2',
      questions: Array(13).fill(null).map((_, i) => ({
        id: `p2-q${i+1}`,
        text: `This is a sample question ${i+1} for Passage 2`,
        type: i % 3 === 0 ? 'multiple_choice' : 'true_false_not_given',
        userAnswer: i % 5 === 0 ? 'incorrect answer' : 'correct answer',
        correctAnswer: i % 5 === 0 ? 'correct answer' : 'correct answer',
        options: i % 3 === 0 ? ['option A', 'option B', 'correct answer', 'option D'] : undefined,
        explanation: 'This explanation clarifies why this answer is correct.',
        isCorrect: i % 5 !== 0
      }))
    },
    {
      title: 'Passage 3',
      questions: Array(13).fill(null).map((_, i) => ({
        id: `p3-q${i+1}`,
        text: `This is a sample question ${i+1} for Passage 3`,
        type: i % 3 === 0 ? 'multiple_choice' : 'matching_headings',
        userAnswer: i % 4 === 0 ? 'incorrect answer' : 'correct answer',
        correctAnswer: i % 4 === 0 ? 'correct answer' : 'correct answer',
        options: i % 3 === 0 ? ['option A', 'option B', 'correct answer', 'option D'] : undefined,
        explanation: 'This explanation clarifies why this answer is correct.',
        isCorrect: i % 4 !== 0
      }))
    }
  ];
}

function generateListeningQuestionReview(): SectionQuestions[] {
  return [
    {
      title: 'Section 1',
      questions: Array(10).fill(null).map((_, i) => ({
        id: `s1-q${i+1}`,
        text: `This is a sample question ${i+1} for Section 1`,
        type: i % 3 === 0 ? 'multiple_choice' : 'fill_in_the_blanks',
        userAnswer: i % 6 === 0 ? 'incorrect answer' : 'correct answer',
        correctAnswer: i % 6 === 0 ? 'correct answer' : 'correct answer',
        options: i % 3 === 0 ? ['option A', 'option B', 'correct answer', 'option D'] : undefined,
        explanation: 'This explanation clarifies why this answer is correct.',
        isCorrect: i % 6 !== 0
      }))
    },
    {
      title: 'Section 2',
      questions: Array(10).fill(null).map((_, i) => ({
        id: `s2-q${i+1}`,
        text: `This is a sample question ${i+1} for Section 2`,
        type: i % 3 === 0 ? 'multiple_choice' : 'true_false_not_given',
        userAnswer: i % 5 === 0 ? 'incorrect answer' : 'correct answer',
        correctAnswer: i % 5 === 0 ? 'correct answer' : 'correct answer',
        options: i % 3 === 0 ? ['option A', 'option B', 'correct answer', 'option D'] : undefined,
        explanation: 'This explanation clarifies why this answer is correct.',
        isCorrect: i % 5 !== 0
      }))
    },
    {
      title: 'Section 3',
      questions: Array(10).fill(null).map((_, i) => ({
        id: `s3-q${i+1}`,
        text: `This is a sample question ${i+1} for Section 3`,
        type: i % 3 === 0 ? 'multiple_choice' : 'matching',
        userAnswer: i % 3 === 0 ? 'incorrect answer' : 'correct answer',
        correctAnswer: i % 3 === 0 ? 'correct answer' : 'correct answer',
        options: i % 3 === 0 ? ['option A', 'option B', 'correct answer', 'option D'] : undefined,
        explanation: 'This explanation clarifies why this answer is correct.',
        isCorrect: i % 3 !== 0
      }))
    },
    {
      title: 'Section 4',
      questions: Array(10).fill(null).map((_, i) => ({
        id: `s4-q${i+1}`,
        text: `This is a sample question ${i+1} for Section 4`,
        type: i % 3 === 0 ? 'multiple_choice' : 'short_answer',
        userAnswer: i % 2 === 0 ? 'incorrect answer' : 'correct answer',
        correctAnswer: i % 2 === 0 ? 'correct answer' : 'correct answer',
        options: i % 3 === 0 ? ['option A', 'option B', 'correct answer', 'option D'] : undefined,
        explanation: 'This explanation clarifies why this answer is correct.',
        isCorrect: i % 2 !== 0
      }))
    }
  ];
}

// Helper function to get a result by ID
export function getResultById(resultId: string): TestResultBase | undefined {
  // Check in reading results
  const readingResult = mockReadingResults.find(r => r.id === resultId);
  if (readingResult) return readingResult;
  
  // Check in listening results
  const listeningResult = mockListeningResults.find(r => r.id === resultId);
  if (listeningResult) return listeningResult;
  
  // Check in writing results
  const writingResult = mockWritingResults.find(r => r.id === resultId);
  if (writingResult) return writingResult;
  
  return undefined;
}

// Helper function to get results by skill
export function getResultsBySkill(skill: 'reading' | 'listening' | 'writing'): TestResultBase[] {
  switch (skill) {
    case 'reading':
      return mockReadingResults;
    case 'listening':
      return mockListeningResults;
    case 'writing':
      return mockWritingResults;
  }
}

// Helper function to get results by user ID (for future use)
export function getResultsByUserId(userId: string): TestResultBase[] {
  // In a real app, this would filter by user ID
  // For now, just return all results as if they belong to the current user
  return [
    ...mockReadingResults,
    ...mockListeningResults,
    ...mockWritingResults
  ];
}

// Helper function to get detailed result by ID and type
export function getDetailedResultById(resultId: string): ReadingTestResult | ListeningTestResult | WritingTestResult | undefined {
  // First determine the type of result
  const result = getResultById(resultId);
  if (!result) return undefined;
  
  switch (result.skill) {
    case 'reading':
      return mockReadingResults.find(r => r.id === resultId);
    case 'listening':
      return mockListeningResults.find(r => r.id === resultId);
    case 'writing':
      return mockWritingResults.find(r => r.id === resultId);
  }
}