
import React from 'react';

interface PlantImageProps {
  growthPercentage: number;
}

const PlantImage: React.FC<PlantImageProps> = ({ growthPercentage }) => {
  // Determine which image to show based on growth percentage
  let imagePath = "";
  
  if (growthPercentage < 5) {
    // 0% - Empty pot
    imagePath = "/lovable-uploads/6a00a18f-9fce-4161-a12b-61fd2e8e5319.png";
  } else if (growthPercentage < 20) {
    // 10% - Seedling
    imagePath = "/lovable-uploads/35033a9b-7096-4b9f-9e31-9b4a3955b306.png";
  } else if (growthPercentage < 50) {
    // 25% - Small sprout with leaves
    imagePath = "/lovable-uploads/8cd1c5fd-285c-490d-aeaf-96665efee047.png";
  } else if (growthPercentage < 75) {
    // 50% - Medium plant
    imagePath = "/lovable-uploads/ca5d4df5-a91f-48d7-86a0-4e0753851179.png";
  } else if (growthPercentage < 95) {
    // 75% - Larger plant with more leaves
    imagePath = "/lovable-uploads/7a4ad5b7-6fc8-42b2-a3a8-81c24e18d97f.png";
  } else {
    // 100% - Fully bloomed flower
    imagePath = "/lovable-uploads/1898e3b9-8830-4525-9ec2-4d31cd5b47d1.png";
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
