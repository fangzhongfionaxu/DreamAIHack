
import React from 'react';
import Navigation from "@/components/Navigation";
import ReferralSettings from "@/components/settings/ReferralSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import TreatmentSettings from "@/components/settings/TreatmentSettings";
import AIAssistantSettings from "@/components/settings/AIAssistantSettings";
import PrivacySettings from "@/components/settings/PrivacySettings";
import HelpSupport from "@/components/settings/HelpSupport";
import FeedbackSettings from "@/components/settings/FeedbackSettings";

const Settings = () => {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <div className="p-4 bg-white border-b">
        <h1 className="text-2xl font-semibold text-brand-dark">Settings</h1>
      </div>
      
      <div className="p-4 space-y-4 flex-1 bg-gradient-to-br from-pastel-pink to-pastel-yellow">
        <ReferralSettings />
        <FeedbackSettings />
        <NotificationSettings />
        <TreatmentSettings />
        <AIAssistantSettings />
        <PrivacySettings />
        <HelpSupport />
        
        <div className="flex justify-center pt-2 pb-6">
          <p className="text-sm text-muted-foreground">
            Embrace Habits v1.0 • HIPAA Compliant
          </p>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Settings;
