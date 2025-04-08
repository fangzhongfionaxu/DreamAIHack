
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AchievementsTab from './AchievementsTab';
import SocialTab from './SocialTab';

const ProfileTabs = () => {
  return (
    <Tabs defaultValue="achievements" className="mb-4">
      <TabsList className="w-full">
        <TabsTrigger value="achievements" className="flex-1">
          Achievements
        </TabsTrigger>
        <TabsTrigger value="social" className="flex-1">
          Friends
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="achievements" className="mt-4">
        <AchievementsTab />
      </TabsContent>
      
      <TabsContent value="social" className="mt-4">
        <SocialTab />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
