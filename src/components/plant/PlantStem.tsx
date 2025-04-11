
import React from 'react';

interface PlantStemProps {
  growthPercentage: number;
  showSeedling: boolean;
}

const PlantStem: React.FC<PlantStemProps> = ({ growthPercentage, showSeedling }) => {
  return (
    <>
      {/* Plant stem - straight stem with slight natural curve */}
      {showSeedling && (
        <div 
          className="absolute z-10 transition-all duration-1000 ease-out"
          style={{ 
            bottom: '18px',
            left: 'calc(50%)',
            height: `${Math.max(5, (growthPercentage / 100) * 160)}px`,
            width: '2px',
            background: 'linear-gradient(to right, #1a7a47, #2A9A67, #1a7a47)',
            transform: `rotate(${Math.sin(growthPercentage / 30) * 3}deg)`,
            transformOrigin: 'bottom center'
          }}
        />
      )}
    </>
  );
};

export default PlantStem;
