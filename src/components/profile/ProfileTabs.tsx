
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SettingsTab from './SettingsTab';

const ProfileTabs = () => {
  return (
    <Tabs defaultValue="settings" className="mb-4">
      <TabsList className="w-full">
        <TabsTrigger value="settings" className="flex-1">
          Settings
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="settings" className="mt-4">
        <SettingsTab />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
