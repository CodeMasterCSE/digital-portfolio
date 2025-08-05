import React, { useEffect, useState, useRef } from 'react';

interface TerminalHeaderProps {
  showDateTime?: boolean;
  currentTheme?: string;
  onThemeChange?: (theme: string) => void;
}

const AVAILABLE_THEMES = [
  { name: 'default', displayName: 'Matrix Green', icon: '🟢' },
  { name: 'matrix', displayName: 'Matrix Enhanced', icon: '💚' },
  { name: 'cyberpunk', displayName: 'Cyberpunk', icon: '🟣' },
  { name: 'retro', displayName: 'Retro', icon: '🟠' },
  { name: 'ocean', displayName: 'Ocean', icon: '🔵' }
];

const TerminalHeader: React.FC<TerminalHeaderProps> = ({ 
  showDateTime = true, 
  currentTheme = 'default',
  onThemeChange 
}) => {
  const [dateTime, setDateTime] = useState<string>("");
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowThemeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      {/* Theme selector */}
      {onThemeChange && (
        <div className="absolute left-20 flex items-center">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              className="flex items-center space-x-1 px-2 py-1 text-xs text-terminal-prompt hover:text-terminal-text transition-colors"
              title="Change theme"
            >
              <span>{AVAILABLE_THEMES.find(t => t.name === currentTheme)?.icon || '🎨'}</span>
              <span className="hidden sm:inline">Theme</span>
            </button>
            
            {showThemeDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-terminal-bg border border-terminal-border rounded shadow-lg z-50 min-w-48">
                {AVAILABLE_THEMES.map(theme => (
                  <button
                    key={theme.name}
                    onClick={() => {
                      onThemeChange(theme.name);
                      setShowThemeDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-terminal-border transition-colors flex items-center space-x-2 ${
                      theme.name === currentTheme ? 'text-success' : 'text-terminal-prompt'
                    }`}
                  >
                    <span>{theme.icon}</span>
                    <span>{theme.displayName}</span>
                    {theme.name === currentTheme && <span className="ml-auto">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      {showDateTime && (
        <span className="absolute right-4 text-terminal-prompt font-mono text-xs select-none">
          {dateTime}
        </span>
      )}
    </div>
  );
};

export { TerminalHeader };