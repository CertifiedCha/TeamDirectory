import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrop } from 'react-dnd';
import { Cloud } from 'lucide-react';
import { TeamMemberCard } from './TeamMemberCard';
import { TeamMemberModal } from './TeamMemberModal';
import { SearchAndFilters, SortOption, ViewMode } from './SearchAndFilters';
import { ThemeToggle } from './ThemeToggle';
import { TeamMember } from '../data/teamMembers';
import { cn } from './ui/utils';

interface TeamDirectoryProps {
  members: TeamMember[];
}

export function TeamDirectory({ members: initialMembers }: TeamDirectoryProps) {
  const [members, setMembers] = useState(initialMembers);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isDark, setIsDark] = useState(false);

  // Check for dark mode on mount
  useEffect(() => {
    const checkDarkMode = () => {
      const dark = document.documentElement.classList.contains('dark');
      setIsDark(dark);
    };
    
    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  });

  const handleDepartmentToggle = useCallback((department: string) => {
    setSelectedDepartments(prev => 
      prev.includes(department)
        ? prev.filter(d => d !== department)
        : [...prev, department]
    );
  }, []);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setMembers(prev => {
      const newMembers = [...prev];
      const dragCard = newMembers[dragIndex];
      newMembers.splice(dragIndex, 1);
      newMembers.splice(hoverIndex, 0, dragCard);
      return newMembers;
    });
  }, []);

  const filteredAndSortedMembers = useMemo(() => {
    let filtered = members.filter(member => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          member.name.toLowerCase().includes(searchLower) ||
          member.role.toLowerCase().includes(searchLower) ||
          member.department.toLowerCase().includes(searchLower) ||
          member.skills.some(skill => skill.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
      }

      // Department filter
      if (selectedDepartments.length > 0 && !selectedDepartments.includes(member.department)) {
        return false;
      }

      // Available filter
      if (showAvailableOnly && !member.available) {
        return false;
      }

      // Favorites filter
      if (showFavoritesOnly && !member.favorite) {
        return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'role':
          return a.role.localeCompare(b.role);
        case 'experience':
          return b.experience - a.experience;
        default:
          return 0;
      }
    });

    return filtered;
  }, [members, searchTerm, selectedDepartments, showAvailableOnly, showFavoritesOnly, sortBy]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-background transition-colors duration-500 ease-in-out relative overflow-hidden">
        {/* Ocean-themed Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Clouds */}
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute ${isDark ? 'text-slate-500' : 'text-blue-100'} opacity-40`}
                style={{
                  left: `${(i * 15) % 100}%`,
                  top: `${10 + (i % 3) * 15}%`,
                }}
                animate={{
                  x: [0, 50, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 20 + i * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 1.5,
                }}
              >
                <Cloud size={30 + (i % 4) * 10} />
              </motion.div>
            ))}
          </div>

          {/* Lighthouse */}
          <motion.div
            className="absolute top-1/4 right-10 opacity-20"
            animate={{
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className={`w-4 h-16 ${isDark ? 'bg-slate-600' : 'bg-red-300'} rounded-t-lg mx-auto`} />
            <div className={`w-12 h-6 ${isDark ? 'bg-slate-700' : 'bg-red-400'} rounded-b-md`} />
            {/* Lighthouse beam */}
            <motion.div
              className={`absolute top-0 left-2 w-2 h-80 rounded-full origin-bottom`}
              style={{
                background: isDark 
                  ? 'linear-gradient(to top, rgba(255, 255, 0, 0.2), transparent)' 
                  : 'linear-gradient(to top, rgba(255, 200, 0, 0.15), transparent)'
              }}
              animate={{
                rotate: [-45, 45, -45],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Ocean waves at bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-32"
            style={{
              background: isDark
                ? 'linear-gradient(to top, rgba(59, 130, 246, 0.1), transparent)'
                : 'linear-gradient(to top, rgba(14, 165, 233, 0.1), transparent)'
            }}
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="relative">
              {/* Flying Blimp with Banner */}
              <motion.div
                className="relative"
                animate={{
                  y: [0, -10, 0],
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Blimp */}
                <motion.div
                  className="relative mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Blimp body */}
                  <div className={`w-150 h-16 ${isDark ? 'bg-slate-600' : 'bg-red-400'} rounded-full relative shadow-xl`}>
                    {/* Blimp gondola */}
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-8 h-3 ${isDark ? 'bg-slate-700' : 'bg-red-500'} rounded-sm`} />
                    {/* Blimp strings */}
                    <div className={`absolute bottom-0 left-1/3 w-px h-2 ${isDark ? 'bg-slate-500' : 'bg-red-600'}`} />
                    <div className={`absolute bottom-0 right-1/3 w-px h-2 ${isDark ? 'bg-slate-500' : 'bg-red-600'}`} />
                  </div>
                  
                  {/* Banner */}
                  <motion.div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2"
                    animate={{
                      rotate: [-2, 2, -2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className={`relative px-6 py-3 ${isDark ? 'bg-slate-800' : 'bg-white'} rounded-lg shadow-2xl border-2 ${isDark ? 'border-blue-400' : 'border-blue-300'}`}>
                      <h1 className="font-display text-2xl font-bold bg-gradient-to-r from-primary via-blue-500 to-cyan-500 bg-clip-text text-transparent whitespace-nowrap tracking-wide">
                        Ephesians 2025-2026
                      </h1>
                      {/* Banner rope attachments */}
                      <div className={`absolute -top-2 left-4 w-1 h-4 ${isDark ? 'bg-slate-600' : 'bg-gray-400'} transform -rotate-12`} />
                      <div className={`absolute -top-2 right-4 w-1 h-4 ${isDark ? 'bg-slate-600' : 'bg-gray-400'} transform rotate-12`} />
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
              
              <p className="text-muted-foreground font-light text-xl leading-relaxed transition-colors duration-500 ease-in-out ml-2 tracking-wide mt-16">
                Discover and connect with our talented team members ✨
              </p>
            </div>
            <ThemeToggle />
          </div>


          <SearchAndFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedDepartments={selectedDepartments}
            onDepartmentToggle={handleDepartmentToggle}
            showAvailableOnly={showAvailableOnly}
            onAvailableToggle={setShowAvailableOnly}
            showFavoritesOnly={showFavoritesOnly}
            onFavoritesToggle={setShowFavoritesOnly}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          <TeamMemberGrid
            members={filteredAndSortedMembers}
            onMemberClick={setSelectedMember}
            onMoveCard={moveCard}
            viewMode={viewMode}
          />

          <TeamMemberModal
            member={selectedMember}
            open={!!selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        </div>
      </div>
    </DndProvider>
  );
}

interface TeamMemberGridProps {
  members: TeamMember[];
  onMemberClick: (member: TeamMember) => void;
  onMoveCard: (dragIndex: number, hoverIndex: number) => void;
  viewMode: ViewMode;
}

function TeamMemberGrid({ members, onMemberClick, onMoveCard, viewMode }: TeamMemberGridProps) {
  const [, drop] = useDrop({
    accept: 'team-member',
    drop: () => {},
  });

  if (members.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No team members found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div ref={drop} className="w-full">
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {members.length} team member{members.length !== 1 ? 's' : ''}
      </div>
      
      <div className={cn(
        viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
          : "space-y-3"
      )}>
        {members.map((member, index) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            onClick={() => onMemberClick(member)}
            isListView={viewMode === 'list'}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}