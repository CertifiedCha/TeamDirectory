import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Briefcase, PenTool, Code, Eye, ChevronRight, Sparkles, Star, X, ChevronLeft, Play, Pause } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { PanoramicViewer, TeamGroup } from './PanoramicViewer';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TeamMember } from '../data/teamMembers';
import { cn } from './ui/utils';
import meetteam from "./Teampictures/IMG_1931.jpg"
import designers from "./Teampictures/Artists.jpg"
import bloggers from "./Teampictures/Bloggers.jpg"
import developers from "./Teampictures/Developers.jpg"

interface EnhancedSpotlightSectionProps {
  members: TeamMember[];
  onMemberClick: (member: TeamMember) => void;
}

// Define team groups with panoramic images
const teamGroups: TeamGroup[] = [
  {
    id: 'overview',
    name: 'MEET OUR TEAM',
    description: 'Talented individuals working together to create something extraordinary',
    panoramicImage: meetteam,
    icon: Users,
    memberCount: 0, // Will be calculated
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500'
  },
  {
    id: 'designers',
    name: 'Design Team',
    description: 'Creative minds crafting beautiful and intuitive user experiences',
    panoramicImage: designers,
    icon: PenTool,
    memberCount: 0,
    color: 'bg-gradient-to-br from-purple-500 to-pink-500'
  }
];

// Map departments to groups (simplified)
const departmentGroupMap: Record<string, string> = {
  'Engineering': 'developers',
  'Product': 'developers',
  'Analytics': 'developers',
  'Data': 'developers',
  'Design': 'designers',
  'Marketing': 'writers',
  'Sales': 'writers'
};

const additionalCards = [
  {
    id: 'blog',
    title: 'Writers!',
    description: 'Discover insights, tutorials, and stories from our development journey',
    image: bloggers,
    href: '#',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'portfolio',
    title: 'Developers',
    description: 'Explore our creative works, projects, and professional achievements',
    image: developers,
    href: '#',
    color: 'from-violet-500 to-purple-500'
  },
  {
    id: 'features',
    title: 'See Upcoming Features',
    description: 'Get a sneak peek at exciting new features and innovations coming soon',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    href: '#',
    color: 'from-emerald-500 to-teal-500'
  }
];

// Dynamic skill badge colors
const skillBadgeColors = [
  'bg-red-500/30 text-red-100 border-red-400/40',
  'bg-blue-500/30 text-blue-100 border-blue-400/40',
  'bg-green-500/30 text-green-100 border-green-400/40',
  'bg-yellow-500/30 text-yellow-100 border-yellow-400/40',
  'bg-purple-500/30 text-purple-100 border-purple-400/40',
  'bg-pink-500/30 text-pink-100 border-pink-400/40',
  'bg-indigo-500/30 text-indigo-100 border-indigo-400/40',
  'bg-teal-500/30 text-teal-100 border-teal-400/40',
  'bg-orange-500/30 text-orange-100 border-orange-400/40',
  'bg-cyan-500/30 text-cyan-100 border-cyan-400/40',
  'bg-emerald-500/30 text-emerald-100 border-emerald-400/40',
  'bg-violet-500/30 text-violet-100 border-violet-400/40',
  'bg-rose-500/30 text-rose-100 border-rose-400/40',
  'bg-sky-500/30 text-sky-100 border-sky-400/40',
  'bg-lime-500/30 text-lime-100 border-lime-400/40'
];

// Function to get consistent color for a skill
const getSkillBadgeColor = (skill: string, index: number) => {
  // Use both skill name and index to ensure consistency while having variety
  const colorIndex = (skill.length + index) % skillBadgeColors.length;
  return skillBadgeColors[colorIndex];
};

