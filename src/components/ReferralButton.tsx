
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";

export const ReferralButton = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  
  return (
    <Button 
      variant="outline" 
      className={className}
      onClick={() => navigate('/referrals')}
    >
      <Share className="h-4 w-4 mr-2" />
      Refer Friends
    </Button>
  );
};
