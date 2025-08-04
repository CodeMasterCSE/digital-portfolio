import React, { useState, useEffect } from 'react';
import { TerminalHeader } from './TerminalHeader';

interface TerminalLoaderProps {
  onComplete: () => void;
}

const steps = [
  { message: "Initializing terminal...", delay: 800 },
  { message: "Connecting to Portfolio server...", delay: 1200 },
  { message: "Loading Portfolio data...", delay: 1000 },
  { message: "Connection established", delay: 600 },
  { message: "Ready to launch...", delay: 500 }
];

const TerminalLoader: React.FC<TerminalLoaderProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (currentStep >= steps.length) {
      // All steps completed, fade out and launch main terminal
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 300); // Wait for fade out animation
      }, 800);
      return;
    }

    const currentMessage = steps[currentStep].message;
    setIsTyping(true);
    setDisplayText('');

    // Type out the current message
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < currentMessage.length) {
        setDisplayText(currentMessage.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        
        // Wait for the specified delay, then move to next step
        setTimeout(() => {
          setCurrentStep(currentStep + 1);
        }, steps[currentStep].delay);
      }
    }, 50); // Type speed: 50ms per character

    return () => clearInterval(typeInterval);
  }, [currentStep, onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
             <div className="w-96 h-32 bg-terminal-bg border-2 border-terminal-border rounded-lg shadow overflow-hidden animate-in fade-in duration-300">
        <TerminalHeader showDateTime={false} />
        <div className="flex-1 p-4 font-mono text-sm relative">
          <div className="terminal-scanline"></div>
          <div className="text-terminal-text">
            <span className="text-terminal-prompt">$</span>
            <span className="ml-2">{displayText}</span>
            {isTyping && <span className="ml-1 terminal-cursor">|</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalLoader; 