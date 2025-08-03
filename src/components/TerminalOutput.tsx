import React from 'react';
import { TerminalLine } from './Terminal';

interface TerminalOutputProps {
  lines: TerminalLine[];
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ lines }) => {
  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command':
        return 'text-terminal-prompt';
      case 'error':
        return 'text-error';
      case 'success':
        return 'text-success';
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
          {line.content}
        </div>
      ))}
    </div>
  );
};