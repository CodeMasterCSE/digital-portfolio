import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  renderContent?: (text: string) => React.ReactNode;
}

export const TypingText: React.FC<TypingTextProps> = ({ 
  text, 
  speed = 30, 
  className = '', 
  onComplete,
  renderContent 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  return (
    <span className={`${className} whitespace-pre-wrap`}>
      {renderContent ? renderContent(displayedText) : displayedText}
      {currentIndex < text.length && (
        <span className="text-terminal-cursor animate-pulse">█</span>
      )}
    </span>
  );
};