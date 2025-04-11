
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import Navigation from "@/components/Navigation";
import { Bell, Calendar, MessageSquare, Clock, Shield, HelpCircle, Share, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const INVITATION_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfxLM6lGL5VGjBwZUtG_YGE8h_M0ml9O_CLbUSP54bgXPb4RA/viewform?usp=sharing";
  
  const handleInvite = () => {
    window.open(INVITATION_FORM_URL, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <div className="p-4 bg-white border-b">
        <h1 className="text-2xl font-semibold text-brand-dark">Settings</h1>
      </div>
      
      <div className="p-4 space-y-4 flex-1 bg-gradient-to-br from-pastel-pink to-pastel-yellow">
        {/* New Referrals Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share className="h-5 w-5" />
              Referrals
            </CardTitle>
            <CardDescription>
              Invite friends and family to join emBrace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Refer Friends</p>
                <p className="text-sm text-muted-foreground">
                  Share emBrace with others who might benefit
                </p>
              </div>
              <Button onClick={handleInvite} variant="outline">
                <Share className="h-4 w-4 mr-2" />
                Invite
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure when and how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Daily Reminders</p>
                <p className="text-sm text-muted-foreground">
                  Receive reminders for your daily activities
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Treatment Updates</p>
                <p className="text-sm text-muted-foreground">
                  Updates about your treatment progress
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Chat Messages</p>
                <p className="text-sm text-muted-foreground">
                  Notifications for new messages
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator className="my-2" />
            
            <div>
              <p className="font-medium mb-2">Quiet Hours</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Clock className="h-4 w-4" />
                <span>Don't send notifications during these hours</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">10:00 PM</span>
                <span className="text-sm">7:00 AM</span>
              </div>
              <Slider defaultValue={[22, 7]} max={24} step={1} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Treatment Schedule
            </CardTitle>
            <CardDescription>
              Configure your treatment schedule and reminders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Daily Activity Check-in</p>
                <p className="text-sm text-muted-foreground">
                  Set daily time for activity check-in
                </p>
              </div>
              <Button variant="outline" size="sm">
                8:00 PM
              </Button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Weekly Progress Review</p>
                <p className="text-sm text-muted-foreground">
                  Day to review your weekly progress
                </p>
              </div>
              <Button variant="outline" size="sm">
                Sunday
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              AI Assistant
            </CardTitle>
            <CardDescription>
              Configure how your AI assistant interacts with you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Default Persona</p>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred assistant style
                </p>
              </div>
              <Button variant="outline" size="sm">
                Warm
              </Button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Auto-adjust Persona</p>
                <p className="text-sm text-muted-foreground">
                  Allow AI to adjust its style based on your interactions
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Proactive Reminders</p>
                <p className="text-sm text-muted-foreground">
                  AI will proactively remind you about activities
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Data
            </CardTitle>
            <CardDescription>
              Manage your privacy and data settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Data Sharing</p>
                <p className="text-sm text-muted-foreground">
                  Share anonymized data to improve treatment
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Treatment Progress Visibility</p>
                <p className="text-sm text-muted-foreground">
                  Allow friends to see your treatment progress
                </p>
              </div>
              <Switch />
            </div>
            
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                Export My Data
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Help & Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="link" className="w-full justify-start p-0 h-auto text-left">
              Contact Support
            </Button>
            <Button variant="link" className="w-full justify-start p-0 h-auto text-left">
              FAQ & User Guide
            </Button>
            <Button variant="link" className="w-full justify-start p-0 h-auto text-left">
              Privacy Policy
            </Button>
            <Button variant="link" className="w-full justify-start p-0 h-auto text-left">
              Terms of Service
            </Button>
          </CardContent>
        </Card>
        
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
