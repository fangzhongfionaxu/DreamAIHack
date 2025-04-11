
import React from 'react';
import { cn } from '@/lib/utils';
import FlowerPot from './plant/FlowerPot';
import PlantStem from './plant/PlantStem';
import PlantLeaves from './plant/PlantLeaves';
import PlantFlower from './plant/PlantFlower';
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
  
  // Determine which plant stages to show based on growth
  const showSeedling = growthPercentage >= 5;
  const showSprout = growthPercentage >= 20;
  const showSmallPlant = growthPercentage >= 40;
  const showMediumPlant = growthPercentage >= 60;
  const showLargePlant = growthPercentage >= 80;
  const showFlowers = growthPercentage >= 95;

  return (
    <div className={cn("relative h-64 w-full flex items-end justify-center", className)}>
      <FlowerPot />
      <PlantStem 
        growthPercentage={growthPercentage}
        showSeedling={showSeedling} 
      />
      <PlantLeaves 
        showSprout={showSprout}
        showSmallPlant={showSmallPlant}
        showMediumPlant={showMediumPlant}
        showLargePlant={showLargePlant}
      />
      <PlantFlower showFlowers={showFlowers} />
      <StreakCounter streak={streak} maxStreak={maxStreak} />
    </div>
  );
};

export default PlantProgress;
