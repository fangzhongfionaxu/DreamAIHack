
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Clock } from "lucide-react";

const NotificationSettings = () => {
  return (
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
  );
};

export default NotificationSettings;
