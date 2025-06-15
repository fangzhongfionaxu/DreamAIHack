
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AchievementsTab from './AchievementsTab';
import SocialTab from './SocialTab';
import SettingsTab from './SettingsTab';
import CommunitiesTab from './CommunitiesTab';

const ProfileTabs = () => {
  return (
    <Tabs defaultValue="achievements" className="mb-4">
      <TabsList className="w-full">
        <TabsTrigger value="achievements" className="flex-1">
          Achievements
        </TabsTrigger>
        <TabsTrigger value="communities" className="flex-1">
          Communities
        </TabsTrigger>
        <TabsTrigger value="social" className="flex-1">
          Challenges
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex-1">
          Settings
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="achievements" className="mt-4">
        <AchievementsTab />
      </TabsContent>
      
      <TabsContent value="communities" className="mt-4">
        <CommunitiesTab />
      </TabsContent>

      <TabsContent value="social" className="mt-4">
        <SocialTab />
      </TabsContent>

      <TabsContent value="settings" className="mt-4">
        <SettingsTab />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
