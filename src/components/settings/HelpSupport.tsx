
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const HelpSupport = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          Help & Support
        </CardTitle>
        <CardDescription>
          Pro tip: Ask your AI Assistant any questions about the app!
        </CardDescription>
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
  );
};

export default HelpSupport;
