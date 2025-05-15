'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getTestById } from '@/mock/tests';
import {
  Test,
  ListeningTest,
  ReadingTest,
  WritingTest,
  ListeningSection,
  ReadingSection,
  ListeningQuestion,
  ReadingQuestion,
  ListeningQuestionType,
  ReadingQuestionType,
} from '@/types/test';

// Type for a generic section with questions
interface GenericSection {
  id: string;
  title: string;
  description?: string;
  questions: Array<ListeningQuestion | ReadingQuestion>;
}

// Type for question form that ensures type safety with question types
interface QuestionForm {
  type: ListeningQuestionType | ReadingQuestionType;
  text: string;
  options: string[];
  correctAnswer: string | string[];
  marks: number;
}

export default function SectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.testId as string;
  const sectionId = params.sectionId as string;

  const [test, setTest] = useState<Test | null>(null);
  const [section, setSection] = useState<GenericSection | null>(null);
  const [isEditingSectionOpen, setIsEditingSectionOpen] =
    useState<boolean>(false);
  const [isAddingQuestionOpen, setIsAddingQuestionOpen] =
    useState<boolean>(false);

  const [sectionForm, setSectionForm] = useState({
    title: '',
    description: '',
  });

  // Initialize with a valid question type to ensure type safety
  const [questionForm, setQuestionForm] = useState<QuestionForm>({
    type: 'multiple_choice', // This is valid for both listening and reading
    text: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    marks: 1,
  });

  // Helper function to determine if test is a ListeningTest
  const isListeningTest = (test: Test): test is ListeningTest => {
    return test.skill === 'listening';
  };

  // Helper function to determine if test is a ReadingTest
  const isReadingTest = (test: Test): test is ReadingTest => {
    return test.skill === 'reading';
  };

  // Helper function to determine if test is a WritingTest
  const isWritingTest = (test: Test): test is WritingTest => {
    return test.skill === 'writing';
  };

  // Helper function to validate question type based on test type
  const validateQuestionType = (
    type: string
  ): ListeningQuestionType | ReadingQuestionType => {
    if (test) {
      if (isListeningTest(test)) {
        return type as ListeningQuestionType;
      } else if (isReadingTest(test)) {
        return type as ReadingQuestionType;
      }
    }
    // Default to a common type if test is not set yet
    return 'multiple_choice';
  };

  // Helper function to find section based on test type
  const findSection = (
    test: Test,
    sectionId: string
  ): GenericSection | null => {
    if (isListeningTest(test)) {
      const section = test.sections.find((s) => s.id === sectionId);
      return section || null;
    } else if (isReadingTest(test)) {
      const section = test.sections.find((s) => s.id === sectionId);
      return section || null;
    } else if (isWritingTest(test)) {
      // Handle writing test tasks as "sections"
      const task = test.tasks.find((t) => t.id === sectionId);
      if (task) {
        return {
          id: task.id,
          title: `${
            task.type === 'task1' ? 'Task 1' : 'Task 2'
          }: ${task.question.substring(0, 30)}...`,
          description: task.question,
          questions: [], // Writing tasks don't have questions
        };
      }
    }
    return null;
  };

  useEffect(() => {
    // In a real app, we would fetch test data from an API
    const fetchedTest = getTestById(testId);

    if (fetchedTest) {
      setTest(fetchedTest);

      // Find the section
      const foundSection = findSection(fetchedTest, sectionId);
      if (foundSection) {
        setSection(foundSection);
        setSectionForm({
          title: foundSection.title,
          description: foundSection.description || '',
        });
      } else {
        console.error(
          `Section with ID ${sectionId} not found in test ${testId}`
        );
        // Could redirect to test detail page
      }
    } else {
      console.error(`Test with ID ${testId} not found`);
      // Could redirect to content management dashboard
    }
  }, [testId, sectionId]);

  const handleSectionFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSectionForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setQuestionForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionTypeChange = (value: string) => {
    // Validate the type before setting it to ensure it's a valid question type
    const validatedType = validateQuestionType(value);
    setQuestionForm((prev) => ({ ...prev, type: validatedType }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...questionForm.options];
    newOptions[index] = value;
    setQuestionForm((prev) => ({ ...prev, options: newOptions }));
  };

  const handleUpdateSection = () => {
    // In a real app, this would be an API call to update the section
    console.log(`Updating section ${sectionId} with data:`, sectionForm);

    // Update the local state to reflect changes
    if (section) {
      const updatedSection: GenericSection = {
        ...section,
        ...sectionForm,
      };
      setSection(updatedSection);
    }

    setIsEditingSectionOpen(false);
  };

  const handleAddQuestion = () => {
    // In a real app, this would be an API call to add the question
    console.log(
      `Adding question to section ${sectionId} with data:`,
      questionForm
    );

    // Generate a unique ID for the new question
    const newQuestionId = `q-${Date.now()}`;

    // Update the local state to reflect changes
    if (section) {
      // Create a new question with the proper type based on the test type
      let newQuestion;

      if (test && isListeningTest(test)) {
        // For listening test, explicitly create a ListeningQuestion
        newQuestion = {
          id: newQuestionId,
          type: questionForm.type as ListeningQuestionType,
          text: questionForm.text,
          options: questionForm.options,
          correctAnswer: questionForm.correctAnswer,
          marks: questionForm.marks,
        } as ListeningQuestion;
      } else if (test && isReadingTest(test)) {
        // For reading test, explicitly create a ReadingQuestion
        newQuestion = {
          id: newQuestionId,
          type: questionForm.type as ReadingQuestionType,
          text: questionForm.text,
          options: questionForm.options,
          correctAnswer: questionForm.correctAnswer,
          marks: questionForm.marks,
        } as ReadingQuestion;
      } else {
        // This should never happen if we have proper guards in place
        console.error('Unknown test type, cannot add question');
        return;
      }

      // Create a new section with the updated questions array
      const updatedSection: GenericSection = {
        ...section,
        questions: [...section.questions, newQuestion],
      };

      setSection(updatedSection);
    }

    // Reset the form and close the dialog
    setQuestionForm({
      type: 'multiple_choice',
      text: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      marks: 1,
    });
    setIsAddingQuestionOpen(false);
  };

  if (!test || !section) {
    return (
      <div className="container mx-auto px-4 py-24 flex justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Link href={`/content-manager/tests/${testId}`}>
            <Button
              variant="outline"
              size="sm"
              className="text-white border-gray-600"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Test
            </Button>
          </Link>
          <span className="text-xs px-2 py-1 bg-blue-900/30 rounded-full text-blue-400">
            {test.title}
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {section.title}
            </h1>
            <p className="text-gray-400">{section.description}</p>
          </div>
          <div className="flex gap-3">
            <Dialog
              open={isEditingSectionOpen}
              onOpenChange={setIsEditingSectionOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-gray-600 text-white"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Edit Section
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle>Edit Section</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Update the section details
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">
                      Section Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={sectionForm.title}
                      onChange={handleSectionFormChange}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-white">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={sectionForm.description}
                      onChange={handleSectionFormChange}
                      className="bg-gray-700 border-gray-600 text-white h-20"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditingSectionOpen(false)}
                    className="border-gray-600 text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpdateSection}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Update Section
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Only show Add Question button for listening and reading tests */}
            {(isListeningTest(test) || isReadingTest(test)) && (
              <Dialog
                open={isAddingQuestionOpen}
                onOpenChange={setIsAddingQuestionOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add Question
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700 text-white max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Question</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Create a new question for this section
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="questionType" className="text-white">
                        Question Type
                      </Label>
                      <Select
                        value={questionForm.type}
                        onValueChange={handleQuestionTypeChange}
                      >
                        <SelectTrigger
                          id="questionType"
                          className="bg-gray-700 border-gray-600 text-white"
                        >
                          <SelectValue placeholder="Select question type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="multiple_choice">
                            Multiple Choice
                          </SelectItem>
                          <SelectItem value="true_false_not_given">
                            True/False/Not Given
                          </SelectItem>
                          <SelectItem value="fill_in_the_blanks">
                            Fill in the Blanks
                          </SelectItem>
                          <SelectItem value="matching_headings">
                            Matching Headings
                          </SelectItem>
                          <SelectItem value="short_answer">
                            Short Answer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="questionText" className="text-white">
                        Question Text
                      </Label>
                      <Textarea
                        id="questionText"
                        name="text"
                        value={questionForm.text}
                        onChange={handleQuestionFormChange}
                        placeholder="Enter your question here"
                        className="bg-gray-700 border-gray-600 text-white h-20"
                      />
                    </div>

                    {questionForm.type === 'multiple_choice' && (
                      <div className="space-y-4">
                        <Label className="text-white">Options</Label>
                        {questionForm.options.map((option, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              value={option}
                              onChange={(e) =>
                                handleOptionChange(index, e.target.value)
                              }
                              placeholder={`Option ${index + 1}`}
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-white border-gray-600"
                              onClick={() => {
                                setQuestionForm((prev) => ({
                                  ...prev,
                                  correctAnswer: option,
                                }));
                              }}
                            >
                              {questionForm.correctAnswer === option ? (
                                <svg
                                  className="w-5 h-5 text-green-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : (
                                'Set as Answer'
                              )}
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {questionForm.type === 'true_false_not_given' && (
                      <div className="space-y-2">
                        <Label className="text-white">Correct Answer</Label>
                        <Select
                          value={questionForm.correctAnswer as string}
                          onValueChange={(value) =>
                            setQuestionForm((prev) => ({
                              ...prev,
                              correctAnswer: value,
                            }))
                          }
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue placeholder="Select correct answer" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="true">True</SelectItem>
                            <SelectItem value="false">False</SelectItem>
                            <SelectItem value="not_given">Not Given</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {(questionForm.type === 'fill_in_the_blanks' ||
                      questionForm.type === 'short_answer') && (
                      <div className="space-y-2">
                        <Label htmlFor="correctAnswer" className="text-white">
                          Correct Answer
                        </Label>
                        <Input
                          id="correctAnswer"
                          name="correctAnswer"
                          value={questionForm.correctAnswer as string}
                          onChange={handleQuestionFormChange}
                          placeholder="Enter the correct answer"
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="marks" className="text-white">
                        Marks
                      </Label>
                      <Input
                        id="marks"
                        name="marks"
                        type="number"
                        value={questionForm.marks}
                        onChange={(e) =>
                          setQuestionForm((prev) => ({
                            ...prev,
                            marks: parseInt(e.target.value) || 1,
                          }))
                        }
                        min={1}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingQuestionOpen(false)}
                      className="border-gray-600 text-white"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddQuestion}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Add Question
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">Questions</h2>
        {section.questions && section.questions.length > 0 ? (
          <div className="space-y-4">
            {section.questions.map((question, index) => (
              <Card key={question.id} className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-white text-lg">
                      Question {index + 1}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs px-2 py-1 bg-blue-900/30 rounded-full text-blue-400">
                        {question.type
                          .split('_')
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(' ')}
                      </span>
                      <span className="text-xs px-2 py-1 bg-green-900/30 rounded-full text-green-400">
                        {question.marks}{' '}
                        {question.marks === 1 ? 'Mark' : 'Marks'}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-white h-7"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white mb-4">{question.text}</p>

                  {question.type === 'multiple_choice' && question.options && (
                    <div className="space-y-2 ml-4">
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center">
                          <div
                            className={`w-4 h-4 rounded-full border mr-2 ${
                              option === question.correctAnswer
                                ? 'bg-green-500 border-green-500'
                                : 'border-gray-500'
                            }`}
                          ></div>
                          <span
                            className={`${
                              option === question.correctAnswer
                                ? 'text-green-400'
                                : 'text-gray-300'
                            }`}
                          >
                            {option}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === 'true_false_not_given' && (
                    <div className="space-y-2 ml-4">
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full border mr-2 ${
                            question.correctAnswer === 'true'
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-500'
                          }`}
                        ></div>
                        <span
                          className={`${
                            question.correctAnswer === 'true'
                              ? 'text-green-400'
                              : 'text-gray-300'
                          }`}
                        >
                          True
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full border mr-2 ${
                            question.correctAnswer === 'false'
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-500'
                          }`}
                        ></div>
                        <span
                          className={`${
                            question.correctAnswer === 'false'
                              ? 'text-green-400'
                              : 'text-gray-300'
                          }`}
                        >
                          False
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full border mr-2 ${
                            question.correctAnswer === 'not_given'
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-500'
                          }`}
                        ></div>
                        <span
                          className={`${
                            question.correctAnswer === 'not_given'
                              ? 'text-green-400'
                              : 'text-gray-300'
                          }`}
                        >
                          Not Given
                        </span>
                      </div>
                    </div>
                  )}

                  {(question.type === 'fill_in_the_blanks' ||
                    question.type === 'short_answer') && (
                    <div className="ml-4">
                      <p className="text-gray-400">
                        Correct Answer:{' '}
                        <span className="text-green-400">
                          {typeof question.correctAnswer === 'string'
                            ? question.correctAnswer
                            : question.correctAnswer.join(', ')}
                        </span>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-gray-700 p-4 mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                No questions yet
              </h3>
              <p className="text-gray-400 text-center mb-6">
                This section doesn't have any questions yet. Add questions to
                complete the section.
              </p>
              {(isListeningTest(test) || isReadingTest(test)) && (
                <Dialog
                  open={isAddingQuestionOpen}
                  onOpenChange={setIsAddingQuestionOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add Your First Question
                    </Button>
                  </DialogTrigger>
                </Dialog>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Section Preview</CardTitle>
          <CardDescription className="text-gray-400">
            This is how the section will appear to students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              {section.title}
            </h2>
            <p className="text-gray-300 mb-6">{section.description}</p>

            {section.questions && section.questions.length > 0 ? (
              <div className="space-y-6">
                {section.questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="border-t border-gray-600 pt-4"
                  >
                    <p className="text-white mb-3">
                      <span className="font-medium">Question {index + 1}:</span>{' '}
                      {question.text}
                    </p>

                    {question.type === 'multiple_choice' &&
                      question.options && (
                        <div className="space-y-2 ml-4">
                          {question.options.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-center">
                              <div className="w-4 h-4 rounded-full border border-gray-500 mr-2"></div>
                              <span className="text-gray-300">{option}</span>
                            </div>
                          ))}
                        </div>
                      )}

                    {question.type === 'true_false_not_given' && (
                      <div className="space-y-2 ml-4">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full border border-gray-500 mr-2"></div>
                          <span className="text-gray-300">True</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full border border-gray-500 mr-2"></div>
                          <span className="text-gray-300">False</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full border border-gray-500 mr-2"></div>
                          <span className="text-gray-300">Not Given</span>
                        </div>
                      </div>
                    )}

                    {question.type === 'fill_in_the_blanks' && (
                      <div className="ml-4">
                        <div className="flex items-center">
                          <input
                            type="text"
                            className="bg-gray-800 border border-gray-600 text-gray-300 px-3 py-1 rounded w-48"
                            placeholder="Your answer..."
                            disabled
                          />
                        </div>
                      </div>
                    )}

                    {question.type === 'short_answer' && (
                      <div className="ml-4">
                        <div className="flex items-center">
                          <input
                            type="text"
                            className="bg-gray-800 border border-gray-600 text-gray-300 px-3 py-1 rounded w-full"
                            placeholder="Your answer..."
                            disabled
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-t border-gray-600 pt-4 text-gray-400 italic">
                No questions have been added to this section yet.
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-gray-400 text-sm">
            Note: This is a preview only. Students will see the section with
            interactive elements.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
