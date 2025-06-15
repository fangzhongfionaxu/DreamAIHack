import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
const NotificationSettings = () => {
  return <Card>
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
            <p className="font-medium">Progress Updates</p>
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
      </CardContent>
    </Card>;
};
export default NotificationSettings;