
import React, { createContext, useState, useContext } from 'react';

interface StreakContextType {
  streak: number;
  setStreak: React.Dispatch<React.SetStateAction<number>>;
}

const StreakContext = createContext<StreakContextType | undefined>(undefined);

export const StreakProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize with the streak value of 23 days
  const [streak, setStreak] = useState(23);

  return (
    <StreakContext.Provider value={{ streak, setStreak }}>
      {children}
    </StreakContext.Provider>
  );
};

export const useStreak = () => {
  const context = useContext(StreakContext);
  if (context === undefined) {
    throw new Error('useStreak must be used within a StreakProvider');
  }
  return context;
};
