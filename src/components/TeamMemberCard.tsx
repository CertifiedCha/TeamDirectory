import { forwardRef, useState } from "react";
import { useDrag } from "react-dnd";

// ⚠️ IMPORTANT: Adjust these import paths to match your project structure.
// Example: import { Button } from '../../components/ui/button';
import { Button } from "./ui/button";
// Example: import { Badge } from '../../components/ui/badge';
import { Badge } from "./ui/badge";
// Example: import { cn } from '../../lib/utils';
import { cn } from "./ui/utils";

// Standard lucide-react import
import {
  Heart,
  Linkedin,
  Twitter,
  Github,
  Star,
  FacebookIcon,
  InstagramIcon,
} from "lucide-react";

// ⚠️ IMPORTANT: Adjust this import path to match your project structure.
// Example: import { TeamMember } from '../../../data/teamMembers';
import { TeamMember } from "../data/teamMembers";

interface TeamMemberCardProps {
  member: TeamMember;
  onClick: () => void;
  isListView: boolean;
  index: number;
}

export const TeamMemberCard = forwardRef<
  HTMLDivElement,
  TeamMemberCardProps
>(({ member, onClick, isListView, index }, ref) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(member.likes);

  const [{ isDragging }, drag] = useDrag({
    type: "team-member",
    item: { id: member.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Combine the forwarded ref with the drag ref
  const combinedRef = (node: HTMLDivElement | null) => {
    drag(node);
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleSocialClick = (
    e: React.MouseEvent,
    url: string,
  ) => {
    e.stopPropagation();
    window.open(url, "_blank");
  };

  if (isListView) {
    return (
      <div
        ref={combinedRef}
        className={cn(
          "group cursor-pointer transition-all duration-500 hover:shadow-2xl relative overflow-hidden",
          isDragging && "opacity-50",
        )}
        onClick={onClick}
      >
        <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-primary/40 backdrop-blur-sm">
          <div className="flex items-center gap-6 p-6 relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-md transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
              <img
                src={member.photo}
                alt={member.name}
                className="h-20 w-20 rounded-full object-cover relative z-10 border-2 border-border/20 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:border-primary/40"
              />
              {member.favorite && (
                <Star className="absolute -top-1 -right-1 h-5 w-5 fill-yellow-400 text-yellow-400 animate-pulse drop-shadow-lg" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="truncate mb-2 text-lg font-semibold text-foreground transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-muted-foreground mb-3 text-sm font-medium transition-colors duration-300">
                {member.role}
              </p>
              <div className="flex gap-2 overflow-hidden">
                {member.skills
                  .slice(0, 2)
                  .map((skill, index) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className={`text-xs whitespace-nowrap flex-shrink-0 transition-all duration-300 hover:scale-105 border-border/50 hover:border-primary/40 ${
                        index === 0
                          ? "hover:bg-primary/5"
                          : "hover:bg-accent/5"
                      }`}
                    >
                      {skill}
                    </Badge>
                  ))}
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <Badge
                variant={
                  member.available ? "default" : "secondary"
                }
                className={`transition-all duration-300 hover:scale-105 ${
                  member.available
                    ? "bg-green-500 hover:bg-green-600 text-white hover:shadow-lg"
                    : ""
                }`}
              >
                {member.available ? "Available" : "Busy"}
              </Badge>
              <button
                onClick={handleLike}
                className={cn(
                  "flex items-center gap-2 text-sm transition-all duration-300 px-3 py-2 rounded-lg",
                  "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                  "hover:scale-105 active:scale-95 hover:shadow-lg backdrop-blur-sm",
                  isLiked
                    ? "text-red-500 bg-red-50 dark:bg-red-900/20 shadow-lg animate-pulse"
                    : "",
                )}
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-all duration-300",
                    isLiked
                      ? "fill-red-500 text-red-500 animate-bounce scale-110"
                      : "hover:text-red-400 hover:scale-110",
                  )}
                />
                <span className="font-medium">{likeCount}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={combinedRef}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:-translate-y-2",
        isDragging && "opacity-50",
      )}
      onClick={onClick}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/15 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-card via-card/98 to-accent/5 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden">
        {/* Main Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:saturate-110 group-hover:brightness-110"
          />

          {/* Dark Mode Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500" />

          {/* Social Links - Top Left (appears on hover) */}
          <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-10">
            {member.socialLinks.linkedin && (
              <Button
                size="sm"
                variant="secondary"
                className="h-9 w-9 p-0 bg-white/95 hover:bg-white transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-xl active:scale-95 border border-blue-200 shadow-lg backdrop-blur-sm"
                onClick={(e) =>
                  handleSocialClick(
                    e,
                    member.socialLinks.linkedin!,
                  )
                }
              >
                <Linkedin className="h-4 w-4 transition-colors duration-300 text-blue-600 hover:text-blue-700" />
              </Button>
            )}
            {member.socialLinks.twitter && (
              <Button
                size="sm"
                variant="secondary"
                className="h-9 w-9 p-0 bg-white/95 hover:bg-white transition-all duration-300 hover:scale-110 hover:-rotate-12 hover:shadow-xl active:scale-95 border border-sky-200 shadow-lg backdrop-blur-sm"
                onClick={(e) =>
                  handleSocialClick(
                    e,
                    member.socialLinks.twitter!,
                  )
                }
              >
                <Twitter className="h-4 w-4 transition-colors duration-300 text-sky-500 hover:text-sky-600" />
              </Button>
            )}
            {member.socialLinks.github && (
              <Button
                size="sm"
                variant="secondary"
                className="h-9 w-9 p-0 bg-white/95 hover:bg-white transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-xl active:scale-95 border border-gray-200 shadow-lg backdrop-blur-sm"
                onClick={(e) =>
                  handleSocialClick(
                    e,
                    member.socialLinks.github!,
                  )
                }
              >
                <Github className="h-4 w-4 transition-colors duration-300 text-gray-800 hover:text-gray-900" />
              </Button>
            )}
            {member.socialLinks.facebook && (
              <Button
                size="sm"
                variant="secondary"
                className="h-9 w-9 p-0 bg-white/95 hover:bg-white transition-all duration-300 hover:scale-110 hover:-rotate-12 hover:shadow-xl active:scale-95 border border-blue-200 shadow-lg backdrop-blur-sm"
                onClick={(e) =>
                  handleSocialClick(
                    e,
                    member.socialLinks.facebook!,
                  )
                }
              >
                <FacebookIcon className="h-4 w-4 transition-colors duration-300 text-blue-800 hover:text-blue-900" />
              </Button>
            )}
            {member.socialLinks.instagram && (
              <Button
                size="sm"
                variant="secondary"
                className="h-9 w-9 p-0 bg-white/95 hover:bg-white transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-xl active:scale-95 relative overflow-hidden border border-pink-200 shadow-lg backdrop-blur-sm"
                onClick={(e) =>
                  handleSocialClick(
                    e,
                    member.socialLinks.instagram!,
                  )
                }
              >
                <InstagramIcon className="h-4 w-4 transition-colors duration-300 text-pink-600 hover:text-pink-700 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-orange-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded" />
              </Button>
            )}
          </div>

          {/* Like Button - Top Right (appears on hover) */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-10">
            <button
              onClick={handleLike}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-full transition-all duration-300 text-sm font-medium shadow-xl backdrop-blur-sm",
                "bg-white/95 hover:bg-white border border-red-200",
                "hover:scale-110 active:scale-95 hover:shadow-2xl",
                isLiked
                  ? "animate-pulse shadow-red-300/50"
                  : "",
              )}
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-all duration-300",
                  isLiked
                    ? "fill-red-500 text-red-500 scale-110 animate-bounce"
                    : "text-gray-600 hover:text-red-400 hover:scale-110",
                )}
              />
              <span
                className={cn(
                  "font-medium transition-all duration-300",
                  isLiked ? "text-red-500" : "text-gray-700",
                )}
              >
                {likeCount}
              </span>
              {isLiked && (
                <div className="absolute inset-0 rounded-full border-2 border-red-300 animate-ping opacity-75" />
              )}
            </button>
          </div>

          {/* Favorite Star */}
          {member.favorite && (
            <div className="absolute top-3 right-3 group-hover:top-14 transition-all duration-500 z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-md animate-pulse" />
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400 drop-shadow-lg animate-pulse relative z-10" />
              </div>
            </div>
          )}

          {/* Dark Mode Enhanced Bottom Section */}
          <div className="absolute bottom-0 left-0 right-0 p-0">
            {/* Content Container */}
            <div className="relative z-10">
              {/* Always Visible Content */}
              <div className="absolute bottom-4 left-4 right-4 transition-transform duration-500 group-hover:-translate-y-10">
                <h3 className="text-white mb-1 font-semibold text-lg tracking-tight transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-white/80 text-sm mb-2 font-medium tracking-wide transition-colors duration-300">
                  {member.role}
                </p>

                {/* Expand on Hover Content - Bio */}
                <div className="transform transition-all duration-500 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 mb-3">
                  <p className="text-xs text-white/70 line-clamp-2 font-light leading-relaxed transition-colors duration-300">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Skills and Status */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between mt-0">
                <div className="flex gap-1.5 overflow-hidden flex-1 min-w-0 mr-3">
                  {member.skills
                    .slice(0, 2)
                    .map((skill, index) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className={`text-xs font-medium tracking-wide whitespace-nowrap flex-shrink-0 transition-all duration-300 hover:scale-105 text-white/90 ${
                          index === 0
                            ? "bg-blue-400/30 hover:bg-blue-400/40 border-blue-300/50"
                            : "bg-purple-400/30 hover:bg-purple-400/40 border-purple-300/50"
                        } shadow-sm`}
                      >
                        {skill}
                      </Badge>
                    ))}
                </div>
                <Badge
                  variant={
                    member.available ? "default" : "secondary"
                  }
                  className={`font-medium tracking-wide text-xs whitespace-nowrap flex-shrink-0 transition-all duration-300 hover:scale-105 shadow-sm ${
                    member.available
                      ? "bg-green-500 hover:bg-green-600 text-white hover:shadow-lg border-green-300/30"
                      : "bg-white/20 text-white border-gray-300/30"
                  }`}
                >
                  {member.available ? "Available" : "Busy"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

TeamMemberCard.displayName = "TeamMemberCard";