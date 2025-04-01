
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
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
    <Card className={cn("w-full", className)}>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Achievements</h3>
        
        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge) => (
            <TooltipProvider key={badge.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className={cn(
                      "aspect-square rounded-full p-4 flex items-center justify-center border-2 transition-all",
                      badge.earned 
                        ? "border-brand bg-brand/10 text-brand-dark" 
                        : "border-muted bg-muted/30 text-muted-foreground opacity-60"
                    )}
                  >
                    <div className="flex flex-col items-center">
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      {badge.progress !== undefined && badge.maxProgress && (
                        <div className="w-full h-1 bg-muted rounded-full mt-1">
                          <div 
                            className="h-full bg-brand rounded-full"
                            style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <div className="text-center">
                    <p className="font-semibold">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                    {badge.progress !== undefined && badge.maxProgress && (
                      <Badge className="mt-1 bg-brand text-white">
                        {badge.progress}/{badge.maxProgress}
                      </Badge>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BadgeDisplay;