export function EnhancedSpotlightSection({ members, onMemberClick }: EnhancedSpotlightSectionProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isExpandedView, setIsExpandedView] = useState(false);
  const [isSpotlightCarousel, setIsSpotlightCarousel] = useState(false);
  const [currentSpotlightIndex, setCurrentSpotlightIndex] = useState(0);
  const [isContentPaused, setIsContentPaused] = useState(false);
  const [isSpotlightPaused, setIsSpotlightPaused] = useState(false);
  const [memberTransitionDirection, setMemberTransitionDirection] = useState<'left' | 'right' | 'none'>('none');

  // Calculate member counts for each group
  const groupsWithCounts = teamGroups.map(group => {
    let memberCount = 0;
    if (group.id === 'overview') {
      memberCount = members.length;
    } else {
      memberCount = members.filter(member => 
        departmentGroupMap[member.department] === group.id
      ).length;
    }
    return { ...group, memberCount };
  });

  // All cards including team groups and additional cards
  const allCards = [...groupsWithCounts, ...additionalCards.map(card => ({
    id: card.id,
    name: card.title,
    description: card.description,
    panoramicImage: card.image,
    icon: Sparkles,
    memberCount: 0,
    color: `bg-gradient-to-br ${card.color}`,
    title: card.title,
    image: card.image,
    href: card.href
  }))];

  // Get spotlight members for expanded view
  const spotlightMembers = members.filter(member => member.spotlight);

  // Enhanced auto-rotate cards with different timing
  useEffect(() => {
    if (isContentPaused || isExpandedView || isSpotlightCarousel) return;
    
    const currentCard = allCards[currentCardIndex];
    const isMainCard = currentCard.id === 'overview';
    const duration = isMainCard ? 10000 : 5000; // 10s for main card, 5s for others
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentCardIndex((prev) => (prev + 1) % allCards.length);
        setIsTransitioning(false);
      }, 400);
    }, duration);

    return () => clearInterval(interval);
  }, [isContentPaused, allCards.length, currentCardIndex, isExpandedView, isSpotlightCarousel]);

  // Auto-rotate spotlight members when in carousel mode
  useEffect(() => {
    if (!isSpotlightCarousel || isSpotlightPaused) return;
    
    const interval = setInterval(() => {
      setMemberTransitionDirection('right');
      setTimeout(() => {
        setCurrentSpotlightIndex((prev) => (prev + 1) % spotlightMembers.length);
        setMemberTransitionDirection('none');
      }, 150);
    }, 4000);

    return () => clearInterval(interval);
  }, [isSpotlightCarousel, isSpotlightPaused, spotlightMembers.length]);

  const currentCard = allCards[currentCardIndex];
  const isTeamGroup = teamGroups.some(group => group.id === currentCard.id);

  const handleCardClick = () => {
    if (isTeamGroup) {
      if (currentCard.id === 'overview') {
        // Show expanded member view
        setIsExpandedView(true);
      }
    }
  };

  const handleViewAllMembers = () => {
    setIsExpandedView(true);
  };

  const handleSpotlightThumbnailClick = (memberIndex: number) => {
    // Reset any previous state to ensure infinite clicking works
    setIsSpotlightPaused(false);
    setMemberTransitionDirection('none');
    
    // Set new state
    setCurrentSpotlightIndex(memberIndex);
    setIsSpotlightCarousel(true);
    
    // Add a small delay to ensure state updates properly
    setTimeout(() => {
      setMemberTransitionDirection('none');
    }, 100);
  };

  const goToCard = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentCardIndex(index);
      setIsTransitioning(false);
    }, 400);
  };

  const goToNextCard = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % allCards.length);
      setIsTransitioning(false);
    }, 400);
  };

  const goToPreviousSpotlight = () => {
    setMemberTransitionDirection('left');
    setTimeout(() => {
      setCurrentSpotlightIndex((prev) => (prev - 1 + spotlightMembers.length) % spotlightMembers.length);
      setMemberTransitionDirection('none');
    }, 150);
  };

  const goToNextSpotlight = () => {
    setMemberTransitionDirection('right');
    setTimeout(() => {
      setCurrentSpotlightIndex((prev) => (prev + 1) % spotlightMembers.length);
      setMemberTransitionDirection('none');
    }, 150);
  };

  const goToSpotlightMember = (index: number) => {
    if (index === currentSpotlightIndex) return;
    
    setMemberTransitionDirection(index > currentSpotlightIndex ? 'right' : 'left');
    setTimeout(() => {
      setCurrentSpotlightIndex(index);
      setMemberTransitionDirection('none');
    }, 150);
  };

  // Dynamic transition variants for member changes
  const memberVariants = {
    enter: (direction: 'left' | 'right' | 'none') => ({
      x: direction === 'left' ? -300 : direction === 'right' ? 300 : 0,
      opacity: 0,
      scale: 0.8,
      rotateY: direction === 'left' ? -45 : direction === 'right' ? 45 : 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: 'left' | 'right' | 'none') => ({
      x: direction === 'left' ? 300 : direction === 'right' ? -300 : 0,
      opacity: 0,
      scale: 0.8,
      rotateY: direction === 'left' ? 45 : direction === 'right' ? -45 : 0,
    }),
  };

  return (
    <>
      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-border/50 backdrop-blur-sm group">
          {/* Background Image with dynamic transitions */}
          <div className="relative h-96 overflow-hidden">
            <AnimatePresence mode="wait" custom={memberTransitionDirection}>
              <motion.div
                key={isSpotlightCarousel ? `spotlight-${currentSpotlightIndex}` : `card-${currentCardIndex}`}
                custom={memberTransitionDirection}
                variants={memberVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.5
                }}
                className="absolute inset-0"
              >
                <ImageWithFallback
                  src={isSpotlightCarousel ? spotlightMembers[currentSpotlightIndex].photo : (currentCard.panoramicImage || currentCard.image)}
                  alt={isSpotlightCarousel ? spotlightMembers[currentSpotlightIndex].name : (currentCard.name || currentCard.title)}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <motion.div 
              className={cn(
                "absolute inset-0 opacity-20 transition-opacity duration-700",
                isSpotlightCarousel ? 'bg-gradient-to-br from-purple-500 to-pink-500' : (currentCard.color || 'bg-gradient-to-br from-blue-500 to-cyan-500')
              )}
              animate={{
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Interactive overlay for team groups */}
            {(isTeamGroup && !isSpotlightCarousel) && (
              <motion.div 
                className="absolute inset-0 cursor-pointer hover:bg-black/10 transition-colors duration-300"
                onClick={handleCardClick}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
          </div>

          {/* Content with enhanced animations */}
          <div className="absolute inset-x-0 top-0 bottom-20 flex items-center justify-center">
            <div className="text-center px-8">
              <AnimatePresence mode="wait" custom={memberTransitionDirection}>
                <motion.div
                  key={isSpotlightCarousel ? `content-${currentSpotlightIndex}` : `content-${currentCardIndex}`}
                  custom={memberTransitionDirection}
                  variants={memberVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    duration: 0.6,
                    delay: 0.1
                  }}
                >
                  {isSpotlightCarousel ? (
                    // Enhanced Spotlight Member Content
                    <>
                      <motion.div 
                        className="flex items-center justify-center gap-4 mb-6"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="p-4 rounded-xl shadow-lg bg-gradient-to-br from-purple-500 to-pink-500">
                          <Star className="h-8 w-8 text-white" />
                        </div>
                      </motion.div>
                      
                      <motion.h2
                        className="font-display text-6xl font-bold text-white mb-4 tracking-tight"
                        animate={{
                          textShadow: [
                            "0 0 30px rgba(168, 85, 247, 0.8)",
                            "0 0 50px rgba(168, 85, 247, 1)",
                            "0 0 30px rgba(168, 85, 247, 0.8)",
                          ],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          textShadow: { duration: 3, repeat: Infinity },
                          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                        }}
                      >
                        {spotlightMembers[currentSpotlightIndex].name}
                      </motion.h2>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Badge className="bg-white/30 text-white border-white/40 text-lg px-4 py-2 mb-4">
                          {spotlightMembers[currentSpotlightIndex].role}
                        </Badge>
                      </motion.div>
                      
                      <motion.p 
                        className="text-white/90 font-light text-xl leading-relaxed max-w-4xl mb-8 mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {spotlightMembers[currentSpotlightIndex].bio}
                      </motion.p>

                      <motion.div 
                        className="flex flex-wrap gap-2 justify-center mb-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                      >
                        {spotlightMembers[currentSpotlightIndex].skills.slice(0, 4).map((skill, index) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                          >
                            <Badge className={cn("border transition-all duration-300 hover:scale-105", getSkillBadgeColor(skill, index))}>
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>

                      <motion.div 
                        className="flex gap-4 justify-center flex-wrap"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
                      >
                        <Button
                          onClick={() => onMemberClick(spotlightMembers[currentSpotlightIndex])}
                          size="lg"
                          className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 text-lg px-8 py-4"
                        >
                          <Eye className="h-5 w-5 mr-3" />
                          View Full Profile
                          <ChevronRight className="h-5 w-5 ml-3" />
                        </Button>
                        
                        <Button
                          onClick={handleViewAllMembers}
                          size="lg"
                          className="bg-blue-500/20 hover:bg-blue-500/30 text-white border border-blue-400/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 text-lg px-8 py-4"
                        >
                          <Users className="h-5 w-5 mr-3" />
                          View All Members
                          <ChevronRight className="h-5 w-5 ml-3" />
                        </Button>
                        
                        <Button
                          onClick={() => setIsSpotlightCarousel(false)}
                          size="lg"
                          variant="outline"
                          className="bg-black/20 hover:bg-black/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 text-lg px-8 py-4"
                        >
                          Back to Overview
                        </Button>
                      </motion.div>
                    </>
                  ) : (
                    // Original Card Content
                    <>
                      <div className="flex items-center justify-center gap-4 mb-6">
                        {currentCard.icon && (
                          <motion.div 
                            className={cn(
                              "p-4 rounded-xl shadow-lg",
                              currentCard.color || 'bg-gradient-to-br from-blue-500 to-cyan-500'
                            )}
                            animate={{
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <currentCard.icon className="h-8 w-8 text-white" />
                          </motion.div>
                        )}
                      </div>
                      
                      <motion.h2
                        className="font-display text-7xl font-bold text-white mb-4 tracking-tight"
                        animate={{
                          textShadow: [
                            "0 0 30px rgba(6, 182, 212, 0.8)",
                            "0 0 50px rgba(6, 182, 212, 1)",
                            "0 0 30px rgba(6, 182, 212, 0.8)",
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                        }}
                      >
                        {currentCard.name || currentCard.title}
                      </motion.h2>
                      
                      {currentCard.memberCount > 0 && (
                        <Badge className="bg-white/30 text-white border-white/40 text-lg px-4 py-2 mb-4">
                          {currentCard.memberCount} members
                        </Badge>
                      )}
                      
                      <p className="text-white/90 font-light text-xl leading-relaxed max-w-4xl mb-8 mx-auto">
                        {currentCard.description}
                      </p>

                      {/* Enhanced Action Buttons - Only show appropriate buttons */}
                      <div className="flex gap-4 justify-center flex-wrap">
                        {isTeamGroup && (
                          <Button
                            onClick={handleCardClick}
                            size="lg"
                            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 text-lg px-8 py-4"
                          >
                            <Eye className="h-5 w-5 mr-3" />
                            {currentCard.id === 'overview' ? 'View All Members' : 'Explore Team'}
                            <ChevronRight className="h-5 w-5 ml-3" />
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Controls inside card for Spotlight Carousel */}
          {isSpotlightCarousel && (
            <>
              {/* Left/Right Navigation */}
              {spotlightMembers.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm z-20"
                    onClick={goToPreviousSpotlight}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm z-20"
                    onClick={goToNextSpotlight}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}

              {/* Bottom Controls - positioned to not obstruct thumbnails */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
                  {/* Dots Navigation */}
                  <div className="flex gap-2">
                    {spotlightMembers.map((_, index) => (
                      <button
                        key={index}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all duration-300 hover:scale-125",
                          index === currentSpotlightIndex 
                            ? "bg-white w-6 shadow-lg" 
                            : "bg-white/40 hover:bg-white/60"
                        )}
                        onClick={() => goToSpotlightMember(index)}
                      />
                    ))}
                  </div>

                  {/* Pause/Play Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSpotlightPaused(!isSpotlightPaused)}
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm h-8 w-8"
                  >
                    {isSpotlightPaused ? (
                      <Play className="h-4 w-4" />
                    ) : (
                      <Pause className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Card Type Indicator */}
          <div className="absolute top-4 right-4">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Badge className={cn(
                "text-white border-white/30 font-medium tracking-wide backdrop-blur-sm",
                isSpotlightCarousel ? "bg-purple-500/30" : (isTeamGroup ? "bg-blue-500/30" : "bg-purple-500/30")
              )}>
                {isSpotlightCarousel ? "Spotlight Member" : (isTeamGroup ? "Team Group" : "Feature")}
              </Badge>
            </motion.div>
          </div>

          {/* Loading Indicator */}
          {isTransitioning && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Navigation Controls for main carousel - positioned outside to not obstruct */}
        {!isSpotlightCarousel && (
          <div className="mt-4 flex justify-end">
            <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              {/* Dots Navigation */}
              <div className="flex gap-2">
                {allCards.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300 hover:scale-125",
                      index === currentCardIndex 
                        ? "bg-white w-8 shadow-lg" 
                        : "bg-white/40 hover:bg-white/60"
                    )}
                    onClick={() => goToCard(index)}
                  />
                ))}
              </div>

              {/* Pause/Play Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsContentPaused(!isContentPaused)}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm h-8 w-8"
              >
                {isContentPaused ? (
                  <Play className="h-4 w-4" />
                ) : (
                  <Pause className="h-4 w-4" />
                )}
              </Button>

              {/* Next Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNextCard}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Spotlight Members Thumbnails - positioned to not be obstructed */}
        {spotlightMembers.length > 0 && !isSpotlightCarousel && (
          <motion.div 
            className="mt-8 flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {spotlightMembers.slice(0, 5).map((member, index) => {
              const initials = member.name.split(' ').map(n => n[0]).join('');
              return (
                <motion.button
                  key={`${member.id}-${index}`} // Unique key to prevent click issues
                  onClick={() => handleSpotlightThumbnailClick(index)}
                  className="relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Avatar className="h-16 w-16 border-2 border-white/30 shadow-lg group-hover:border-white/60 transition-all duration-300">
                    <AvatarImage src={member.photo} alt={member.name} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  {member.spotlight && (
                    <div className="absolute -top-1 -right-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    </div>
                  )}
                  
                  {/* Member name tooltip */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {member.name}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Expanded Members View Modal */}
      <AnimatePresence>
        {isExpandedView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsExpandedView(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-7xl max-h-[90vh] bg-background rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Users className="h-8 w-8 text-white" />
                    <div>
                      <h2 className="font-display text-3xl font-bold text-white">Meet Our Team</h2>
                      <p className="text-white/80">Discover our talented team members</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsExpandedView(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </div>

              {/* Members Grid */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {members.map((member, index) => {
                    const initials = member.name.split(' ').map(n => n[0]).join('');
                    return (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                          <CardContent className="p-6" onClick={() => onMemberClick(member)}>
                            <div className="flex items-center gap-4 mb-4">
                              <Avatar className="h-16 w-16 border-2 border-primary/20">
                                <AvatarImage src={member.photo} alt={member.name} />
                                <AvatarFallback>{initials}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h3 className="font-display text-xl font-semibold mb-1">{member.name}</h3>
                                <p className="text-muted-foreground font-medium">{member.role}</p>
                                <Badge variant="outline" className="mt-1">{member.department}</Badge>
                              </div>
                              {member.spotlight && (
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                              )}
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                              {member.bio}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {member.skills.slice(0, 3).map((skill, skillIndex) => (
                                <Badge key={skill} className={cn("text-xs transition-all duration-200 hover:scale-105", getSkillBadgeColor(skill, skillIndex))}>
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Badge variant={member.available ? "default" : "secondary"}>
                                {member.available ? "Available" : "Busy"}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {member.experience} years experience
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}