
import React from 'react';
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <div className="p-4 border-b bg-white">
        <h1 className="text-2xl font-semibold text-brand-dark">Profile</h1>
      </div>
      
      <div className="p-4 flex-1 bg-gradient-to-br from-pastel-pink to-pastel-yellow">
        <Card className="mb-4">
          <ProfileHeader />
        </Card>
        
        <ProfileTabs />
      </div>
      
      <Navigation />
    </div>
  );
};

export default Profile;
