
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Shield } from "lucide-react";

const PrivacySettings = () => {
  return (
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
  );
};

export default PrivacySettings;
