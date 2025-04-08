
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BadgeDisplay, { AchievementBadge } from "@/components/BadgeDisplay";
import { CheckCircle, Calendar, MessageSquare, Heart, Award, Shield } from "lucide-react";

// Sample badge data
const badges: AchievementBadge[] = [
  {
    id: "badge1",
    name: "First Week",
    description: "Completed a full week of activities",
    icon: <CheckCircle />,
    earned: true
  },
  {
    id: "badge2",
    name: "Consistent",
    description: "Maintained a 3-day streak",
    icon: <Calendar />,
    earned: true
  },
  {
    id: "badge3",
    name: "Communicator",
    description: "Had 5 conversations with the AI assistant",
    icon: <MessageSquare />,
    earned: true
  },
  {
    id: "badge4",
    name: "Health Streak",
    description: "Completed 10 days of activities",
    icon: <Heart />,
    earned: false,
    progress: 7,
    maxProgress: 10
  },
  {
    id: "badge5",
    name: "Expert",
    description: "Completed 30 days of activities",
    icon: <Award />,
    earned: false,
    progress: 7,
    maxProgress: 30
  },
  {
    id: "badge6",
    name: "Protected",
    description: "Wore your brace for 20 days",
    icon: <Shield />,
    earned: false,
    progress: 5,
    maxProgress: 20
  }
];

const AchievementsTab = () => {
  return (
    <>
      <BadgeDisplay badges={badges} />
      
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-lg">Treatment Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <TreatmentProgressList />
        </CardContent>
      </Card>
    </>
  );
};

const TreatmentProgressList = () => {
  const progressItems = [
    {
      label: "Brace Wearing Time",
      progress: "16/18 hours",
      percentage: 89
    },
    {
      label: "Exercise Completion",
      progress: "4/5 this week",
      percentage: 80
    },
    {
      label: "Treatment Plan",
      progress: "Month 2 of 6",
      percentage: 33
    }
  ];

  return (
    <div className="space-y-2">
      {progressItems.map((item, index) => (
        <div key={index}>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">{item.label}</span>
            <span className="text-sm text-muted-foreground">{item.progress}</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full">
            <div 
              className="h-2 bg-brand rounded-full" 
              style={{ width: `${item.percentage}%` }} 
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AchievementsTab;
