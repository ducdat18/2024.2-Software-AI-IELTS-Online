// components/shared/test-navigation.tsx
'use client';

import { Button } from '@/components/ui/button';

interface TestNavigationProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  isPreviousDisabled?: boolean;
  isLastSection?: boolean;
  previousLabel?: string;
  nextLabel?: string;
  submitLabel?: string;
}

export default function TestNavigation({
  onPrevious,
  onNext,
  onSubmit,
  isPreviousDisabled = false,
  isLastSection = false,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  submitLabel = 'Submit Test',
}: TestNavigationProps) {
  return (
    <div className="flex justify-between mt-6">
      {onPrevious && (
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isPreviousDisabled}
          className="border-gray-600 text-black"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {previousLabel}
        </Button>
      )}
      {!onPrevious && <div></div>}{' '}
      {/* Empty div for flex spacing if no previous button */}
      {isLastSection
        ? onSubmit && (
            <Button
              onClick={onSubmit}
              className="bg-green-600 hover:bg-green-700"
            >
              {submitLabel}
              <svg
                className="w-5 h-5 ml-2"
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
            </Button>
          )
        : onNext && (
            <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700">
              {nextLabel}
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          )}
    </div>
  );
}
