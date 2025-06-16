
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  earned: boolean;
  progress: number;
  maxProgress: number;
}

interface BadgeDisplayProps {
  badges: AchievementBadge[];
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ badges }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
      {badges.map((badge) => (
        <BadgeCard key={badge.id} badge={badge} />
      ))}
    </div>
  );
};

interface BadgeCardProps {
  badge: AchievementBadge;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ badge }) => {
  const progressPercentage = Math.min((badge.progress / badge.maxProgress) * 100, 100);
  
  return (
    <Card className={`transition-all duration-200 ${badge.earned ? 'ring-2 ring-brand/20 shadow-md' : 'opacity-75'}`}>
      <CardContent className="p-2 sm:p-4 text-center">
        <div className="relative mb-2 sm:mb-3">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto relative">
            <img
              src={badge.imageUrl}
              alt={badge.name}
              className={`w-full h-full object-contain rounded-full ${
                badge.earned ? '' : 'grayscale opacity-50'
              }`}
            />
            {!badge.earned && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full">
                <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </div>
            )}
          </div>
          {badge.earned && (
            <Badge 
              variant="secondary" 
              className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-brand text-white text-xs px-1 py-0 h-4 sm:h-5 min-w-[16px] sm:min-w-[20px]"
            >
              ✓
            </Badge>
          )}
        </div>
        
        <h4 className="font-semibold text-xs sm:text-sm text-brand-dark mb-1 leading-tight">
          {badge.name}
        </h4>
        
        <p className="text-xs text-muted-foreground mb-2 sm:mb-3 leading-tight line-clamp-2">
          {badge.description}
        </p>
        
        {!badge.earned && (
          <div className="space-y-1 sm:space-y-2">
            <Progress 
              value={progressPercentage} 
              className="h-1 sm:h-2"
            />
            <p className="text-xs text-muted-foreground">
              {badge.progress}/{badge.maxProgress}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BadgeDisplay;
