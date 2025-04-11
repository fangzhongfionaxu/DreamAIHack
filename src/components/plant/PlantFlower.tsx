
import React from 'react';
import { Flower } from 'lucide-react';

interface PlantFlowerProps {
  showFlowers: boolean;
}

const PlantFlower: React.FC<PlantFlowerProps> = ({ showFlowers }) => {
  return (
    <>
      {/* Red Flower - using the flower component */}
      {showFlowers && (
        <div className="absolute z-20" 
            style={{ 
              bottom: '160px', 
              left: '50%',
              transform: 'translateX(-50%)',
            }}>
          <Flower className="text-red-500 fill-[#ea384c] w-16 h-16" strokeWidth={1.5} />
          
          {/* Flower center */}
          <div className="absolute h-4 w-4 rounded-full bg-slate-900 z-40"
               style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
        </div>
      )}
    </>
  );
};

export default PlantFlower;
