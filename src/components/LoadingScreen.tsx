import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

// Animated Dolphin SVG Component
const DolphinIcon = () => (
  <motion.svg
    width="120"
    height="80"
    viewBox="0 0 120 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    animate={{
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {/* Dolphin Body */}
    <motion.path
      d="M20 40C20 40 30 25 50 30C70 35 85 40 95 45C100 47 105 50 100 55C95 60 80 58 65 55C50 52 35 50 25 52C20 53 18 48 20 40Z"
      fill="url(#dolphinGradient)"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
    
    {/* Dolphin Tail */}
    <motion.path
      d="M95 45C100 40 105 35 110 40C115 45 110 50 105 52C100 50 95 47 95 45Z"
      fill="url(#dolphinGradient)"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    />
    
    {/* Dolphin Fin */}
    <motion.path
      d="M45 25C50 20 55 25 50 30C45 32 40 30 45 25Z"
      fill="url(#dolphinGradient)"
      initial={{ rotate: -45 }}
      animate={{ rotate: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    />
    
    {/* Eye */}
    <motion.circle
      cx="35"
      cy="35"
      r="3"
      fill="#1a242f"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
    />
    
    {/* Eye shine */}
    <motion.circle
      cx="36"
      cy="34"
      r="1"
      fill="white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.3 }}
    />
    
    {/* Water bubbles */}
    <motion.g>
      {[...Array(6)].map((_, i) => (
        <motion.circle
          key={i}
          cx={15 + i * 15}
          cy={60 + Math.sin(i) * 5}
          r="2"
          fill="rgba(33, 150, 243, 0.6)"
          animate={{
            y: [-20, -40, -20],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.g>
    
    {/* Gradient Definition */}
    <defs>
      <linearGradient id="dolphinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2196f3" />
        <stop offset="50%" stopColor="#00bfff" />
        <stop offset="100%" stopColor="#87ceeb" />
      </linearGradient>
    </defs>
  </motion.svg>
);

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showDolphin, setShowDolphin] = useState(false);

  useEffect(() => {
    // Start showing dolphin after a brief delay
    const dolphinTimer = setTimeout(() => {
      setShowDolphin(true);
    }, 300);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Complete loading after progress bar finishes
          setTimeout(() => {
            onLoadingComplete();
          }, 800);
          return 100;
        }
        // Randomize progress increments for more realistic feel
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => {
      clearTimeout(dolphinTimer);
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-accent/5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Dolphin Icon */}
        <AnimatePresence>
          {showDolphin && (
            <motion.div
              initial={{ scale: 0, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 20,
                delay: 0.2 
              }}
              className="mb-12"
            >
              <div className="relative">
                {/* Glow effect behind dolphin */}
                <div className="absolute inset-0 blur-xl bg-primary/30 scale-150 animate-pulse" />
                <DolphinIcon />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2">
            Loading Team Directory
          </h2>
          <motion.p
            className="text-muted-foreground"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Preparing your team experience...
          </motion.p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "300px" }}
          transition={{ delay: 1, duration: 0.8 }}
          className="relative w-[300px] h-2 bg-muted rounded-full overflow-hidden"
        >
          {/* Progress Fill */}
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary via-accent to-secondary rounded-full"
            style={{ 
              width: `${progress}%`,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          
          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ["-100%", "300px"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Progress Percentage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-4 text-sm font-medium text-primary"
        >
          {Math.round(progress)}%
        </motion.div>
      </div>

      {/* Bottom Wave Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <motion.svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,60 C300,100 600,20 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z"
            fill="url(#waveGradient)"
            animate={{
              d: [
                "M0,60 C300,100 600,20 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z",
                "M0,80 C300,40 600,100 900,80 C1050,60 1150,80 1200,80 L1200,120 L0,120 Z",
                "M0,60 C300,100 600,20 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z",
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(33, 150, 243, 0.3)" />
              <stop offset="100%" stopColor="rgba(33, 150, 243, 0.1)" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    </motion.div>
  );
}