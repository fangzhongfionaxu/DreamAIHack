
import React from 'react';
import ReferralSettings from "@/components/settings/ReferralSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import TreatmentSettings from "@/components/settings/TreatmentSettings";
import AIAssistantSettings from "@/components/settings/AIAssistantSettings";
import PrivacySettings from "@/components/settings/PrivacySettings";
import HelpSupport from "@/components/settings/HelpSupport";
import FeedbackSettings from "@/components/settings/FeedbackSettings";

const SettingsTab = () => {
  return (
    <div className="space-y-4">
      <ReferralSettings />
      <FeedbackSettings />
      <NotificationSettings />
      <TreatmentSettings />
      <AIAssistantSettings />
      <PrivacySettings />
      <HelpSupport />
      
      <div className="flex justify-center pt-2 pb-6">
        <p className="text-sm text-muted-foreground">
          Embrace v1.0 • Building healthier habits
        </p>
      </div>
    </div>
  );
};

export default SettingsTab;
