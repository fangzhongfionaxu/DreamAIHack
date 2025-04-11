
import React from 'react';
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";

export const ReferralButton = ({ className }: { className?: string }) => {
  const INVITATION_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfxLM6lGL5VGjBwZUtG_YGE8h_M0ml9O_CLbUSP54bgXPb4RA/viewform?usp=sharing";
  
  const handleInvite = () => {
    window.open(INVITATION_FORM_URL, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <Button 
      variant="outline" 
      className={className}
      onClick={handleInvite}
    >
      <Share className="h-4 w-4 mr-2" />
      Refer Friends
    </Button>
  );
};
