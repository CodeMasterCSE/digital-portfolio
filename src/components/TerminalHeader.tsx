import React from 'react';
import { Minus, Square, X } from 'lucide-react';

export const TerminalHeader: React.FC = () => {
  return (
    <div className="bg-terminal-header border-b border-terminal-border p-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-error"></div>
          <div className="w-3 h-3 rounded-full bg-warning"></div>
          <div className="w-3 h-3 rounded-full bg-success"></div>
        </div>
        <span className="text-terminal-text text-sm font-mono ml-4">
          guest@portfolio:~$
        </span>
      </div>
      <div className="flex items-center space-x-1">
        <button className="p-1 hover:bg-terminal-border rounded text-terminal-text">
          <Minus size={12} />
        </button>
        <button className="p-1 hover:bg-terminal-border rounded text-terminal-text">
          <Square size={12} />
        </button>
        <button className="p-1 hover:bg-terminal-border rounded text-terminal-text">
          <X size={12} />
        </button>
      </div>
    </div>
  );
};