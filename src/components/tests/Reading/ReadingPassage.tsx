// components/test-types/reading/reading-passage.tsx
'use client';

import { useRef, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Highlight {
  id: string;
  text: string;
  color: string;
}

interface ReadingPassageProps {
  title: string;
  description?: string;
  content: string;
  highlights?: Highlight[];
  onHighlight?: (selectedText: string, color: string) => void;
  activeColor?: string | null;
  children?: React.ReactNode;
}

export default function ReadingPassage({
  title,
  description,
  content,
  highlights = [],
  onHighlight,
  activeColor = null,
  children,
}: ReadingPassageProps) {
  const passageRef = useRef<HTMLDivElement>(null);

  // Apply highlights to the passage
  useEffect(() => {
    if (!passageRef.current) return;

    console.log('Applying highlights:', highlights);

    if (passageRef.current) {
      passageRef.current.innerHTML = content;
    }

    if (highlights.length === 0) return;

    const walker = document.createTreeWalker(
      passageRef.current,
      NodeFilter.SHOW_TEXT,
      null
    );

    const textNodes = [];
    let currentNode;

    while ((currentNode = walker.nextNode())) {
      textNodes.push({
        node: currentNode,
        parent: currentNode.parentNode,
      });
    }

    textNodes.forEach(({ node, parent }) => {
      const originalText = node.nodeValue || '';
      let modifiedText = originalText;
      let didReplace = false;

      highlights.forEach((highlight) => {
        if (originalText.includes(highlight.text)) {
          console.log(
            `Found match for "${highlight.text}" in node:`,
            originalText
          );
          didReplace = true;
          const highlightHtml = `<mark style="background-color: ${highlight.color} !important; color: inherit !important; padding: 2px !important; border-radius: 2px !important;">${highlight.text}</mark>`;
          modifiedText = modifiedText.replace(highlight.text, highlightHtml);
        }
      });

      if (didReplace && parent) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = modifiedText;
        const fragment = document.createDocumentFragment();
        while (tempDiv.firstChild) {
          fragment.appendChild(tempDiv.firstChild);
        }

        parent.replaceChild(fragment, node);
      }
    });

    console.log('Highlighting complete, updated DOM');
  }, [highlights, content]);

  // Handle mouse up event for text selection
  const handleMouseUp = () => {
    if (!activeColor || !onHighlight) return;

    const selection = window.getSelection();
    if (!selection || selection.toString().trim() === '') {
      return;
    }

    const selectedText = selection.toString().trim();
    if (selectedText) {
      console.log(`Selected text: "${selectedText}"`);
      onHighlight(selectedText, activeColor);

      // Clear selection after highlighting
      setTimeout(() => {
        if (window.getSelection) {
          window.getSelection()?.removeAllRanges();
        }
      }, 200);
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">{title}</CardTitle>
        {description && (
          <CardDescription className="text-gray-400">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      {/* Highlight toolbar */}
      {children && (
        <div className="px-4 py-3 bg-gray-700 border-t border-b border-gray-600">
          {children}
        </div>
      )}

      <CardContent className="pt-3">
        <div
          ref={passageRef}
          className="bg-gray-700 p-4 rounded-lg text-white text-justify leading-relaxed overflow-auto h-[560px] reading-passage"
          onMouseUp={handleMouseUp}
          style={{
            userSelect: 'text',
            WebkitUserSelect: 'text',
            MozUserSelect: 'text',
            cursor: activeColor ? 'pointer' : 'text',
          }}
        />
      </CardContent>

      <style jsx global>{`
        /* Improve text selection appearance */
        ::selection {
          background: rgba(66, 153, 225, 0.4) !important;
          color: white !important;
        }

        /* Make paragraphs more selectable */
        .reading-passage p {
          margin-bottom: 1rem;
          line-height: 1.8;
          font-size: 1.05rem;
          user-select: text !important;
          -webkit-user-select: text !important;
          -moz-user-select: text !important;
          cursor: text;
          padding: 0.5rem;
          border-radius: 4px;
        }

        /* Make paragraphs slightly highlighted when hovered to help with selection */
        .reading-passage p:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }

        /* Enhanced style for mark elements */
        mark {
          background-color: inherit !important;
          color: inherit !important;
          padding: 2px !important;
          border-radius: 2px !important;
          box-decoration-break: clone !important;
          -webkit-box-decoration-break: clone !important;
          display: inline !important;
        }
      `}</style>
    </Card>
  );
}
