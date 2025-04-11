
import React from 'react';

interface PlantImageProps {
  growthPercentage: number;
}

const PlantImage: React.FC<PlantImageProps> = ({ growthPercentage }) => {
  // Determine which image to show based on growth percentage
  let imagePath = "";
  
  if (growthPercentage < 5) {
    // 0% - Empty pot
    imagePath = "/assets/plants/plant-0.png";
  } else if (growthPercentage < 20) {
    // 10% - Seedling
    imagePath = "/assets/plants/plant-10.png";
  } else if (growthPercentage < 50) {
    // 25% - Small sprout with leaves
    imagePath = "/assets/plants/plant-25.png";
  } else if (growthPercentage < 75) {
    // 50% - Medium plant
    imagePath = "/assets/plants/plant-50.png";
  } else if (growthPercentage < 95) {
    // 75% - Larger plant with more leaves
    imagePath = "/assets/plants/plant-75.png";
  } else {
    // 100% - Fully bloomed flower
    imagePath = "/assets/plants/plant-100.png";
  }

  return (
    <div className="flex items-center justify-center py-4 h-48">
      <img 
        src={imagePath} 
        alt={`Plant at ${growthPercentage}% growth`}
        className="max-h-full transition-all duration-700 ease-in-out"
      />
    </div>
  );
};

export default PlantImage;
