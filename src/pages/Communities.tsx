
import React from 'react';
import Navigation from '@/components/Navigation';
import FriendsList from '@/components/communities/FriendsList';
import Challenges from '@/components/communities/Challenges';

const Communities = () => {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <div className="p-4 border-b bg-white">
        <h1 className="text-2xl font-semibold text-brand-dark">Community</h1>
      </div>
      
      <div className="p-4 flex-1 bg-gradient-to-br from-pastel-pink to-pastel-yellow space-y-4">
        <FriendsList />
        <Challenges />
      </div>
      
      <Navigation />
    </div>
  );
};

export default Communities;
