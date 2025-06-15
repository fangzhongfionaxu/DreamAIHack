import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BadgeDisplay, { AchievementBadge } from "@/components/BadgeDisplay";
import { useStreak } from "@/contexts/StreakContext";
import { CheckCircle, Calendar, MessageSquare, Heart, Award, Shield } from "lucide-react";

// Sample badge data
const streakBadgesData = [
  { name: 'First Milestone', requiredStreak: 1, image: '/assets/badges/badge-0.png', description: "You've started your journey!" },
  { name: 'Consistency Champion', requiredStreak: 30, image: '/assets/badges/badge-1.png', description: '30 days in a row. Incredible!' },
  { name: 'Health Master', requiredStreak: 60, image: '/assets/badges/badge-2.png', description: '60 days of commitment!' },
  { name: 'Streak Pro', requiredStreak: 90, image: '/assets/badges/badge-3.png', description: '90 days! You are a pro!' },
  { name: 'Streak Legend', requiredStreak: 120, image: '/assets/badges/badge-4.png', description: '120 days! Truly legendary!' },
  { name: 'Ultimate Habit', requiredStreak: 150, image: '/assets/badges/badge-5.png', description: '150 days! An unbreakable habit!' },
];

const AchievementsTab = () => {
  const { streak } = useStreak();

  const badges: AchievementBadge[] = streakBadgesData.map((badge, index) => {
    const earned = streak >= badge.requiredStreak;
    return {
      id: `streak-badge-${index}`,
      name: badge.name,
      description: badge.description,
      imageUrl: badge.image,
      earned,
      progress: streak,
      maxProgress: badge.requiredStreak,
    };
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Badge Collection</CardTitle>
          <p className="text-sm text-muted-foreground">Complete streaks to unlock badges and show your commitment to health!</p>
        </CardHeader>
        <CardContent>
          <BadgeDisplay badges={badges} />
        </CardContent>
      </Card>
      
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
