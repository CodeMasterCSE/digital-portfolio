import React, { useState, useEffect, useRef } from 'react';
import { TerminalHeader } from './TerminalHeader';
import { TerminalOutput } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';

export interface TerminalLine {
  type: 'command' | 'output' | 'error' | 'success' | 'info';
  content: string;
  timestamp?: Date;
}

const Terminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const [currentTheme, setCurrentTheme] = useState('matrix');
  const terminalRef = useRef<HTMLDivElement>(null);

  const themes = {
    matrix: { name: 'Matrix Green', class: 'theme-matrix' },
    cyberpunk: { name: 'Cyberpunk Purple', class: 'theme-cyberpunk' },
    retro: { name: 'Retro Amber', class: 'theme-retro' },
    ocean: { name: 'Ocean Blue', class: 'theme-ocean' }
  };

  useEffect(() => {
    // Welcome message
    setLines([
      { type: 'success', content: 'Welcome to Terminal Portfolio v2.0.0' },
      { type: 'info', content: 'Type "help" to see available commands.' },
      { type: 'output', content: '' }
    ]);
  }, []);

  useEffect(() => {
    // Enhanced auto-scroll to bottom with smooth behavior
    if (terminalRef.current && !isTyping) {
      const scrollElement = terminalRef.current;
      scrollElement.scrollTo({
        top: scrollElement.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [lines, isTyping]);

  const executeCommand = (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();
    
    // Add command to history
    if (trimmedCommand && !commandHistory.includes(trimmedCommand)) {
      setCommandHistory(prev => [...prev, trimmedCommand]);
    }
    setHistoryIndex(-1);

    // Add command to output
    const commandLine: TerminalLine = { type: 'command', content: `visitor@portfolio:~$ ${command}` };
    setLines(prev => [...prev, commandLine]);

    // Start typing animation for responses
    setIsTyping(true);
    setCurrentTypingIndex(lines.length + 1);

    // Process command and add responses with delay
    let newLines: TerminalLine[] = [];
    switch (trimmedCommand) {
      case '':
        newLines = [];
        break;
      case 'help':
        newLines = [
          { type: 'info', content: 'Available Commands:' },
          { type: 'output', content: '  help       - Show this help message' },
          { type: 'output', content: '  about      - About me' },
          { type: 'output', content: '  skills     - Technical skills' },
          { type: 'output', content: '  projects   - Portfolio projects' },
          { type: 'output', content: '  contact    - Contact information' },
          { type: 'output', content: '  themes     - Available themes' },
          { type: 'output', content: '  clear      - Clear terminal' },
          { type: 'output', content: '  whoami     - Current user info' }
        ];
        break;
      case 'about':
        newLines = [
          { type: 'success', content: 'About Me' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Hello! I\'m a passionate Full Stack Developer with expertise in' },
          { type: 'output', content: 'modern web technologies. I love creating innovative solutions' },
          { type: 'output', content: 'and building user-friendly applications.' },
          { type: 'output', content: '' },
          { type: 'info', content: 'Experience: 5+ years in web development' },
          { type: 'info', content: 'Location: San Francisco, CA' },
          { type: 'info', content: 'Passion: Building the future, one line of code at a time' }
        ];
        break;
      case 'skills':
        newLines = [
          { type: 'success', content: 'Technical Skills' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Frontend Technologies:' },
          { type: 'info', content: '  ✓ React.js / Next.js' },
          { type: 'info', content: '  ✓ TypeScript / JavaScript' },
          { type: 'info', content: '  ✓ Tailwind CSS / Styled Components' },
          { type: 'info', content: '  ✓ HTML5 / CSS3' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Backend Technologies:' },
          { type: 'info', content: '  ✓ Node.js / Express' },
          { type: 'info', content: '  ✓ Python / Django' },
          { type: 'info', content: '  ✓ PostgreSQL / MongoDB' },
          { type: 'info', content: '  ✓ REST APIs / GraphQL' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Tools & Others:' },
          { type: 'info', content: '  ✓ Git / GitHub' },
          { type: 'info', content: '  ✓ Docker / AWS' },
          { type: 'info', content: '  ✓ Linux / Terminal' }
        ];
        break;
      case 'projects':
        newLines = [
          { type: 'success', content: 'Portfolio Projects' },
          { type: 'output', content: '' },
          { type: 'info', content: '1. E-Commerce Platform' },
          { type: 'output', content: '   Tech: React, Node.js, PostgreSQL' },
          { type: 'output', content: '   Desc: Full-stack shopping platform with payment integration' },
          { type: 'output', content: '' },
          { type: 'info', content: '2. Task Management App' },
          { type: 'output', content: '   Tech: Next.js, TypeScript, Supabase' },
          { type: 'output', content: '   Desc: Collaborative project management tool' },
          { type: 'output', content: '' },
          { type: 'info', content: '3. Weather Dashboard' },
          { type: 'output', content: '   Tech: React, D3.js, OpenWeather API' },
          { type: 'output', content: '   Desc: Interactive weather visualization dashboard' },
          { type: 'output', content: '' },
          { type: 'output', content: 'GitHub: github.com/yourhandle' }
        ];
        break;
      case 'contact':
        newLines = [
          { type: 'success', content: 'Contact Information' },
          { type: 'output', content: '' },
          { type: 'info', content: 'Email: developer@example.com' },
          { type: 'info', content: 'LinkedIn: linkedin.com/in/yourprofile' },
          { type: 'info', content: 'GitHub: github.com/yourhandle' },
          { type: 'info', content: 'Portfolio: yourwebsite.com' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Feel free to reach out for collaborations or opportunities!' }
        ];
        break;
      case 'themes':
        newLines = [
          { type: 'success', content: 'Available Themes' },
          { type: 'output', content: '' },
          ...Object.entries(themes).map(([key, theme]) => ({
            type: 'info' as const,
            content: `  ${key === currentTheme ? '●' : '○'} ${key} - ${theme.name}`
          })),
          { type: 'output', content: '' },
          { type: 'output', content: 'Usage: theme <name>' },
          { type: 'output', content: `Current theme: ${currentTheme}` }
        ];
        break;
      case 'whoami':
        newLines = [
          { type: 'success', content: 'You are browsing as: Visitor' },
          { type: 'output', content: 'Welcome to my terminal portfolio!' }
        ];
        break;
      case 'clear':
        setLines([]);
        setIsTyping(false);
        return;
      default:
        // Check if it's a theme command
        if (trimmedCommand.startsWith('theme ')) {
          const themeName = trimmedCommand.split(' ')[1];
          if (themes[themeName as keyof typeof themes]) {
            setCurrentTheme(themeName);
            newLines = [
              { type: 'success', content: `Theme changed to: ${themes[themeName as keyof typeof themes].name}` }
            ];
          } else {
            newLines = [
              { type: 'error', content: `❌ Theme not found: ${themeName}` },
              { type: 'output', content: 'Available themes: ' + Object.keys(themes).join(', ') }
            ];
          }
        } else {
          newLines = [
            { type: 'error', content: `❌ Command not found: ${trimmedCommand}` },
            { type: 'output', content: '💡 Type "help" for available commands.' }
          ];
        }
    }

    // Add responses with typing animation
    if (newLines.length > 0) {
      setTimeout(() => {
        setLines(prev => [...prev, ...newLines, { type: 'output', content: '' }]);
        setIsTyping(false);
      }, 100);
    } else {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen w-full bg-background flex items-center justify-center p-4">
      <div className={`w-full max-w-4xl h-full max-h-[90vh] bg-terminal-bg border border-terminal-border rounded-lg shadow-2xl overflow-hidden ${themes[currentTheme as keyof typeof themes]?.class || ''}`}>
        <TerminalHeader />
        <div 
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 font-mono text-sm relative scroll-smooth"
          style={{ 
            scrollbarWidth: 'thin',
            scrollbarColor: 'hsl(var(--terminal-border)) transparent',
            maxHeight: 'calc(90vh - 60px)'
          }}
        >
          <div className="terminal-scanline"></div>
          <TerminalOutput 
            lines={lines} 
            isTyping={isTyping}
            currentTypingIndex={currentTypingIndex}
          />
          <TerminalInput 
            onExecuteCommand={executeCommand}
            commandHistory={commandHistory}
            historyIndex={historyIndex}
            setHistoryIndex={setHistoryIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;