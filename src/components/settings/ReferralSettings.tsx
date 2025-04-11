
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Share } from "lucide-react";

const ReferralSettings = () => {
  const INVITATION_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfxLM6lGL5VGjBwZUtG_YGE8h_M0ml9O_CLbUSP54bgXPb4RA/viewform?usp=sharing";
  
  const handleInvite = () => {
    window.open(INVITATION_FORM_URL, '_blank', 'noopener,noreferrer');
  };
  
  return (
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
  );
};

export default ReferralSettings;
