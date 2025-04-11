
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

  // Try different possible paths
  const possiblePaths = [
    `/assets/plants/${imageName}`,  // If assets is directly in public
    `/public/assets/plants/${imageName}`, // If using public in the path
    `assets/plants/${imageName}`,   // Without leading slash
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const currentSrc = e.currentTarget.src;
    console.error(`Failed to load image: ${currentSrc}`);
    
    // Try the next possible path
    const currentPathIndex = possiblePaths.findIndex(path => 
      currentSrc.endsWith(path) || currentSrc.includes(path));
    
    const nextPathIndex = currentPathIndex + 1;
    
    if (nextPathIndex < possiblePaths.length) {
      console.log(`Trying next path: ${possiblePaths[nextPathIndex]}`);
      e.currentTarget.src = possiblePaths[nextPathIndex];
    } else {
      // If all paths fail, hide the image
      console.error("All image paths failed");
      setImageError(true);
    }
  };

  if (imageError) {
    return (
      <div className="flex items-center justify-center py-4 h-48 bg-gray-100">
        <p className="text-gray-500">Image not found</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-4 h-48">
      <img 
        src={possiblePaths[0]} 
        alt={`Plant at ${growthPercentage}% growth`}
        className="max-h-full transition-all duration-700 ease-in-out"
        onError={handleImageError}
      />
    </div>
  );
};

export default PlantImage;
