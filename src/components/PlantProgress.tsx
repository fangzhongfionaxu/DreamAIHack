
import React from 'react';
import { cn } from '@/lib/utils';
import { Leaf, LeafyGreen, Sprout } from 'lucide-react';

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
  const showSeedling = growthPercentage >= 5;
  const showSprout = growthPercentage >= 20;
  const showSmallPlant = growthPercentage >= 40;
  const showMediumPlant = growthPercentage >= 60;
  const showLargePlant = growthPercentage >= 80;
  const showFlowers = growthPercentage >= 95;

  return (
    <div className={cn("relative h-64 w-full flex items-end justify-center", className)}>
      {/* Soil base with texture */}
      <div className="absolute bottom-0 w-full h-12 bg-gradient-to-b from-amber-800/30 to-amber-900/40 rounded-md overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full bg-amber-950" 
              style={{
                width: `${Math.random() * 5 + 2}px`,
                height: `${Math.random() * 5 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Plant stem - realistic with gradients and slight curve */}
      {showSeedling && (
        <div 
          className="absolute transition-all duration-700 ease-out"
          style={{ 
            bottom: '12px',
            left: 'calc(50% - 1px)',
            height: `${Math.max(5, (growthPercentage / 100) * 150)}px`,
            width: '3px',
            background: 'linear-gradient(to right, #2A9A67, #3FB784, #2A9A67)',
            transform: `rotate(${Math.sin(growthPercentage / 100) * 5}deg)`,
            transformOrigin: 'bottom center',
            borderRadius: '2px',
            zIndex: 10
          }}
        />
      )}
      
      {/* Small seed/seedling */}
      {showSeedling && (
        <div className="absolute bottom-8 z-20" style={{ transform: 'translateX(-50%)' }}>
          <Sprout 
            className="text-plant-dark animate-grow"
            size={16} 
          />
        </div>
      )}
      
      {/* Small leaves near bottom */}
      {showSprout && (
        <>
          <div className="absolute z-20" 
              style={{ 
                bottom: '35px', 
                left: 'calc(50% - 15px)', 
                transform: 'rotate(-30deg) scale(0.9)',
                transformOrigin: 'center right'
              }}>
            <Leaf className="text-plant-light fill-plant-light/30 animate-grow" size={14} />
          </div>
          <div className="absolute z-20" 
              style={{ 
                bottom: '35px', 
                left: 'calc(50% + 5px)', 
                transform: 'rotate(30deg) scale(0.9) scaleX(-1)',
                transformOrigin: 'center left'
              }}>
            <Leaf className="text-plant-light fill-plant-light/30 animate-grow" size={14} />
          </div>
        </>
      )}
      
      {/* Medium-sized leaves */}
      {showSmallPlant && (
        <>
          <div className="absolute z-10" 
              style={{ 
                bottom: '60px', 
                left: 'calc(50% - 22px)', 
                transform: 'rotate(-40deg) scale(1.2)',
                transformOrigin: 'center right'
              }}>
            <Leaf className="text-plant fill-plant/40 animate-grow" size={18} />
          </div>
          <div className="absolute z-10" 
              style={{ 
                bottom: '60px', 
                left: 'calc(50% + 8px)', 
                transform: 'rotate(40deg) scale(1.2) scaleX(-1)',
                transformOrigin: 'center left'
              }}>
            <Leaf className="text-plant fill-plant/40 animate-grow" size={18} />
          </div>
        </>
      )}
      
      {/* Larger leaves */}
      {showMediumPlant && (
        <>
          <div className="absolute z-10" 
              style={{ 
                bottom: '80px', 
                left: 'calc(50% - 28px)', 
                transform: 'rotate(-30deg) scale(1.5)',
                transformOrigin: 'center right'
              }}>
            <Leaf className="text-plant-dark fill-plant-dark/40 animate-grow" size={20} />
          </div>
          <div className="absolute z-10" 
              style={{ 
                bottom: '80px', 
                left: 'calc(50% + 10px)', 
                transform: 'rotate(30deg) scale(1.5) scaleX(-1)',
                transformOrigin: 'center left'
              }}>
            <Leaf className="text-plant-dark fill-plant-dark/40 animate-grow" size={20} />
          </div>
        </>
      )}
      
      {/* Top leaves/plant crown */}
      {showLargePlant && (
        <div className="absolute" 
            style={{ 
              bottom: '110px', 
              left: '50%',
              transform: 'translateX(-50%) scale(1.5)',
              zIndex: 5
            }}>
          <LeafyGreen className="text-plant-dark fill-plant/30 animate-grow" size={36} />
        </div>
      )}
      
      {/* Flowers - appear at the end */}
      {showFlowers && (
        <>
          <div className="absolute h-5 w-5 rounded-full bg-pastel-pink animate-pulse-soft z-30"
               style={{ bottom: '135px', left: 'calc(50% - 10px)' }}></div>
          <div className="absolute h-4 w-4 rounded-full bg-pastel-yellow animate-pulse-soft z-30"
               style={{ bottom: '145px', left: 'calc(50% + 5px)' }}></div>
          <div className="absolute h-4 w-4 rounded-full bg-pastel-pink animate-pulse-soft z-30"
               style={{ bottom: '150px', left: 'calc(50% - 5px)' }}></div>
               
          {/* Flower details */}
          <div className="absolute h-2 w-2 rounded-full bg-yellow-300 z-40"
               style={{ bottom: '136px', left: 'calc(50% - 8px)' }}></div>
          <div className="absolute h-2 w-2 rounded-full bg-yellow-300 z-40"
               style={{ bottom: '146px', left: 'calc(50% + 6px)' }}></div>
          <div className="absolute h-2 w-2 rounded-full bg-yellow-300 z-40"
               style={{ bottom: '151px', left: 'calc(50% - 4px)' }}></div>
        </>
      )}
      
      {/* Streak count display */}
      <div className="absolute bottom-0 left-0 right-0 text-center pb-14">
        <span className="text-xl font-bold text-brand-dark">{streak}</span>
        <span className="text-sm text-muted-foreground"> / {maxStreak} days</span>
      </div>
    </div>
  );
};

export default PlantProgress;
