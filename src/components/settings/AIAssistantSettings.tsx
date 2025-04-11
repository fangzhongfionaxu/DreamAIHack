
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { MessageSquare } from "lucide-react";

const AIAssistantSettings = () => {
  return (
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
  );
};

export default AIAssistantSettings;
