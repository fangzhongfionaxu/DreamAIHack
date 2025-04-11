
import React from 'react';
import { Leaf } from 'lucide-react';

interface LeafPairProps {
  bottomPosition: number;
  size: number;
  horizontalOffset: number;
  angle: number;
  color: string;
  fillColor: string;
}

const LeafPair: React.FC<LeafPairProps> = ({ 
  bottomPosition,
  size,
  horizontalOffset,
  angle,
  color,
  fillColor
}) => {
  return (
    <>
      {/* Left leaf - properly mirrored with enhanced animation */}
      <div 
        className="absolute z-15 animate-in fade-in duration-700 hover:rotate-3 transition-transform" 
        style={{ 
          bottom: `${bottomPosition}px`, 
          left: 'calc(50%)', 
          transform: `translateX(-${horizontalOffset}px) rotate(-${angle}deg) scaleX(-1)`,
          transformOrigin: 'right bottom',
          filter: 'drop-shadow(0 2px 3px rgba(0,50,0,0.1))'
        }}>
        <Leaf 
          className={`${color} ${fillColor} animate-grow transition-all duration-300 hover:scale-105`} 
          size={size}
          strokeWidth={1.5} 
        />
      </div>
      
      {/* Right leaf with enhanced animation */}
      <div 
        className="absolute z-15 animate-in fade-in duration-700 hover:rotate-[-3deg] transition-transform" 
        style={{ 
          bottom: `${bottomPosition}px`, 
          left: 'calc(50%)', 
          transform: `translateX(${horizontalOffset}px) rotate(${angle}deg)`,
          transformOrigin: 'left bottom',
          filter: 'drop-shadow(0 2px 3px rgba(0,50,0,0.1))'
        }}>
        <Leaf 
          className={`${color} ${fillColor} animate-grow transition-all duration-300 hover:scale-105`} 
          size={size} 
          strokeWidth={1.5}
        />
      </div>
    </>
  );
};

export default LeafPair;
