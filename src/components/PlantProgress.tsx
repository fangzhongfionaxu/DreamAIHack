
import React from 'react';
import { cn } from '@/lib/utils';
import PlantImage from './plant/PlantImage';
import StreakCounter from './plant/StreakCounter';

interface PlantProgressProps {
  streak: number;
  maxStreak: number;
  className?: string;
  forceGrowthPercentage?: number;
}

const PlantProgress: React.FC<PlantProgressProps> = ({ 
  streak, 
  maxStreak = 30, 
  className,
  forceGrowthPercentage
}) => {
  // Calculate growth percentage (0-100)
  // Use the forceGrowthPercentage if provided, otherwise calculate from streak
  const growthPercentage = forceGrowthPercentage !== undefined 
    ? forceGrowthPercentage
    : Math.min((streak / maxStreak) * 100, 100);

  return (
    <div className={cn("relative h-64 w-full flex flex-col items-center justify-center", className)}>
      <PlantImage growthPercentage={growthPercentage} />
      <StreakCounter streak={streak} maxStreak={maxStreak} />
    </div>
  );
};

export default PlantProgress;
