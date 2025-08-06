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

  const projects = [
    {
      title: "Interactive Terminal Portfolio",
      description: "A modern terminal-style portfolio website built with React and TypeScript. Features command-line interface, typing animations, and multiple themes for an engaging user experience.",
      githubLink: "https://github.com/CodeMasterCSE/terminal-portfolio",
      deployedLink: "https://terminal-portfolio.vercel.app",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"]
    },
    {
      title: "My Digital Space",
      description: "A comprehensive GUI portfolio showcasing my projects, skills, and achievements. Features responsive design, modern UI/UX, and interactive elements.",
      githubLink: "https://github.com/CodeMasterCSE/my-digital-space",
      deployedLink: "https://codemastercse.github.io/my-digital-space/",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"]
    }
  ];

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
              { type: 'output', content: 'BTech CSE Student | RCC Institute of Information Technology' },
              { type: 'output', content: '' }
            ]);
            // Then start typing the welcome message
            setTypingQueue([
              { type: 'output', content: 'Welcome to my interactive Portfolio Terminal!' },
              { type: 'output', content: 'Type "help" to explore available commands.' }
            ]);
            setCurrentLine({ type: 'output', content: 'Welcome to my interactive Portfolio Terminal!' });
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
           { type: 'output', content: '  gui            - View GUI version of portfolio' },
           { type: 'output', content: '  contact        - Contact information' },
           { type: 'output', content: '  email          - Send me an email' },
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
        ];
        break;
      case 'skills':
        responseLines = [
          { type: 'success', content: 'Technical Skills' },
          { type: 'output', content: '' },
          { type: 'info', content: 'Will be added soon...' },
          { type: 'output', content: '' },
          { type: 'output', content: 'This section will showcase my technical skills and expertise.' }
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
          { type: 'info', content: 'Will be added soon...' },
          { type: 'output', content: '' },
          { type: 'output', content: 'This section will display my professional certifications and achievements.' }
        ];
        break;
      case 'projects':
        responseLines = [
          { type: 'success', content: 'Portfolio Projects' },
          { type: 'output', content: '' },
          { type: 'info', content: '> Project 1: Interactive Terminal Portfolio' },
          { type: 'output', content: 'A modern terminal-style portfolio website built with React and TypeScript.' },
          { type: 'output', content: 'Features command-line interface, typing animations, and multiple themes for an engaging user experience.' },
          { type: 'output', content: 'Technologies: React, TypeScript, Tailwind CSS, Vite' },
          { type: 'output', content: '[git] GitHub: https://github.com/CodeMasterCSE/terminal-portfolio' },
          { type: 'output', content: '[web] Live Demo: https://terminal-portfolio.vercel.app' },
          { type: 'output', content: '' },
          { type: 'info', content: '> Project 2: My Digital Space' },
          { type: 'output', content: 'A comprehensive GUI portfolio showcasing my projects, skills, and achievements.' },
          { type: 'output', content: 'Features responsive design, modern UI/UX, and interactive elements.' },
          { type: 'output', content: 'Technologies: HTML, CSS, JavaScript, Bootstrap' },
          { type: 'output', content: '[git] GitHub: https://github.com/CodeMasterCSE/my-digital-space' },
          { type: 'output', content: '[web] Live Demo: https://codemastercse.github.io/my-digital-space/' },
          { type: 'output', content: '' }
        ];
        break;
      case 'gui':
        responseLines = [
          { type: 'success', content: 'Opening GUI Portfolio...' },
          { type: 'output', content: 'Launching in new tab...' }
        ];
        // Open the GUI portfolio in a new tab after showing output
        setTimeout(() => {
          window.open('https://codemastercse.github.io/my-digital-space/', '_blank');
        }, 1500);
        break;
      case 'email':
        responseLines = [
          { type: 'success', content: 'Opening Email Client...' }
        ];
        // Open email client immediately
        window.open('mailto:sampad.sg.cse@gmail.com', '_blank');
        break;
      case 'contact':
        responseLines = [
          { type: 'success', content: 'Contact Information' },
          { type: 'output', content: '' },
          { type: 'info', content: 'Email: sampad.sg.cse@gmail.com' },
          { type: 'info', content: 'LinkedIn: linkedin.com/in/sampadgorai' },
          { type: 'info', content: 'GitHub: github.com/CodeMasterCSE' },
          { type: 'info', content: 'Portfolio: https://sampadgorai.vercel.app/' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Feel free to reach out for collaborations or opportunities!' }
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
         responseLines = [
           { type: 'error', content: `❌ Command not found: ${trimmedCommand}` },
           { type: 'output', content: '💡 Type "help" for available commands.' }
         ];
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