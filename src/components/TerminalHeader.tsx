import React from 'react';
import { Minus, Square, X } from 'lucide-react';

export const TerminalHeader: React.FC = () => {
  return (
    <div className="bg-terminal-header border-b border-terminal-border p-3 flex items-center">
      <div className="flex items-center space-x-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-error shadow-lg"></div>
          <div className="w-3 h-3 rounded-full bg-warning shadow-lg"></div>
          <div className="w-3 h-3 rounded-full bg-success shadow-lg"></div>
        </div>
        <span className="text-terminal-text text-sm font-mono ml-4 terminal-glow">
          visitor@portfolio:~$
        </span>
      </div>
    </div>
  );
};