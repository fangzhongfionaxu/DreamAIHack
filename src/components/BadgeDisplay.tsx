
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Lock } from 'lucide-react';

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon?: React.ReactNode;
  imageUrl?: string;
  earned: boolean;
  progress?: number;
  maxProgress?: number;
}

interface BadgeDisplayProps {
  badges: AchievementBadge[];
  className?: string;
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ badges, className }) => {
  return (
    <div className={cn("grid grid-cols-3 gap-x-4 gap-y-6 place-items-center", className)}>
      {badges.map((badge) => {
        const daysToGo = badge.maxProgress && badge.progress ? badge.maxProgress - badge.progress : 0;
        const showDaysToGo = !badge.earned && daysToGo > 0;

        return (
          <TooltipProvider key={badge.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center text-center w-24 cursor-pointer animate-fade-in">
                  <div className={cn(
                    "aspect-square w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all relative overflow-hidden",
                    badge.earned ? "border-yellow-400 bg-yellow-400/10" : "border-muted bg-muted/30"
                  )}>
                    {badge.imageUrl && (
                      <img
                        src={badge.imageUrl}
                        alt={badge.name}
                        className={cn(
                          "w-full h-full object-cover rounded-full transition-all", 
                          !badge.earned && "filter grayscale brightness-50"
                        )}
                      />
                    )}
                    {!badge.earned && (
                      <div className="absolute inset-0 flex items-center justify-center text-white/80">
                        <Lock size={24} />
                      </div>
                    )}
                  </div>
                  <p className="font-semibold text-sm mt-2 truncate w-full">{badge.name}</p>
                  {showDaysToGo && (
                    <p className="text-xs text-muted-foreground">{daysToGo} days to go</p>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-[200px]">
                <div className="text-center">
                  <p className="font-semibold">{badge.name}</p>
                  <p className="text-xs text-muted-foreground my-1">{badge.description}</p>
                  {!badge.earned && badge.progress !== undefined && badge.maxProgress && (
                    <Badge variant="secondary" className="mt-1">
                      {badge.progress}/{badge.maxProgress} days
                    </Badge>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};

export default BadgeDisplay;
