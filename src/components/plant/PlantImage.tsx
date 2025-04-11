
import React, { useState } from 'react';

interface PlantImageProps {
  growthPercentage: number;
}

const PlantImage: React.FC<PlantImageProps> = ({ growthPercentage }) => {
  const [imageError, setImageError] = useState(false);
  
  // Determine which image to show based on growth percentage
  let imageName = "";
  
  if (growthPercentage < 5) {
    // 0% - Empty pot
    imageName = "plant-0.png";
  } else if (growthPercentage < 20) {
    // 10% - Seedling
    imageName = "plant-10.png";
  } else if (growthPercentage < 50) {
    // 25% - Small sprout with leaves
    imageName = "plant-25.png";
  } else if (growthPercentage < 75) {
    // 50% - Medium plant
    imageName = "plant-50.png";
  } else if (growthPercentage < 95) {
    // 75% - Larger plant with more leaves
    imageName = "plant-75.png";
  } else {
    // 100% - Fully bloomed flower
    imageName = "plant-100.png";
  }

  // Assets in the public folder are served from the root path
  // The correct path is just "/assets/plants/..." without "public"
  const imagePath = `/assets/plants/${imageName}`;
  
  const handleImageError = () => {
    console.log(`Failed to load image from path: ${imagePath}`);
    setImageError(true);
  };

  if (imageError) {
    return (
      <div className="flex flex-col items-center justify-center py-4 h-48 bg-gray-100 rounded-lg">
        <p className="text-gray-500 mb-2">Image not found</p>
        <p className="text-xs text-gray-400">Looking for: {imagePath}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-4 h-48">
      <img 
        src={imagePath} 
        alt={`Plant at ${growthPercentage}% growth`}
        className="max-h-full transition-all duration-700 ease-in-out"
        onError={handleImageError}
      />
    </div>
  );
};

export default PlantImage;
