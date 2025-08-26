import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Users, Briefcase, PenTool, Code } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from './ui/utils';

interface PanoramicViewerProps {
  isOpen: boolean;
  onClose: () => void;
  currentGroup: TeamGroup;
  onGroupChange: (group: TeamGroup) => void;
  groups: TeamGroup[];
}

export interface TeamGroup {
  id: string;
  name: string;
  description: string;
  panoramicImage: string;
  icon: any;
  memberCount: number;
  color: string;
}

export function PanoramicViewer({ 
  isOpen, 
  onClose, 
  currentGroup, 
  onGroupChange, 
  groups 
}: PanoramicViewerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setRotation(prev => ({
      x: Math.max(-30, Math.min(30, prev.x - deltaY * 0.1)),
      y: prev.y + deltaX * 0.2
    }));
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStart.x;
    const deltaY = touch.clientY - dragStart.y;
    
    setRotation(prev => ({
      x: Math.max(-30, Math.min(30, prev.x - deltaY * 0.1)),
      y: prev.y + deltaX * 0.2
    }));
    
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Reset rotation when group changes
  useEffect(() => {
    setRotation({ x: 0, y: 0 });
  }, [currentGroup.id]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const currentIndex = groups.findIndex(g => g.id === currentGroup.id);
  
  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % groups.length;
    onGroupChange(groups[nextIndex]);
  };
  
  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + groups.length) % groups.length;
    onGroupChange(groups[prevIndex]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full h-full max-w-7xl max-h-[90vh] bg-background rounded-2xl overflow-hidden shadow-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 to-transparent p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl ${currentGroup.color} shadow-lg`}>
                    <currentGroup.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white mb-1">
                      {currentGroup.name}
                    </h2>
                    <p className="text-white/80 text-sm">
                      {currentGroup.description}
                    </p>
                  </div>
                  <Badge className="bg-white/20 text-white border-white/30 ml-2">
                    {currentGroup.memberCount} members
                  </Badge>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute top-1/2 left-4 -translate-y-1/2 z-30">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="absolute top-1/2 right-4 -translate-y-1/2 z-30">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* 3D Panoramic Image Container */}
            <div 
              ref={containerRef}
              className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <motion.div
                className="absolute inset-0 w-[200%] h-full"
                style={{
                  perspective: "1000px",
                }}
                animate={{
                  rotateY: rotation.y,
                  rotateX: rotation.x,
                }}
                transition={{
                  type: "tween",
                  duration: isDragging ? 0 : 0.3,
                  ease: "easeOut"
                }}
              >
                <img
                  ref={imageRef}
                  src={currentGroup.panoramicImage}
                  alt={`${currentGroup.name} workspace`}
                  className="w-full h-full object-cover"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  draggable={false}
                />
                
                {/* 3D Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
              </motion.div>

              {/* Floating particles for ambiance */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/20 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.2, 0.6, 0.2],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Navigation Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                {groups.map((group, index) => (
                  <button
                    key={group.id}
                    onClick={() => onGroupChange(group)}
                    className={cn(
                      "relative p-2 rounded-full transition-all duration-300 group",
                      index === currentIndex 
                        ? "bg-white/20 scale-110" 
                        : "hover:bg-white/10 hover:scale-105"
                    )}
                  >
                    <group.icon 
                      className={cn(
                        "h-4 w-4 transition-colors duration-300",
                        index === currentIndex ? "text-white" : "text-white/60 group-hover:text-white/80"
                      )} 
                    />
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {group.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-6 right-6 z-30">
              <div className="bg-black/40 backdrop-blur-md rounded-lg px-3 py-2 border border-white/20">
                <p className="text-white/70 text-sm">
                  Drag to explore • Use arrows to navigate
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}