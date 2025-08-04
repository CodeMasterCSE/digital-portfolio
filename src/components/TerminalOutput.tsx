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
        return 'text-terminal-text';
      case 'error':
        return 'text-[hsl(var(--error))]';
      case 'success':
      case 'info':
      case 'output':
      default:
        return 'text-terminal-text';
    }
  };

  const renderCommandLine = (content: string) => {
    const promptMatch = content.match(/^(visitor@portfolio:~\$\s)(.*)/);
    if (promptMatch) {
      return (
        <>
          <span className="text-[hsl(var(--terminal-prompt-fixed))]">{promptMatch[1]}</span>
          <span className="text-terminal-text">{promptMatch[2]}</span>
        </>
      );
    }
    return content;
  };

  return (
    <div className="space-y-1">
      {lines.map((line, index) => (
        <div key={index} className={`${getLineColor(line.type)} whitespace-pre-wrap`}>
          {line.type === 'command' ? renderCommandLine(line.content) : line.content}
        </div>
      ))}
      {currentLine && (
        <div className={`${getLineColor(currentLine.type)} whitespace-pre-wrap`}>
          {currentLine.type === 'command' ? (
            <TypingText
              text={currentLine.content}
              speed={50}
              className={getLineColor(currentLine.type)}
              onComplete={onLineComplete}
              renderContent={(text) => renderCommandLine(text)}
            />
          ) : (
            <TypingText
              text={currentLine.content}
              speed={20}
              className={getLineColor(currentLine.type)}
              onComplete={onLineComplete}
            />
          )}
        </div>
      )}
    </div>
  );
};