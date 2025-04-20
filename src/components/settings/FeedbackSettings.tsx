
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const FeedbackSettings = () => {
  const FEEDBACK_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf6pokmMXJw31zakPOrJmm6CLNfs2bW1myNirN9zwZaaxADkw/viewform?usp=dialog";
  
  const handleSubmitFeedback = () => {
    window.open(FEEDBACK_FORM_URL, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Submit Feedback</p>
          </div>
          <Button onClick={handleSubmitFeedback} variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Submit Feedback Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackSettings;
