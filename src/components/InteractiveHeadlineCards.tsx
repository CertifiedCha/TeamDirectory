import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Briefcase, PenTool, Code, Eye, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { PanoramicViewer, TeamGroup } from './PanoramicViewer';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TeamMember } from '../data/teamMembers';
import { cn } from './ui/utils';

interface InteractiveHeadlineCardsProps {
  members: TeamMember[];
  onMemberClick: (member: TeamMember) => void;
}

// Define team groups with panoramic images
const teamGroups: TeamGroup[] = [
  {
    id: 'overview',
    name: 'Meet Our Team',
    description: 'Talented individuals working together to create something extraordinary',
    panoramicImage: './Teampictures/IMG_1931.jpg',
    icon: Users,
    memberCount: 0, // Will be calculated
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500'
  },
  {
    id: 'designers',
    name: 'Design Team',
    description: 'Creative minds crafting beautiful and intuitive user experiences',
    panoramicImage: 'https://images.unsplash.com/photo-1652498196118-4577d5f6abd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHN0dWRpbyUyMHdvcmtwbGFjZXxlbnwxfHx8fDE3NTYxMzcxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: PenTool,
    memberCount: 0,
    color: 'bg-gradient-to-br from-purple-500 to-pink-500'
  },
  {
    id: 'writers',
    name: 'Content Team',
    description: 'Storytellers and writers who bring ideas to life through words',
    panoramicImage: 'https://images.unsplash.com/photo-1646054791640-62e00f540457?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cml0ZXJzJTIwY2FmZSUyMHdyaXRpbmclMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU2MTM3MTk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Briefcase,
    memberCount: 0,
    color: 'bg-gradient-to-br from-green-500 to-emerald-500'
  },
  {
    id: 'developers',
    name: 'Development Team',
    description: 'Tech experts building robust solutions and innovative features',
    panoramicImage: 'https://images.unsplash.com/photo-1753715613434-9c7cb58876b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBjb2RpbmclMjB3b3Jrc3BhY2UlMjB0ZWNoJTIwb2ZmaWNlfGVufDF8fHx8MTc1NjEzNzIwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Code,
    memberCount: 0,
    color: 'bg-gradient-to-br from-orange-500 to-red-500'
  }
];

// Map departments to groups
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
    title: 'Check Out Our New Blogging Website',
    description: 'Discover insights, tutorials, and stories from our development journey',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    href: '#',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'portfolio',
    title: 'Check Our Portfolios',
    description: 'Explore our creative works, projects, and professional achievements',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
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

export function InteractiveHeadlineCards({ members, onMemberClick }: InteractiveHeadlineCardsProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState<TeamGroup>(teamGroups[0]);
  const [isContentPaused, setIsContentPaused] = useState(false);

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

  // Auto-rotate cards
  useEffect(() => {
    if (isContentPaused) return;
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentCardIndex((prev) => (prev + 1) % allCards.length);
        setIsTransitioning(false);
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, [isContentPaused, allCards.length]);

  const currentCard = allCards[currentCardIndex];
  const isTeamGroup = teamGroups.some(group => group.id === currentCard.id);

  const handleCardClick = () => {
    if (isTeamGroup) {
      const group = teamGroups.find(g => g.id === currentCard.id);
      if (group) {
        setCurrentGroup({ ...group, memberCount: currentCard.memberCount });
        setIsViewerOpen(true);
      }
    }
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

  return (
    <>
      <div className="mb-12">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-border/50 backdrop-blur-sm group">
          {/* Background Image */}
          <div className="relative h-96 overflow-hidden">
            <ImageWithFallback
              src={currentCard.panoramicImage || currentCard.image}
              alt={currentCard.name || currentCard.title}
              className={cn(
                "w-full h-full object-cover transition-all duration-700",
                isTransitioning 
                  ? "scale-110 opacity-50 translate-x-8" 
                  : "scale-100 opacity-80 translate-x-0 group-hover:scale-105"
              )}
            />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className={cn(
              "absolute inset-0 opacity-20 transition-opacity duration-700",
              currentCard.color || 'bg-gradient-to-br from-blue-500 to-cyan-500'
            )} />
            
            {/* Interactive overlay for team groups */}
            {isTeamGroup && (
              <motion.div 
                className="absolute inset-0 cursor-pointer hover:bg-black/10 transition-colors duration-300"
                onClick={handleCardClick}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
          </div>

          {/* Content */}
          <div className={cn(
            "absolute bottom-8 left-8 right-8 transition-all duration-700",
            isTransitioning 
              ? "opacity-0 translate-x-12 translate-y-4" 
              : "opacity-100 translate-x-0 translate-y-0"
          )}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  {currentCard.icon && (
                    <div className={cn(
                      "p-3 rounded-xl shadow-lg",
                      currentCard.color || 'bg-gradient-to-br from-blue-500 to-cyan-500'
                    )}>
                      <currentCard.icon className="h-6 w-6 text-white" />
                    </div>
                  )}
                  <div>
                    <h2 className="font-display text-5xl font-bold text-white mb-2 tracking-tight">
                      {currentCard.name || currentCard.title}
                    </h2>
                    {currentCard.memberCount > 0 && (
                      <Badge className="bg-white/20 text-white border-white/30">
                        {currentCard.memberCount} members
                      </Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-white/90 font-light text-lg leading-relaxed max-w-3xl mb-6">
                  {currentCard.description}
                </p>

                {/* Action Button for team groups */}
                {isTeamGroup && (
                  <Button
                    onClick={handleCardClick}
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Explore in 3D
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-8 right-8">
            <div className="flex items-center gap-4">
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
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
              >
                {isContentPaused ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5"
                  />
                ) : (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex gap-0.5"
                  >
                    <div className="w-1 h-3 bg-white" />
                    <div className="w-1 h-3 bg-white" />
                  </motion.div>
                )}
              </Button>

              {/* Next Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNextCard}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Card Type Indicator */}
          <div className="absolute top-4 right-4">
            <Badge className={cn(
              "text-white border-white/30 font-medium tracking-wide backdrop-blur-sm",
              isTeamGroup ? "bg-blue-500/30" : "bg-purple-500/30"
            )}>
              {isTeamGroup ? "Team Group" : "Feature"}
            </Badge>
          </div>

          {/* Loading Indicator */}
          {isTransitioning && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>

      {/* 3D Panoramic Viewer */}
      <PanoramicViewer
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        currentGroup={currentGroup}
        onGroupChange={(group) => setCurrentGroup({ ...group, memberCount: groupsWithCounts.find(g => g.id === group.id)?.memberCount || 0 })}
        groups={groupsWithCounts}
      />
    </>
  );
}