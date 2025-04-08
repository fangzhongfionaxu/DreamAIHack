
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
  
  return (
    <div className={cn("relative flex flex-col items-center justify-center h-72 w-full", className)}>
      {/* Sun background - always visible */}
      <div className="absolute rounded-full bg-gradient-to-r from-pastel-yellow/40 to-pastel-pink/40 w-56 h-56 blur-sm" />
      
      {/* Flower pot */}
      <div className="absolute bottom-0 z-10 flex flex-col items-center">
        {/* Pot top rim */}
        <div className="relative w-40 h-10 bg-[#FEC6A1] rounded-md border-2 border-[#222] overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#ea384c]/70 border-t border-[#222]"></div>
          <div className="absolute top-1 left-4 w-2 h-2 rounded-full bg-[#ea384c]/30"></div>
          <div className="absolute top-3 right-5 w-1.5 h-1.5 rounded-full bg-[#ea384c]/20"></div>
        </div>
        
        {/* Pot body */}
        <div className="relative w-44 h-20 bg-gradient-to-b from-[#FEC6A1] to-[#FDE1D3] -mt-1 rounded-b-xl border-2 border-t-0 border-[#222] overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#ea384c]/20 rounded-b-lg"></div>
        </div>
      </div>
      
      {/* Plant elements - appear based on growth percentage */}
      <div className="relative z-0 mb-12">
        {/* Stem */}
        <div 
          className="absolute bottom-0 left-1/2 w-2 bg-[#3FB784] rounded-full -translate-x-1/2 transition-all duration-700 ease-out"
          style={{ 
            height: `${Math.max(5, (growthPercentage / 100) * 120)}px`,
          }}
        />
        
        {/* Leaves - show at 20% */}
        {growthPercentage >= 20 && (
          <>
            {/* First pair of leaves */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <div className="absolute -left-8 rotate-[-30deg] w-12 h-6 bg-gradient-to-br from-[#6DCCA2] to-[#3FB784] rounded-full border-[1.5px] border-[#222] animate-fade-in"></div>
              <div className="absolute -right-8 rotate-[30deg] w-12 h-6 bg-gradient-to-br from-[#6DCCA2] to-[#3FB784] rounded-full border-[1.5px] border-[#222] animate-fade-in"></div>
            </div>
          </>
        )}
        
        {/* More leaves - show at 50% */}
        {growthPercentage >= 50 && (
          <>
            {/* Second pair of bigger leaves */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
              <div className="absolute -left-12 rotate-[-45deg] w-16 h-8 bg-gradient-to-br from-[#3FB784] to-[#2A9A67] rounded-full border-[1.5px] border-[#222] animate-fade-in"></div>
              <div className="absolute -right-12 rotate-[45deg] w-16 h-8 bg-gradient-to-br from-[#3FB784] to-[#2A9A67] rounded-full border-[1.5px] border-[#222] animate-fade-in"></div>
            </div>
          </>
        )}
        
        {/* Flower - show at 100% */}
        {growthPercentage >= 100 && (
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 animate-fade-in">
            {/* Flower */}
            <div className="relative">
              {/* Petals */}
              <div className="absolute w-8 h-8 bg-[#ea384c] rounded-full -top-4 left-1/2 -translate-x-1/2 border-[1.5px] border-[#222] animate-pulse-soft"></div>
              <div className="absolute w-8 h-8 bg-[#ea384c] rounded-full top-0 -left-4 border-[1.5px] border-[#222] animate-pulse-soft"></div>
              <div className="absolute w-8 h-8 bg-[#ea384c] rounded-full top-0 -right-4 border-[1.5px] border-[#222] animate-pulse-soft"></div>
              <div className="absolute w-8 h-8 bg-[#ea384c] rounded-full -bottom-4 -left-1 border-[1.5px] border-[#222] animate-pulse-soft"></div>
              <div className="absolute w-8 h-8 bg-[#ea384c] rounded-full -bottom-4 -right-1 border-[1.5px] border-[#222] animate-pulse-soft"></div>
              
              {/* Center */}
              <div className="absolute w-6 h-6 bg-[#222] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-inner"></div>
            </div>
            
            {/* Shine effects */}
            <div className="absolute -left-8 top-1/2 w-4 h-1 bg-[#ea384c] rounded-full -rotate-45"></div>
            <div className="absolute -right-8 top-1/2 w-4 h-1 bg-[#ea384c] rounded-full rotate-45"></div>
          </div>
        )}
      </div>
      
      {/* Streak count display */}
      <div className="absolute bottom-0 left-0 right-0 text-center pb-28">
        <span className="text-xl font-bold text-brand-dark">{streak}</span>
        <span className="text-sm text-muted-foreground"> / {maxStreak} days</span>
      </div>
    </div>
  );
};

export default PlantProgress;
