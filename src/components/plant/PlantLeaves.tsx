
import React from 'react';
import LeafPair from './LeafPair';

interface PlantLeavesProps {
  showSprout: boolean;
  showSmallPlant: boolean;
  showMediumPlant: boolean;
  showLargePlant: boolean;
}

const PlantLeaves: React.FC<PlantLeavesProps> = ({ 
  showSprout, 
  showSmallPlant, 
  showMediumPlant, 
  showLargePlant 
}) => {
  return (
    <>
      {/* Small leaves near bottom - more vibrant colors */}
      {showSprout && (
        <LeafPair
          bottomPosition={40}
          size={16}
          horizontalOffset={10}
          angle={40}
          color="text-green-600"
          fillColor="fill-green-500/80"
          zIndex={1}
        />
      )}
      
      {/* Medium-sized leaves - adjusted positioning */}
      {showSmallPlant && (
        <LeafPair
          bottomPosition={75}
          size={22}
          horizontalOffset={16}
          angle={30}
          color="text-green-600"
          fillColor="fill-green-500/90"
          zIndex={1}
        />
      )}
      
      {/* Larger leaves */}
      {showMediumPlant && (
        <LeafPair
          bottomPosition={110}
          size={26}
          horizontalOffset={20}
          angle={25}
          color="text-green-600"
          fillColor="fill-green-500/80"
          zIndex={1}
        />
      )}
      
      {/* Top leaves/plant crown */}
      {showLargePlant && (
        <LeafPair
          bottomPosition={145}
          size={30}
          horizontalOffset={22}
          angle={20}
          color="text-green-700"
          fillColor="fill-green-600/90"
          zIndex={1}
        />
      )}
    </>
  );
};

export default PlantLeaves;
