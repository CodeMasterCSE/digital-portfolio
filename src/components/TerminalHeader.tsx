import React, { useEffect, useState } from 'react';

interface TerminalHeaderProps {
  showDateTime?: boolean;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({ showDateTime = true }) => {
  const [dateTime, setDateTime] = useState<string>("");

  useEffect(() => {
    if (!showDateTime) return;
    const update = () => {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setDateTime(`${date} ${time}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [showDateTime]);

  return (
    <div className="flex items-center justify-center h-10 bg-terminal-header border-b border-terminal-border relative">
      {/* Traffic light dots */}
      <div className="absolute left-4 flex items-center space-x-2">
        <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
        <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
      </div>
      <span className="mx-auto text-terminal-prompt font-mono text-base select-none">
        SampadGorai@portfolio
      </span>
      {showDateTime && (
        <span className="absolute right-4 text-terminal-prompt font-mono text-xs select-none">
          {dateTime}
        </span>
      )}
    </div>
  );
};

export { TerminalHeader };