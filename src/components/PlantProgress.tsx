
import React from 'react';
import { cn } from '@/lib/utils';
import { Flower, Leaf } from 'lucide-react';

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
      {/* Flower pot */}
      <div className="absolute bottom-0 w-20 h-16 flex items-center justify-center">
        <div className="absolute bottom-0 w-20 h-14 bg-gradient-to-r from-amber-700 to-amber-500 rounded-t-full overflow-hidden">
          <div className="absolute top-0 w-22 h-2 bg-amber-800 rounded-t-full"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-amber-900 rounded-full"></div>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-3 bg-amber-900/60 blur-sm rounded-full"></div>
      </div>
      
      {/* Soil */}
      <div className="absolute bottom-12 w-16 h-6 bg-gradient-to-b from-amber-900 to-amber-800 rounded-t-xl overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full bg-amber-950" 
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Plant stem - straight stem with slight natural curve */}
      {showSeedling && (
        <div 
          className="absolute transition-all duration-700 ease-out"
          style={{ 
            bottom: '18px',
            left: 'calc(50%)',
            height: `${Math.max(5, (growthPercentage / 100) * 160)}px`,
            width: '2px',
            background: 'linear-gradient(to right, #1a7a47, #2A9A67, #1a7a47)',
            transform: `rotate(${Math.sin(growthPercentage / 30) * 3}deg)`,
            transformOrigin: 'bottom center',
            zIndex: 10
          }}
        />
      )}
      
      {/* Small leaves near bottom - correctly attached to stem */}
      {showSprout && (
        <>
          {/* Left leaf */}
          <div className="absolute z-20" 
              style={{ 
                bottom: '40px', 
                left: 'calc(50% - 0px)', 
                transform: 'rotate(-40deg) translateX(-50%)',
                transformOrigin: 'right center'
              }}>
            <Leaf className="text-green-700 fill-green-600/70 animate-grow" size={14} />
          </div>
          {/* Right leaf */}
          <div className="absolute z-20" 
              style={{ 
                bottom: '40px', 
                left: 'calc(50% + 0px)', 
                transform: 'rotate(40deg) scaleX(-1) translateX(50%)',
                transformOrigin: 'left center'
              }}>
            <Leaf className="text-green-700 fill-green-600/70 animate-grow" size={14} />
          </div>
        </>
      )}
      
      {/* Medium-sized leaves - correctly attached to stem */}
      {showSmallPlant && (
        <>
          {/* Left leaf */}
          <div className="absolute z-10" 
              style={{ 
                bottom: '70px', 
                left: 'calc(50% - 0px)', 
                transform: 'rotate(-30deg) translateX(-50%)',
                transformOrigin: 'right center'
              }}>
            <Leaf className="text-green-600 fill-green-500/70 animate-grow" size={20} />
          </div>
          {/* Right leaf */}
          <div className="absolute z-10" 
              style={{ 
                bottom: '70px', 
                left: 'calc(50% + 0px)', 
                transform: 'rotate(30deg) scaleX(-1) translateX(50%)',
                transformOrigin: 'left center'
              }}>
            <Leaf className="text-green-600 fill-green-500/70 animate-grow" size={20} />
          </div>
        </>
      )}
      
      {/* Larger leaves - correctly attached to stem */}
      {showMediumPlant && (
        <>
          {/* Left leaf */}
          <div className="absolute z-10" 
              style={{ 
                bottom: '100px', 
                left: 'calc(50% - 0px)', 
                transform: 'rotate(-25deg) translateX(-50%)',
                transformOrigin: 'right center'
              }}>
            <Leaf className="text-green-600 fill-green-500/80 animate-grow" size={24} />
          </div>
          {/* Right leaf */}
          <div className="absolute z-10" 
              style={{ 
                bottom: '100px', 
                left: 'calc(50% + 0px)', 
                transform: 'rotate(25deg) scaleX(-1) translateX(50%)',
                transformOrigin: 'left center'
              }}>
            <Leaf className="text-green-600 fill-green-500/80 animate-grow" size={24} />
          </div>
        </>
      )}
      
      {/* Top leaves/plant crown - correctly attached to stem */}
      {showLargePlant && (
        <>
          {/* Left leaf */}
          <div className="absolute z-10" 
              style={{ 
                bottom: '130px', 
                left: 'calc(50% - 0px)', 
                transform: 'rotate(-20deg) translateX(-50%)',
                transformOrigin: 'right center'
              }}>
            <Leaf className="text-green-700 fill-green-600/90 animate-grow" size={28} />
          </div>
          {/* Right leaf */}
          <div className="absolute z-10" 
              style={{ 
                bottom: '130px', 
                left: 'calc(50% + 0px)', 
                transform: 'rotate(20deg) scaleX(-1) translateX(50%)',
                transformOrigin: 'left center'
              }}>
            <Leaf className="text-green-700 fill-green-600/90 animate-grow" size={28} />
          </div>
        </>
      )}
      
      {/* Red Flower - using the flower component */}
      {showFlowers && (
        <div className="absolute" 
            style={{ 
              bottom: '150px', 
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 30
            }}>
          <Flower className="text-red-500 fill-[#ea384c] w-16 h-16" strokeWidth={1.5} />
          
          {/* Flower center */}
          <div className="absolute h-4 w-4 rounded-full bg-slate-900 z-40"
               style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
        </div>
      )}
      
      {/* Semi-transparent box behind the streak counter */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="bg-white bg-opacity-70 px-6 py-2 rounded-full shadow-sm">
          <span className="text-3xl font-bold text-blue-900">{streak}</span>
          <span className="text-lg text-blue-800"> / {maxStreak} days</span>
        </div>
      </div>
    </div>
  );
};

export default PlantProgress;
