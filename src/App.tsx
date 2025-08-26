import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { TeamDirectory } from './components/TeamDirectory';
import { LoadingScreen } from './components/LoadingScreen';
import { teamMembers } from './data/teamMembers';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Set dark mode as default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen 
          key="loading"
          onLoadingComplete={handleLoadingComplete} 
        />
      ) : (
        <TeamDirectory 
          key="app"
          members={teamMembers} 
        />
      )}
    </AnimatePresence>
  );
}