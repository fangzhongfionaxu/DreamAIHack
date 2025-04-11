
import React from 'react';

interface PlantStemProps {
  growthPercentage: number;
  showSeedling: boolean;
}

const PlantStem: React.FC<PlantStemProps> = ({ growthPercentage, showSeedling }) => {
  // Calculate the height based on growth percentage with a more natural curve
  const stemHeight = Math.max(5, (growthPercentage / 100) * 160);
  
  // Add a slight natural curve that varies with growth
  const curveAmount = Math.sin(growthPercentage / 25) * 3;
  
  // Enhance the stem coloration with a more natural gradient
  const stemGradient = 'linear-gradient(to right, #1a7a47, #2A9A67, #1a7a47)';
  
  return (
    <>
      {/* Plant stem - straight stem with slight natural curve */}
      {showSeedling && (
        <div 
          className="absolute z-10 transition-all duration-1000 ease-out animate-grow"
          style={{ 
            bottom: '18px',
            left: 'calc(50%)',
            height: `${stemHeight}px`,
            width: `${Math.min(3, 1 + growthPercentage / 50)}px`,
            background: stemGradient,
            transform: `rotate(${curveAmount}deg)`,
            transformOrigin: 'bottom center'
          }}
        />
      )}
    </>
  );
};

export default PlantStem;
