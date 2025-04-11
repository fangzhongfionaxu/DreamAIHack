
import React from 'react';

interface StreakCounterProps {
  streak: number;
  maxStreak: number;
}

const StreakCounter: React.FC<StreakCounterProps> = ({ streak, maxStreak }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-center z-30">
      <div className="bg-white bg-opacity-70 px-6 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
        <span className="text-3xl font-bold text-blue-900">{streak}</span>
        <span className="text-lg text-blue-800"> / {maxStreak} days</span>
      </div>
    </div>
  );
};

export default StreakCounter;
