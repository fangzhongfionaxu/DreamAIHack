
import React from 'react';
import { cn } from '@/lib/utils';

interface PlantProgressProps {
  streak: number;
  maxStreak: number;
  className?: string;
}

const PlantProgress: React.FC<PlantProgressProps> = ({ 
  streak, 
  maxStreak = 30, 
  className 
}) => {
  // Calculate growth percentage (0-100)
  const growthPercentage = Math.min((streak / maxStreak) * 100, 100);
  
  // Determine which plant stages to show based on growth
  const showSmallPlant = growthPercentage >= 10;
  const showMediumPlant = growthPercentage >= 40;
  const showLargePlant = growthPercentage >= 70;
  const showFlowers = growthPercentage >= 90;

  return (
    <div className={cn("relative h-64 w-full flex items-end justify-center", className)}>
      {/* Soil base */}
      <div className="absolute bottom-0 w-full h-10 bg-amber-800/20 rounded-md"></div>
      
      {/* Plant stem - grows with streak */}
      <div 
        className="absolute bottom-10 w-2 bg-plant transition-all duration-700 ease-out rounded-full"
        style={{ 
          height: `${Math.max(5, (growthPercentage / 100) * 140)}px`,
          left: 'calc(50% - 4px)',
        }}
      ></div>
      
      {/* Small leaves - appear first */}
      {showSmallPlant && (
        <>
          <div className="absolute leaf-animation bg-plant-light rounded-full w-8 h-6"
               style={{ bottom: '45px', left: 'calc(50% - 20px)', transform: 'rotate(-30deg)' }}></div>
          <div className="absolute leaf-animation bg-plant-light rounded-full w-8 h-6"
               style={{ bottom: '45px', left: 'calc(50% + 4px)', transform: 'rotate(30deg)' }}></div>
        </>
      )}
      
      {/* Medium leaves - appear later */}
      {showMediumPlant && (
        <>
          <div className="absolute leaf-animation bg-plant rounded-full w-10 h-7"
               style={{ bottom: '75px', left: 'calc(50% - 28px)', transform: 'rotate(-45deg)' }}></div>
          <div className="absolute leaf-animation bg-plant rounded-full w-10 h-7"
               style={{ bottom: '75px', left: 'calc(50% + 10px)', transform: 'rotate(45deg)' }}></div>
        </>
      )}
      
      {/* Large leaves - appear even later */}
      {showLargePlant && (
        <>
          <div className="absolute leaf-animation bg-plant-dark rounded-full w-12 h-8"
               style={{ bottom: '110px', left: 'calc(50% - 34px)', transform: 'rotate(-40deg)' }}></div>
          <div className="absolute leaf-animation bg-plant-dark rounded-full w-12 h-8"
               style={{ bottom: '110px', left: 'calc(50% + 14px)', transform: 'rotate(40deg)' }}></div>
        </>
      )}
      
      {/* Flowers - appear at the end */}
      {showFlowers && (
        <>
          <div className="absolute leaf-animation bg-pastel-pink rounded-full w-6 h-6 animate-pulse-soft"
               style={{ bottom: '140px', left: 'calc(50% - 3px)' }}></div>
          <div className="absolute leaf-animation bg-pastel-yellow rounded-full w-5 h-5 animate-pulse-soft"
               style={{ bottom: '135px', left: 'calc(50% - 15px)' }}></div>
          <div className="absolute leaf-animation bg-pastel-pink rounded-full w-5 h-5 animate-pulse-soft"
               style={{ bottom: '135px', left: 'calc(50% + 8px)' }}></div>
        </>
      )}
      
      {/* Streak count display */}
      <div className="absolute bottom-0 left-0 right-0 text-center pb-12">
        <span className="text-xl font-bold text-brand-dark">{streak}</span>
        <span className="text-sm text-muted-foreground"> / {maxStreak} days</span>
      </div>
    </div>
  );
};

export default PlantProgress;
