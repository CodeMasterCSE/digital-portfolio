import React from 'react';
import { TerminalLine } from './Terminal';
import { TypingText } from './TypingText';

interface TerminalOutputProps {
  lines: TerminalLine[];
  currentLine: TerminalLine | null;
  onLineComplete?: () => void;
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({
  lines,
  currentLine,
  onLineComplete,
}) => {
  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command':
        return 'text-terminal-prompt font-bold';
      case 'error':
      case 'success':
      case 'info':
      case 'output':
      default:
        return 'text-terminal-text';
    }
  };

  return (
    <div className="space-y-1">
      {lines.map((line, index) => (
        <div key={index} className={`${getLineColor(line.type)} whitespace-pre-wrap`}>
          {line.content}
        </div>
      ))}
      {currentLine && (
        <div className={`${getLineColor(currentLine.type)} whitespace-pre-wrap`}>
          <TypingText
            text={currentLine.content}
            speed={currentLine.type === 'command' ? 50 : 20}
            className={getLineColor(currentLine.type)}
            onComplete={onLineComplete}
          />
        </div>
      )}
    </div>
  );
};