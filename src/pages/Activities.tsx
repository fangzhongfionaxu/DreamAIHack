
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import PlantProgress from "@/components/PlantProgress";
import ActivityItem from "@/components/ActivityItem";
import { CheckSquare, FileText, Activity, Calendar, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useStreak } from "@/contexts/StreakContext";

// Sample activity data
const defaultActivities = [
  {
    id: "1",
    title: "Wear Brace",
    description: "Wear your brace for at least 18 hours today.",
    timeOfDay: "All Day",
    icon: <CheckSquare className="w-6 h-6" />,
    completed: false
  },
  {
    id: "2",
    title: "Physical Therapy",
    description: "Complete your prescribed PT exercises.",
    timeOfDay: "Morning",
    icon: <Activity className="w-6 h-6" />,
    completed: false
  },
  {
    id: "3",
    title: "Schroth Exercises",
    description: "20 minutes of Schroth method exercises.",
    timeOfDay: "Evening",
    icon: <Activity className="w-6 h-6" />,
    completed: false
  },
  {
    id: "4",
    title: "Record Curve Measurement",
    description: "Log your current spinal curve measurement.",
    timeOfDay: "Weekly",
    icon: <FileText className="w-6 h-6" />,
    completed: false
  },
  {
    id: "5",
    title: "Therapy Appointment",
    description: "Attend your scheduled therapy session.",
    timeOfDay: "3:00 PM",
    icon: <Calendar className="w-6 h-6" />,
    completed: false
  }
];

const Activities = () => {
  const [activities, setActivities] = useState(defaultActivities);
  const { streak, setStreak } = useStreak();
  const { toast } = useToast();

  const handleCompleteActivity = (id: string) => {
    setActivities(activities.map(activity => 
      activity.id === id 
        ? { ...activity, completed: !activity.completed } 
        : activity
    ));
    
    // Check if we just completed all activities
    const updatedActivities = activities.map(activity => 
      activity.id === id ? { ...activity, completed: !activity.completed } : activity
    );
    
    const allCompleted = updatedActivities.every(activity => activity.completed);
    
    if (allCompleted) {
      // Increment streak and show celebration
      setStreak(prev => prev + 1);
      
      toast({
        title: "Daily streak increased! 🌱",
        description: `You've completed all activities for today! Your streak is now ${streak + 1} days.`,
        duration: 5000,
      });
    }
  };

  const handleAddActivity = () => {
    toast({
      title: "Add New Activity",
      description: "This feature would allow you to create a custom activity.",
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <div className="p-4 border-b bg-white">
        <h1 className="text-2xl font-semibold text-brand-dark">Activities</h1>
      </div>
      
      <Tabs defaultValue="streak" className="flex-1">
        <div className="px-4 py-2 border-b sticky top-0 bg-background z-10">
          <TabsList className="w-full">
            <TabsTrigger value="today" className="flex-1">Today</TabsTrigger>
            <TabsTrigger value="streak" className="flex-1">My Streak</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="today" className="flex-1 p-4 space-y-4 bg-gradient-to-br from-pastel-pink to-pastel-yellow">
          <div className="grid grid-cols-1 gap-4">
            {activities.map(activity => (
              <ActivityItem
                key={activity.id}
                id={activity.id}
                title={activity.title}
                description={activity.description}
                icon={activity.icon}
                completed={activity.completed}
                timeOfDay={activity.timeOfDay}
                onComplete={handleCompleteActivity}
              />
            ))}
          </div>
          
          {/* Add Activity Floating Button */}
          <Button 
            onClick={handleAddActivity}
            className="fixed bottom-24 right-4 h-14 w-14 rounded-full bg-brand hover:bg-brand-dark shadow-lg z-20"
            size="icon"
          >
            <Plus className="h-6 w-6" />
          </Button>
          
          <Card className="mt-6 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-pastel-pink to-pastel-yellow p-4 text-center">
                <h3 className="font-semibold text-brand-dark">
                  Current Streak: {streak} days
                </h3>
                <p className="text-sm text-muted-foreground">
                  Complete all activities to grow your plant!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="streak" className="p-4 bg-gradient-to-br from-pastel-pink to-pastel-yellow">
          <Card className="streak-container">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-brand-dark text-center mb-4">
                Your Growth Journey
              </h3>
              
              <PlantProgress 
                streak={streak}
                maxStreak={30}
                forceGrowthPercentage={75} // Force exactly 75% growth
              />
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Keep going! You're on day {streak} of your 30-day journey.
                </p>
                <Button className="bg-brand hover:bg-brand-dark">
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
