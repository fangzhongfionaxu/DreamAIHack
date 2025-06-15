
import React from 'react';
import Navigation from '@/components/Navigation';
import StreakLeaders from '@/components/communities/StreakLeaders';
import MyFriends from '@/components/communities/MyFriends';

const Communities = () => {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <div className="p-4 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <h1 className="text-2xl font-semibold text-brand-dark">Community</h1>
      </div>
      
      <div className="p-4 flex-1 bg-gradient-to-br from-pastel-pink to-pastel-yellow space-y-6">
        <StreakLeaders />
        <MyFriends />
      </div>
      
      <Navigation />
    </div>
  );
};

export default Communities;
