import React from 'react';
import { TerminalLine } from './Terminal';
import { TypingText } from './TypingText';

interface TerminalOutputProps {
  lines: TerminalLine[];
  isTyping: boolean;
  currentTypingIndex: number;
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ 
  lines, 
  isTyping, 
  currentTypingIndex 
}) => {
  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command':
        return 'text-terminal-prompt font-bold';
      case 'error':
        return 'text-error';
      case 'success':
        return 'text-success font-semibold';
      case 'info':
        return 'text-info';
      case 'output':
      default:
        return 'text-terminal-text';
    }
  };

  return (
    <div className="space-y-1">
      {lines.map((line, index) => (
        <div key={index} className={`${getLineColor(line.type)} whitespace-pre-wrap`}>
          {isTyping && index >= currentTypingIndex ? (
            <TypingText 
              text={line.content}
              speed={line.type === 'command' ? 50 : 20}
              className={getLineColor(line.type)}
            />
          ) : (
            line.content
          )}
        </div>
      ))}
    </div>
  );
};