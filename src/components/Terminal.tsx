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
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [typingQueue, setTypingQueue] = useState<TerminalLine[]>([]);
  const [currentLine, setCurrentLine] = useState<TerminalLine | null>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentTheme, setCurrentTheme] = useState('matrix');
  const terminalRef = useRef<HTMLDivElement>(null);
  const prevLinesLength = useRef<number>(0);

  const themes = {
    matrix: { name: 'Matrix Green', class: 'theme-matrix' },
    cyberpunk: { name: 'Cyberpunk Purple', class: 'theme-cyberpunk' },
    retro: { name: 'Retro Amber', class: 'theme-retro' },
    ocean: { name: 'Ocean Blue', class: 'theme-ocean' }
  };

  useEffect(() => {
    // Simulate typing the 'welcome' command with typing effect
    setTimeout(() => {
      typeCommandWithEffect('welcome');
    }, 500);
  }, []);

  useEffect(() => {
    // Only scroll if lines have increased
    if (terminalRef.current && visibleLines.length > prevLinesLength.current) {
      const scrollElement = terminalRef.current;
      scrollElement.scrollTo({
        top: scrollElement.scrollHeight,
        behavior: 'smooth'
      });
    }
    prevLinesLength.current = visibleLines.length;
  }, [visibleLines]);

  // Simulate typing a command letter by letter, then show its output
  const typeCommandWithEffect = (cmd: string) => {
    let typed = '';
    const typeNext = (i: number) => {
      if (i <= cmd.length) {
        setVisibleLines(prev => [
          ...prev.slice(0, -1),
          { type: 'command', content: `visitor@portfolio:~$ ${typed}` }
        ]);
        if (i < cmd.length) {
          setTimeout(() => typeNext(i + 1), 80);
          typed = cmd.slice(0, i + 1);
        } else {
          setTimeout(() => {
            // Add ASCII art instantly without typing effect
            setVisibleLines(prev => [
              ...prev,
              { type: 'output', content: '' },
              { type: 'output', content: '███████╗ █████╗ ███╗   ███╗██████╗  █████╗ ██████╗' },
              { type: 'output', content: '██╔════╝██╔══██╗████╗ ████║██╔══██╗██╔══██╗██╔══██╗' },
              { type: 'output', content: '███████╗███████║██╔████╔██║██████╔╝███████║██║  ██║' },
              { type: 'output', content: '╚════██║██╔══██║██║╚██╔╝██║██╔═══╝ ██╔══██║██║  ██║' },
              { type: 'output', content: '███████║██║  ██║██║ ╚═╝ ██║██║     ██║  ██║██████╔╝' },
              { type: 'output', content: '╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝     ╚═╝  ╚═╝╚═════╝' },
              { type: 'output', content: '' },
              { type: 'output', content: ' ██████╗  ██████╗ ██████╗  █████╗ ██╗' },
              { type: 'output', content: '██╔════╝ ██╔═══██╗██╔══██╗██╔══██╗██║' },
              { type: 'output', content: '██║  ███╗██║   ██║██████╔╝███████║██║' },
              { type: 'output', content: '██║   ██║██║   ██║██╔══██╗██╔══██║██║' },
              { type: 'output', content: '╚██████╔╝╚██████╔╝██║  ██║██║  ██║██║' },
              { type: 'output', content: '╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝' },
              { type: 'output', content: '' },
              { type: 'output', content: 'BTech CSE Student | Passionate Developer' },
              { type: 'output', content: '' }
            ]);
            // Then start typing the welcome message
            setTypingQueue([
              { type: 'output', content: 'Welcome to my interactive portfolio terminal!' },
              { type: 'output', content: 'Type "help" to explore available commands.' }
            ]);
            setCurrentLine({ type: 'output', content: 'Welcome to my interactive portfolio terminal!' });
          }, 300);
        }
      }
    };
    // Add a blank command line to start typing into
    setVisibleLines(prev => [...prev, { type: 'command', content: 'visitor@portfolio:~$ ' }]);
    typeNext(0);
  };

  const executeCommand = (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();

    if (trimmedCommand && !commandHistory.includes(trimmedCommand)) {
      setCommandHistory(prev => [...prev, trimmedCommand]);
    }
    setHistoryIndex(-1);

    // Add command to output
    const commandLine: TerminalLine = { type: 'command', content: `visitor@portfolio:~$ ${command}` };
    setVisibleLines(prev => [...prev, commandLine]);

    // Prepare response lines
    let responseLines: TerminalLine[] = [];
    switch (trimmedCommand) {
      case '':
        responseLines = [];
        break;
      case 'help':
        responseLines = [
          { type: 'info', content: 'Available Commands:' },
          { type: 'output', content: '  help           - Show this help message' },
          { type: 'output', content: '  about          - About me' },
          { type: 'output', content: '  skills         - Technical skills' },
          { type: 'output', content: '  education      - Educational background' },
          { type: 'output', content: '  certifications - Certifications' },
          { type: 'output', content: '  projects       - Portfolio projects' },
          { type: 'output', content: '  contact        - Contact information' },
          { type: 'output', content: '  themes         - Available themes' },
          { type: 'output', content: '  clear          - Clear terminal' },
          { type: 'output', content: '  whoami         - Current user info' }
        ];
        break;
      case 'about':
        responseLines = [
          { type: 'success', content: 'About Me' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Hello! I\'m Sampad Gorai, a passionate Computer Science student' },
          { type: 'output', content: 'currently pursuing BTech in CSE from RCC Institute of Information Technology.' },
          { type: 'output', content: '' },
          { type: 'output', content: 'My main focus areas in CSE are Digital Logic and Data Structures & Algorithms.' },
          { type: 'output', content: 'I\'m also actively exploring different sections of Computer Science & Engineering.' },
          { type: 'output', content: '' },
          { type: 'output', content: 'I love exploring new technologies and building innovative solutions.' },
          { type: 'output', content: 'My passion lies in web development and creating user-friendly applications.' },
          { type: 'output', content: '' },
          { type: 'info', content: 'Education: BTech in Computer Science & Engineering' },
          { type: 'info', content: 'Institution: RCC Institute of Information Technology' },
          { type: 'info', content: 'Focus Areas: Digital Logic, Data Structures & Algorithms' },
          { type: 'info', content: 'Passion: Building the future, one line of code at a time' }
        ];
        break;
      case 'skills':
        responseLines = [
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
      case 'education':
        responseLines = [
          { type: 'success', content: 'Educational Background' },
          { type: 'output', content: '' },
          { type: 'info', content: 'Bachelor of Technology (BTech)' },
          { type: 'output', content: '  • Computer Science & Engineering' },
          { type: 'output', content: '  • RCC Institute of Information Technology' },
          { type: 'output', content: '  • Current Year: 2nd Year' },
          { type: 'output', content: '' },
          { type: 'info', content: 'Higher Secondary Education (12th)' },
          { type: 'output', content: '  • Nava Nalanda High School, Kolkata' },
          { type: 'output', content: '  • Year: 2024' },
          { type: 'output', content: '' },
          { type: 'info', content: 'Secondary Education (10th)' },
          { type: 'output', content: '  • Nava Nalanda High School, Kolkata' },
          { type: 'output', content: '  • Year: 2022' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Academic Achievements:' },
          { type: 'info', content: '  • Active participation in coding competitions' },
          { type: 'info', content: '  • Exploring various Computer Science domains' },
          { type: 'info', content: '  • Passionate about web development and innovation' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Key Focus Areas:' },
          { type: 'info', content: '  ✓ Digital Logic Design' },
          { type: 'info', content: '  ✓ Data Structures & Algorithms' },
          { type: 'info', content: '  ✓ Computer Architecture' },
          { type: 'info', content: '  ✓ Database Management Systems' },
        ];
        break;
      case 'certifications':
        responseLines = [
          { type: 'success', content: 'Certifications' },
          { type: 'output', content: '' },
          { type: 'info', content: 'No certifications added yet.' },
          { type: 'output', content: '' },
          { type: 'output', content: 'You can update this section later.' }
        ];
        break;
      case 'projects':
        responseLines = [
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
        responseLines = [
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
        responseLines = [
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
        responseLines = [
          { type: 'success', content: 'You are browsing as: Visitor' },
          { type: 'output', content: 'Welcome to my terminal portfolio!' }
        ];
        break;
      case 'clear':
        setVisibleLines([]);
        setTypingQueue([]);
        setCurrentLine(null);
        return;
      default:
        if (trimmedCommand.startsWith('theme ')) {
          const themeName = trimmedCommand.split(' ')[1];
          if (themes[themeName as keyof typeof themes]) {
            setCurrentTheme(themeName);
            responseLines = [
              { type: 'success', content: `Theme changed to: ${themes[themeName as keyof typeof themes].name}` }
            ];
          } else {
            responseLines = [
              { type: 'error', content: `❌ Theme not found: ${themeName}` },
              { type: 'output', content: 'Available themes: ' + Object.keys(themes).join(', ') }
            ];
          }
        } else {
          responseLines = [
            { type: 'error', content: `❌ Command not found: ${trimmedCommand}` },
            { type: 'output', content: '💡 Type "help" for available commands.' }
          ];
        }
    }

    if (responseLines.length > 0) {
      setTypingQueue(responseLines);
      setCurrentLine(responseLines[0]);
    }
  };

  const handleLineComplete = () => {
    if (!currentLine) return;
    setVisibleLines(prev => [...prev, currentLine]);
    if (typingQueue.length > 1) {
      setTypingQueue(queue => queue.slice(1));
      setCurrentLine(typingQueue[1]);
    } else {
      setTypingQueue([]);
      setCurrentLine(null);
    }
  };

  return (
    <div className="h-screen w-full bg-background flex items-center justify-center p-4">
      <div className={`w-full max-w-6xl h-full max-h-[90vh] bg-terminal-bg border-2 border-terminal-border rounded-lg shadow overflow-hidden flex flex-col ${themes[currentTheme as keyof typeof themes]?.class || ''}`}> 
        <TerminalHeader />
        <div 
          ref={terminalRef}
          className="flex-1 min-h-0 overflow-y-auto p-4 font-mono text-base relative scroll-smooth"
          style={{ 
            scrollbarWidth: 'thin',
            scrollbarColor: 'hsl(var(--terminal-border)) transparent',
            maxHeight: 'calc(90vh - 60px)'
          }}
        >
          <div className="terminal-scanline"></div>
          <TerminalOutput 
            lines={visibleLines} 
            currentLine={currentLine}
            onLineComplete={handleLineComplete}
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