
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BadgeDisplay, { AchievementBadge } from "@/components/BadgeDisplay";
import { useStreak } from "@/contexts/StreakContext";
import BraceTimeChart from './BraceTimeChart';

// Sample badge data
const streakBadgesData = [
  { name: 'First Milestone', requiredStreak: 1, image: '/assets/badges/badge-1.png', description: "You've started your journey!" },
  { name: 'Consistency Champion', requiredStreak: 30, image: '/assets/badges/badge-2.png', description: '30 days in a row. Incredible!' },
  { name: 'Health Master', requiredStreak: 60, image: '/assets/badges/badge-3.png', description: '60 days of commitment!' },
  { name: 'Streak Pro', requiredStreak: 90, image: '/assets/badges/badge-1.png', description: '90 days! You are a pro!' },
  { name: 'Streak Legend', requiredStreak: 120, image: '/assets/badges/badge-2.png', description: '120 days! Truly legendary!' },
  { name: 'Ultimate Habit', requiredStreak: 150, image: '/assets/badges/badge-3.png', description: '150 days! An unbreakable habit!' },
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
    <div className="space-y-3 sm:space-y-4">
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg">Badge Collection</CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground">Complete streaks to unlock badges and show your commitment to health!</p>
        </CardHeader>
        <CardContent className="pt-0">
          <BadgeDisplay badges={badges} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg">Weekly Brace Time</CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground">Your daily brace wearing time over the last week.</p>
        </CardHeader>
        <CardContent className="pt-0 sm:pt-4">
          <BraceTimeChart />
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementsTab;
