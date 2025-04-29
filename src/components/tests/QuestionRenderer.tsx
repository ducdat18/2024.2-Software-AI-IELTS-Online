// components/shared/question-renderer.tsx
'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// Define question types based on the application's needs
type QuestionType =
  | 'multiple_choice'
  | 'true_false_not_given'
  | 'fill_in_the_blanks'
  | 'matching_headings'
  | 'matching'
  | 'short_answer';

interface BaseQuestion {
  id: string;
  type: QuestionType;
  text: string;
  marks?: number;
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple_choice';
  options?: string[];
}

interface TrueFalseNotGivenQuestion extends BaseQuestion {
  type: 'true_false_not_given';
}

interface FillInTheBlanksQuestion extends BaseQuestion {
  type: 'fill_in_the_blanks';
}

interface MatchingHeadingsQuestion extends BaseQuestion {
  type: 'matching_headings';
  options?: string[];
}

interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  options?: string[];
}

interface ShortAnswerQuestion extends BaseQuestion {
  type: 'short_answer';
}

type Question =
  | MultipleChoiceQuestion
  | TrueFalseNotGivenQuestion
  | FillInTheBlanksQuestion
  | MatchingHeadingsQuestion
  | MatchingQuestion
  | ShortAnswerQuestion;

interface QuestionRendererProps {
  question: Question;
  answer: string | string[];
  onAnswerChange: (questionId: string, answer: string | string[]) => void;
  index: number;
}

export default function QuestionRenderer({
  question,
  answer,
  onAnswerChange,
  index,
}: QuestionRendererProps) {
  // Render different question types
  const renderQuestionContent = () => {
    switch (question.type) {
      case 'multiple_choice':
        return (
          <RadioGroup
            value={(answer as string) || ''}
            onValueChange={(value) => onAnswerChange(question.id, value)}
          >
            {question.options?.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem
                  value={option}
                  id={`${question.id}-option-${idx}`}
                  className="bg-white"
                />
                <Label
                  htmlFor={`${question.id}-option-${idx}`}
                  className="text-white"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'true_false_not_given':
        return (
          <RadioGroup
            value={(answer as string) || ''}
            onValueChange={(value) => onAnswerChange(question.id, value)}
          >
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem
                value="true"
                id={`${question.id}-true`}
                className="bg-white"
              />
              <Label htmlFor={`${question.id}-true`} className="text-white">
                True
              </Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem
                value="false"
                id={`${question.id}-false`}
                className="bg-white"
              />
              <Label htmlFor={`${question.id}-false`} className="text-white">
                False
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="not_given"
                id={`${question.id}-not-given`}
                className="bg-white"
              />
              <Label
                htmlFor={`${question.id}-not-given`}
                className="text-white"
              >
                Not Given
              </Label>
            </div>
          </RadioGroup>
        );

      case 'fill_in_the_blanks':
        return (
          <Input
            placeholder="Type your answer..."
            value={(answer as string) || ''}
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
          />
        );

      case 'matching_headings':
        return (
          <div className="grid grid-cols-1 gap-4">
            {question.options?.map((option, idx) => (
              <div key={idx} className="mb-2">
                <div className="mb-1 font-medium text-white">{option}</div>
                <Input
                  placeholder="Enter matching paragraph (e.g., A, B, C)"
                  value={((answer as string[]) || [])[idx] || ''}
                  onChange={(e) => {
                    const newAnswers = [...((answer as string[]) || [])];
                    newAnswers[idx] = e.target.value;
                    onAnswerChange(question.id, newAnswers);
                  }}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            ))}
          </div>
        );

      case 'matching':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-white mb-2">Options:</p>
              {question.options?.map((option, idx) => (
                <div key={idx} className="mb-2 bg-gray-700 p-2 rounded">
                  {option}
                </div>
              ))}
            </div>
            <div>
              <p className="text-white mb-2">Match the pairs:</p>
              <Input
                placeholder="Example: A-1, B-3, C-2"
                value={(answer as string) || ''}
                onChange={(e) => onAnswerChange(question.id, e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
        );

      case 'short_answer':
        return (
          <Input
            placeholder="Type your answer..."
            value={(answer as string) || ''}
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
          />
        );

      default:
        return <p className="text-gray-400">Question type not supported.</p>;
    }
  };

  return (
    <div className="border-b border-gray-700 pb-6 last:border-0">
      <p className="text-white font-medium mb-3">
        Question {index + 1}: {question.text}
      </p>
      {renderQuestionContent()}
    </div>
  );
}
