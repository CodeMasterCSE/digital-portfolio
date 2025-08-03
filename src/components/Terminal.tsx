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
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Welcome message
    setLines([
      { type: 'success', content: 'Welcome to the Terminal Portfolio v1.0.0' },
      { type: 'info', content: 'Type "help" to see available commands.' },
      { type: 'output', content: '' }
    ]);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const executeCommand = (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();
    
    // Add command to history
    if (trimmedCommand && !commandHistory.includes(trimmedCommand)) {
      setCommandHistory(prev => [...prev, trimmedCommand]);
    }
    setHistoryIndex(-1);

    // Add command to output
    setLines(prev => [...prev, { type: 'command', content: `$ ${command}` }]);

    // Process command
    switch (trimmedCommand) {
      case '':
        break;
      case 'help':
        setLines(prev => [...prev, 
          { type: 'info', content: 'Available commands:' },
          { type: 'output', content: '  help       - Show this help message' },
          { type: 'output', content: '  about      - About me' },
          { type: 'output', content: '  skills     - Technical skills' },
          { type: 'output', content: '  projects   - Portfolio projects' },
          { type: 'output', content: '  contact    - Contact information' },
          { type: 'output', content: '  clear      - Clear terminal' },
          { type: 'output', content: '  whoami     - Current user info' }
        ]);
        break;
      case 'about':
        setLines(prev => [...prev,
          { type: 'success', content: '=== About Me ===' },
          { type: 'output', content: 'Hello! I\'m a passionate Full Stack Developer with expertise in' },
          { type: 'output', content: 'modern web technologies. I love creating innovative solutions' },
          { type: 'output', content: 'and building user-friendly applications.' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Experience: 5+ years in web development' },
          { type: 'output', content: 'Location: San Francisco, CA' },
          { type: 'output', content: 'Passion: Building the future, one line of code at a time.' }
        ]);
        break;
      case 'skills':
        setLines(prev => [...prev,
          { type: 'success', content: '=== Technical Skills ===' },
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
        ]);
        break;
      case 'projects':
        setLines(prev => [...prev,
          { type: 'success', content: '=== Portfolio Projects ===' },
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
        ]);
        break;
      case 'contact':
        setLines(prev => [...prev,
          { type: 'success', content: '=== Contact Information ===' },
          { type: 'output', content: '' },
          { type: 'info', content: 'Email: developer@example.com' },
          { type: 'info', content: 'LinkedIn: linkedin.com/in/yourprofile' },
          { type: 'info', content: 'GitHub: github.com/yourhandle' },
          { type: 'info', content: 'Portfolio: yourwebsite.com' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Feel free to reach out for collaborations or opportunities!' }
        ]);
        break;
      case 'whoami':
        setLines(prev => [...prev,
          { type: 'output', content: 'guest@portfolio:~$ whoami' },
          { type: 'success', content: 'You are browsing as: Visitor' },
          { type: 'output', content: 'Welcome to my terminal portfolio!' }
        ]);
        break;
      case 'clear':
        setLines([]);
        return;
      default:
        setLines(prev => [...prev, 
          { type: 'error', content: `Command not found: ${trimmedCommand}` },
          { type: 'output', content: 'Type "help" for available commands.' }
        ]);
    }

    // Add empty line for spacing
    setLines(prev => [...prev, { type: 'output', content: '' }]);
  };

  return (
    <div className="h-screen w-full bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-full max-h-[90vh] bg-terminal-bg border border-terminal-border rounded-lg shadow-2xl overflow-hidden">
        <TerminalHeader />
        <div 
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 font-mono text-sm relative"
        >
          <div className="terminal-scanline"></div>
          <TerminalOutput lines={lines} />
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