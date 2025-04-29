// components/ui/empty-state.tsx
'use client';

import { Button } from '@/components/ui/button';

export interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  buttonText,
  onButtonClick,
  icon = <div className="text-6xl mb-4">🔍</div>,
}: EmptyStateProps) {
  return (
    <div className="text-center py-16 bg-gray-800 rounded-lg">
      {icon}
      <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <Button variant="outline" onClick={onButtonClick} className="text-black">
        {buttonText}
      </Button>
    </div>
  );
}
