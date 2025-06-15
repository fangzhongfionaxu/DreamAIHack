import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { MessageSquare } from "lucide-react";
const AIAssistantSettings = () => {
  return <Card>
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
            <p className="font-medium">Adaptive interactions</p>
            <p className="text-sm text-muted-foreground">
              Allow AI to adjust its style based on your interactions
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Context & Memory</p>
            <p className="text-sm text-muted-foreground">Allow AI to remember you and your interactions</p>
          </div>
          <Switch defaultChecked />
        </div>
      </CardContent>
    </Card>;
};
export default AIAssistantSettings;