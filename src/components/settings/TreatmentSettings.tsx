
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const TreatmentSettings = () => {
  return (
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
  );
};

export default TreatmentSettings;
