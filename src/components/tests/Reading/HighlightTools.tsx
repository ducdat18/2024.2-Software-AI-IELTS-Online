// components/test-types/reading/highlight-tools.tsx
'use client';

interface HighlightColor {
  name: string;
  color: string;
}

interface HighlightToolsProps {
  activeColor: string | null;
  onColorSelect: (color: string) => void;
  onClearHighlights: () => void;
  colors?: HighlightColor[];
}

export default function HighlightTools({
  activeColor,
  onColorSelect,
  onClearHighlights,
  colors = [
    { name: 'Yellow', color: 'rgba(255, 255, 0, 0.55)' },
    { name: 'Green', color: 'rgba(0, 255, 0, 0.55)' },
    { name: 'Pink', color: 'rgba(255, 105, 180, 0.55)' },
    { name: 'Blue', color: 'rgba(0, 191, 255, 0.55)' },
  ],
}: HighlightToolsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="text-sm font-medium text-white">Highlight Tools:</div>

      <div className="flex items-center gap-2 ml-2">
        {colors.map((colorOption, index) => (
          <button
            key={index}
            className={`w-7 h-7 rounded transition-all ${
              activeColor === colorOption.color
                ? 'ring-2 ring-white scale-110'
                : 'hover:scale-105'
            }`}
            style={{
              backgroundColor: colorOption.color,
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}
            onClick={() => onColorSelect(colorOption.color)}
            title={`Highlight with ${colorOption.name}`}
          />
        ))}
      </div>

      <button
        className="ml-2 text-sm bg-gray-600 text-white hover:bg-gray-500 px-3 py-1 rounded transition-colors"
        onClick={onClearHighlights}
      >
        Clear All Highlights
      </button>

      {activeColor && (
        <div className="ml-auto text-sm text-yellow-300 font-medium bg-gray-800 px-3 py-1 rounded-full">
          <span className="animate-pulse">✓</span> Select text to highlight
        </div>
      )}
    </div>
  );
}
