
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
      {/* Small leaves near bottom */}
      {showSprout && (
        <LeafPair
          bottomPosition={40}
          size={14}
          horizontalOffset={10}
          angle={40}
          color="text-green-700"
          fillColor="fill-green-600/70"
        />
      )}
      
      {/* Medium-sized leaves */}
      {showSmallPlant && (
        <LeafPair
          bottomPosition={70}
          size={20}
          horizontalOffset={16}
          angle={30}
          color="text-green-600"
          fillColor="fill-green-500/70"
        />
      )}
      
      {/* Larger leaves */}
      {showMediumPlant && (
        <LeafPair
          bottomPosition={100}
          size={24}
          horizontalOffset={20}
          angle={25}
          color="text-green-600"
          fillColor="fill-green-500/80"
        />
      )}
      
      {/* Top leaves/plant crown */}
      {showLargePlant && (
        <LeafPair
          bottomPosition={130}
          size={28}
          horizontalOffset={22}
          angle={20}
          color="text-green-700"
          fillColor="fill-green-600/90"
        />
      )}
    </>
  );
};

export default PlantLeaves;
