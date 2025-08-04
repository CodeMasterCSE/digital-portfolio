import { useState } from 'react';
import Terminal from '@/components/Terminal';
import TerminalLoader from '@/components/TerminalLoader';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <TerminalLoader onComplete={handleLoadingComplete} />}
      {!isLoading && <Terminal />}
    </>
  );
};

export default Index;
