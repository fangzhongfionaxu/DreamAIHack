
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
      {/* Left leaf - properly mirrored */}
      <div className="absolute z-15 animate-in fade-in duration-700 hover:rotate-3 transition-transform" 
          style={{ 
            bottom: `${bottomPosition}px`, 
            left: 'calc(50%)', 
            transform: `translateX(-${horizontalOffset}px) rotate(-${angle}deg) scaleX(-1)`,
            transformOrigin: 'right bottom'
          }}>
        <Leaf className={`${color} ${fillColor} animate-grow`} size={size} />
      </div>
      
      {/* Right leaf */}
      <div className="absolute z-15 animate-in fade-in duration-700 hover:rotate-[-3deg] transition-transform" 
          style={{ 
            bottom: `${bottomPosition}px`, 
            left: 'calc(50%)', 
            transform: `translateX(${horizontalOffset}px) rotate(${angle}deg)`,
            transformOrigin: 'left bottom'
          }}>
        <Leaf className={`${color} ${fillColor} animate-grow`} size={size} />
      </div>
    </>
  );
};

export default LeafPair;
