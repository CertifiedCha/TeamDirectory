import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ChevronLeft, ChevronRight, Star, Play, Pause } from 'lucide-react';
import { TeamMember } from '../data/teamMembers';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { cn } from './ui/utils';

interface TeamIntroductionProps {
  members: TeamMember[];
  onMemberClick: (member: TeamMember) => void;
}

// Dynamic content for the team section
const dynamicContent = [
  {
    headline: "Meet Ourr Team",
    description: "Talented individuals working together to create something extraordinary",
    image: "https://images.unsplash.com/photo-1700241956172-1045342673ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwY3JlYXRpdmUlMjB0ZWFtJTIwbWVldGluZyUyMGJyYWluc3Rvcm1pbmd8ZW58MXx8fHwxNzU1Nzk4NTAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    href: ""
  },
  {
    headline: "Check Out Our New Blogging Website",
    description: "Discover insights, tutorials, and stories from our development journey",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    href: ""
  },
  {
    headline: "Check Our Portfolios",
    description: "Explore our creative works, projects, and professional achievements",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    href: ""
  },
  {
    headline: "See Upcoming Features",
    description: "Get a sneak peek at exciting new features and innovations coming soon",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    href: ""
  }
];

export function TeamIntroduction({ members, onMemberClick }: TeamIntroductionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [contentIndex, setContentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isContentPaused, setIsContentPaused] = useState(false);

  const spotlightMembers = members.filter(member => member.spotlight);

  // Auto-rotate dynamic content
  useEffect(() => {
    if (isContentPaused) return;
    
    const contentInterval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setContentIndex((prev) => (prev + 1) % dynamicContent.length);
        setIsTransitioning(false);
      }, 400);
    }, 5000);

    return () => clearInterval(contentInterval);
  }, [isContentPaused]);

  useEffect(() => {
    if (!isAutoPlaying || spotlightMembers.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % spotlightMembers.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, spotlightMembers.length]);

  const goToNext = () => {
    if (spotlightMembers.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % spotlightMembers.length);
      setIsAutoPlaying(false);
    }
  };

  const goToPrevious = () => {
    if (spotlightMembers.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + spotlightMembers.length) % spotlightMembers.length);
      setIsAutoPlaying(false);
    }
  };

  const handleContentClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setContentIndex((prev) => (prev + 1) % dynamicContent.length);
      setIsTransitioning(false);
    }, 400);
  };

  const handleContentPause = () => {
    setIsContentPaused(!isContentPaused);
  };

  const currentContent = dynamicContent[contentIndex];

  if (spotlightMembers.length === 0) {
    return (
      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-card via-card to-card shadow-2xl border border-border/50 backdrop-blur-sm">
          {/* Simplified background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          
          <ImageWithFallback
            src={currentContent.image}
            alt={currentContent.headline}
            className={cn(
              "w-full h-96 object-cover transition-all duration-700",
              isTransitioning ? "scale-110 opacity-50 translate-x-8" : "scale-100 opacity-70 translate-x-0"
            )}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Interactive overlay */}
          <div 
            className="absolute inset-0 cursor-pointer group hover:bg-black/10 transition-colors duration-300"
            onClick={handleContentClick}
          />
          
          <div className={cn(
            "absolute bottom-8 left-8 right-8 text-center transition-all duration-700",
            isTransitioning ? "opacity-0 translate-x-12 translate-y-4" : "opacity-100 translate-x-0 translate-y-0"
          )}>
            <h2 className="font-display text-6xl font-bold text-white mb-4 tracking-tight">
              {currentContent.headline}
            </h2>
            <p className="text-white/90 font-light text-xl leading-relaxed max-w-3xl mx-auto">
              {currentContent.description}
            </p>
            
            {/* Control buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <div className="flex gap-2">
                {dynamicContent.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      index === contentIndex 
                        ? "bg-white w-8" 
                        : "bg-white/40 hover:bg-white/60"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setContentIndex(index);
                        setIsTransitioning(false);
                      }, 400);
                    }}
                  />
                ))}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleContentPause();
                }}
                className="ml-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300 backdrop-blur-sm"
              >
                {isContentPaused ? 
                  <Play className="h-3 w-3 text-white" /> : 
                  <Pause className="h-3 w-3 text-white" />
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentMember = spotlightMembers[currentIndex];

  return (
    <div className="mb-12">
      <div className="grid lg:grid-cols-4 gap-8 items-stretch">
        {/* Team Image - Left Side (3/4 - wider) */}
        <div className="lg:col-span-3">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-card via-card to-card shadow-2xl h-96 border border-border/50 backdrop-blur-sm group">
            {/* Simplified background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            
            <ImageWithFallback
              src={currentContent.image}
              alt={currentContent.headline}
              className={cn(
                "w-full h-full object-cover transition-all duration-700",
                isTransitioning ? "scale-110 opacity-50 translate-x-8" : "scale-100 opacity-70 translate-x-0"
              )}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Interactive overlay */}
            <div 
              className="absolute inset-0 cursor-pointer group hover:bg-black/10 transition-colors duration-300"
              onClick={handleContentClick}
            />
            
            <div className={cn(
              "absolute bottom-8 left-8 right-8 transition-all duration-700",
              isTransitioning ? "opacity-0 translate-x-12 translate-y-4" : "opacity-100 translate-x-0 translate-y-0"
            )}>
              <h2 className="font-display text-5xl font-bold text-white mb-3 tracking-tight">
                {currentContent.headline}
              </h2>
              <p className="text-white/90 font-light text-lg leading-relaxed max-w-2xl">
                {currentContent.description}
              </p>
              
              {/* Control buttons */}
              <div className="flex gap-4 mt-4">
                <div className="flex gap-2">
                  {dynamicContent.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        index === contentIndex 
                          ? "bg-white w-6" 
                          : "bg-white/40 hover:bg-white/60"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setContentIndex(index);
                          setIsTransitioning(false);
                        }, 400);
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleContentPause();
                  }}
                  className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300 backdrop-blur-sm"
                >
                  {isContentPaused ? 
                    <Play className="h-3 w-3 text-white" /> : 
                    <Pause className="h-3 w-3 text-white" />
                  }
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Spotlight Member - Right Side (1/4 - smaller) */}
        <div className="lg:col-span-1">
          <div className="h-96 flex flex-col">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card/95 to-card shadow-xl hover:shadow-2xl transition-all duration-500 flex-1 group cursor-pointer border border-border/50"
                 onClick={() => onMemberClick(currentMember)}>
              
              {/* Featured Member Label inside */}
              <div className="absolute top-3 left-3 z-20">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg backdrop-blur-sm">
                  <Star className="h-3 w-3 text-white animate-pulse" />
                  <span className="text-xs font-bold text-white tracking-wide">FEATURED</span>
                </div>
              </div>

              {/* Member Image */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={currentMember.photo}
                  alt={currentMember.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                
                {/* Navigation Controls - Fixed to work properly */}
                {spotlightMembers.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white dark:bg-black/90 dark:hover:bg-black opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110 active:scale-95 shadow-xl backdrop-blur-sm border border-white/20 z-30"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPrevious();
                      }}
                    >
                      <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white dark:bg-black/90 dark:hover:bg-black opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110 active:scale-95 shadow-xl backdrop-blur-sm border border-white/20 z-30"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToNext();
                      }}
                    >
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Member Info */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="font-display text-lg font-semibold text-white mb-1 tracking-tight line-clamp-1">
                    {currentMember.name}
                  </h4>
                  <p className="text-white/90 font-medium tracking-wide text-xs mb-2 line-clamp-1">
                    {currentMember.role}
                  </p>
                  <Badge 
                    variant={currentMember.available ? "default" : "secondary"}
                    className="bg-white/20 text-white border-white/30 font-medium tracking-wide text-xs hover:bg-white/30 transition-colors backdrop-blur-sm"
                  >
                    {currentMember.available ? "Available" : "Busy"}
                  </Badge>
                </div>
              </div>

              {/* Dots Indicator */}
              {spotlightMembers.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-30">
                  {spotlightMembers.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "w-1.5 h-1.5 rounded-full transition-all duration-300 hover:scale-125 backdrop-blur-sm",
                        index === currentIndex 
                          ? "bg-white shadow-lg w-4" 
                          : "bg-white/40 hover:bg-white/60"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex(index);
                        setIsAutoPlaying(false);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}