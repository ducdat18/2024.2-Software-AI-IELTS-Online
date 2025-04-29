'use client';

interface ProgressBarProps {
  value: number;
  showLabel?: boolean;
  className?: string;
  height?: string;
}

export default function ProgressBar({
  value,
  showLabel = true,
  className = '',
  height = 'h-2',
}: ProgressBarProps) {
  const getProgressColor = () => {
    if (value < 33) return 'bg-red-500';
    if (value < 67) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className={`mb-6 ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-400">Progress</span>
          <span className="text-gray-400">{value.toFixed(0)}% Complete</span>
        </div>
      )}
      <div className={`bg-gray-200 rounded-full ${height} overflow-hidden`}>
        <div
          className={`h-full rounded-full ${getProgressColor()}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
