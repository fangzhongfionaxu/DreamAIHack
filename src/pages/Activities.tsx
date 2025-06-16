
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import PlantProgress from "@/components/PlantProgress";
import MotivationalChatBubble from "@/components/plant/MotivationalChatBubble";
import { useStreak } from "@/contexts/StreakContext";
import AchievementsTab from "@/components/profile/AchievementsTab";

const Activities = () => {
  const { streak } = useStreak();

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <div className="p-3 sm:p-4 border-b bg-white">
        <h1 className="text-xl sm:text-2xl font-semibold text-brand-dark">Activities</h1>
      </div>
      
      <Tabs defaultValue="streak" className="flex-1">
        <div className="px-3 sm:px-4 py-2 border-b sticky top-0 bg-background z-10">
          <TabsList className="w-full h-9 sm:h-10">
            <TabsTrigger value="today" className="flex-1 text-xs sm:text-sm">Achievements</TabsTrigger>
            <TabsTrigger value="streak" className="flex-1 text-xs sm:text-sm">My Progress</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="today" className="p-3 sm:p-4 bg-gradient-to-br from-pastel-pink to-pastel-yellow">
          <AchievementsTab />
        </TabsContent>
        
        <TabsContent value="streak" className="p-3 sm:p-4 bg-gradient-to-br from-pastel-pink to-pastel-yellow">
          <Card className="streak-container">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-brand-dark text-center mb-3 sm:mb-4">
                Your Growth Journey
              </h3>
              
              {/* Chat Bubble positioned directly below the heading and centered */}
              <div className="flex justify-center mb-3 sm:mb-4">
                <MotivationalChatBubble />
              </div>
              
              <PlantProgress 
                streak={streak}
                maxStreak={30}
              />
              
              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                  Keep going! You're on day {streak} of your 30-day journey.
                </p>
                <Button className="bg-brand hover:bg-brand-dark text-sm sm:text-base px-4 sm:px-6">
                  Share Your Progress
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Navigation />
    </div>
  );
};

export default Activities;
