
import React from 'react';

const FlowerPot: React.FC = () => {
  return (
    <>
      {/* Flower pot */}
      <div className="absolute bottom-0 w-20 h-16 flex items-center justify-center z-10">
        <div className="absolute bottom-0 w-20 h-14 bg-gradient-to-r from-amber-700 to-amber-500 rounded-t-full overflow-hidden">
          <div className="absolute top-0 w-22 h-2 bg-amber-800 rounded-t-full"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-amber-900 rounded-full"></div>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-3 bg-amber-900/60 blur-sm rounded-full"></div>
      </div>
      
      {/* Soil */}
      <div className="absolute bottom-12 w-16 h-6 bg-gradient-to-b from-amber-900 to-amber-800 rounded-t-xl overflow-hidden z-10">
        <div className="absolute inset-0 opacity-30">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full bg-amber-950" 
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FlowerPot;
