import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Sparkles, Zap, Waves, Cloud } from 'lucide-react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    // Check initial theme
    const darkMode = document.documentElement.classList.contains('dark');
    setIsDark(darkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Create ocean-themed explosion particles
    const newParticles = Array.from({ length: 16 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 300 - 150,
      y: Math.random() * 300 - 150,
    }));
    setParticles(newParticles);

    // Clear particles after animation
    setTimeout(() => setParticles([]), 2000);
  };

  return (
    <div className="relative">
      {/* Lighthouse Background Effect */}
      <motion.div
        className="absolute -top-20 -left-20 w-8 h-12 opacity-20"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className={`w-2 h-8 ${isDark ? 'bg-yellow-300' : 'bg-orange-400'} rounded-t-full mx-auto`} />
        <div className={`w-8 h-4 ${isDark ? 'bg-slate-600' : 'bg-red-400'} rounded-b-sm`} />
        {/* Lighthouse beam */}
        <motion.div
          className={`absolute top-0 left-1 w-1 h-40 ${isDark ? 'bg-yellow-200/30' : 'bg-orange-200/20'} rounded-full origin-bottom`}
          animate={{
            rotate: [-30, 30, -30],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: isDark 
              ? 'linear-gradient(to top, rgba(255, 255, 0, 0.3), transparent)' 
              : 'linear-gradient(to top, rgba(255, 165, 0, 0.2), transparent)'
          }}
        />
      </motion.div>

      {/* Floating Clouds */}
      <div className="absolute -top-10 -left-40 w-80 h-20 opacity-30 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${isDark ? 'text-slate-400' : 'text-blue-200'}`}
            style={{
              left: `${i * 60}px`,
              top: `${Math.sin(i) * 10}px`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          >
            <Cloud size={20 + i * 4} className="opacity-60" />
          </motion.div>
        ))}
      </div>

      {/* Main Toggle Button - Bigger and More Dynamic */}
      <motion.button
        onClick={toggleTheme}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative group"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Ocean Wave Base */}
        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-8 rounded-full"
          style={{
            background: isDark
              ? "radial-gradient(ellipse, rgba(59, 130, 246, 0.3) 0%, rgba(29, 78, 216, 0.2) 50%, transparent 100%)"
              : "radial-gradient(ellipse, rgba(0, 191, 255, 0.4) 0%, rgba(30, 144, 255, 0.3) 50%, transparent 100%)",
          }}
          animate={{
            scaleX: [0.8, 1.2, 0.8],
            scaleY: [0.6, 1, 0.6],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Outer Ring with Ocean Gradient */}
        <motion.div
          className="relative w-24 h-24 rounded-full p-1"
          style={{
            background: isDark
              ? "linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 60%, #475569 100%)"
              : "linear-gradient(135deg, #fef3c7 0%, #fbbf24 30%, #f59e0b 60%, #d97706 100%)",
          }}
          animate={{
            rotate: isDark ? 180 : 0,
            boxShadow: isDark
              ? "0 0 40px rgba(59, 130, 246, 0.6), 0 0 80px rgba(59, 130, 246, 0.3)"
              : "0 0 40px rgba(251, 191, 36, 0.8), 0 0 80px rgba(251, 191, 36, 0.4)",
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Inner Button */}
          <motion.div
            className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden"
            style={{
              background: isDark
                ? "radial-gradient(circle, #0f172a 30%, #1e293b 70%, #334155 100%)"
                : "radial-gradient(circle, #fef3c7 30%, #fde68a 70%, #fbbf24 100%)",
            }}
            animate={{
              boxShadow: isDark
                ? "inset 0 0 30px rgba(30, 64, 175, 0.5), 0 0 50px rgba(59, 130, 246, 0.4)"
                : "inset 0 0 30px rgba(217, 119, 6, 0.4), 0 0 50px rgba(251, 191, 36, 0.6)",
            }}
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0">
              {isDark ? (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Night Stars */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-blue-200 rounded-full"
                      style={{
                        left: `${15 + (i % 4) * 20}%`,
                        top: `${15 + Math.floor(i / 4) * 20}%`,
                      }}
                      animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [0.5, 1.2, 0.5],
                      }}
                      transition={{
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                  {/* Moonbeam effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "radial-gradient(circle at 30% 30%, rgba(191, 219, 254, 0.3) 0%, transparent 60%)",
                    }}
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Sun rays */}
                  {[...Array(16)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-5 bg-yellow-300 origin-bottom"
                      style={{
                        left: '50%',
                        bottom: '50%',
                        transformOrigin: '50% 100%',
                        transform: `translateX(-50%) rotate(${i * 22.5}deg)`,
                      }}
                      animate={{
                        scaleY: [0.6, 1.3, 0.6],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                  {/* Sun glow effect */}
                  <motion.div
                    className="absolute inset-2 rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(254, 240, 138, 0.6) 0%, transparent 70%)",
                    }}
                    animate={{
                      scale: [0.9, 1.1, 0.9],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              )}
            </div>

            {/* Main Icon - Bigger */}
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="moon"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
                  className="relative z-10"
                >
                  <Moon 
                    size={36} 
                    className="text-blue-100 drop-shadow-2xl" 
                    fill="currentColor"
                  />
                  {/* Moon craters */}
                  <div className="absolute top-2 left-2 w-1 h-1 bg-blue-300 rounded-full opacity-60" />
                  <div className="absolute top-4 right-3 w-0.5 h-0.5 bg-blue-300 rounded-full opacity-40" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -180 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
                  className="relative z-10"
                >
                  <Sun 
                    size={36} 
                    className="text-orange-500 drop-shadow-2xl" 
                    fill="currentColor"
                  />
                  {/* Sun center glow */}
                  <motion.div
                    className="absolute inset-2 bg-yellow-200 rounded-full opacity-60"
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Enhanced Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isHovered
              ? isDark
                ? "0 0 80px rgba(59, 130, 246, 0.9)"
                : "0 0 80px rgba(251, 191, 36, 0.9)"
              : "0 0 0px transparent",
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Ocean Waves Orbiting Elements */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 rounded-full"
                  style={{
                    background: isDark
                      ? "radial-gradient(circle, #3b82f6, #1d4ed8)"
                      : "radial-gradient(circle, #0ea5e9, #0284c7)",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: [0.7, 1, 0.7],
                    rotate: 360,
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    rotate: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.25,
                    },
                    scale: { duration: 0.4 },
                    opacity: { duration: 2, repeat: Infinity },
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                    transformOrigin: `${50 + i * 10}px center`,
                    marginLeft: "-8px",
                    marginTop: "-8px",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Ocean Wave Explosion Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-3 h-3 rounded-full pointer-events-none"
            style={{
              background: isDark
                ? "radial-gradient(circle, #3b82f6, #1e40af)"
                : "radial-gradient(circle, #0ea5e9, #0369a1)",
              left: "50%",
              top: "50%",
            }}
            initial={{
              scale: 0,
              x: 0,
              y: 0,
              opacity: 1,
            }}
            animate={{
              scale: [0, 1.5, 0],
              x: particle.x,
              y: particle.y,
              opacity: [1, 0.8, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        ))}
      </AnimatePresence>

      {/* Enhanced Magic Sparkles - Ocean Bubbles */}
      <AnimatePresence>
        {particles.length > 0 && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`bubble-${i}`}
                className="absolute pointer-events-none"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                initial={{
                  scale: 0,
                  rotate: 0,
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: 360,
                  x: (Math.random() * 200 - 100),
                  y: (Math.random() * 200 - 100),
                  opacity: [0, 1, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
              >
                <div 
                  className={`w-2 h-2 rounded-full ${isDark ? 'bg-blue-300' : 'bg-cyan-400'} opacity-70`}
                  style={{
                    boxShadow: isDark 
                      ? '0 0 8px rgba(147, 197, 253, 0.8)' 
                      : '0 0 8px rgba(34, 211, 238, 0.8)'
                  }}
                />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Ocean Power Aura Effect */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          background: particles.length > 0
            ? isDark
              ? "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(29, 78, 216, 0.2) 50%, transparent 80%)"
              : "radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, rgba(2, 132, 199, 0.2) 50%, transparent 80%)"
            : "transparent",
        }}
        transition={{ duration: 0.6 }}
      />
    </div>
  );
}