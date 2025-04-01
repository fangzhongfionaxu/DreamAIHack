
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BadgeDisplay, { AchievementBadge } from "@/components/BadgeDisplay";
import Navigation from "@/components/Navigation";
import { Bell, MessageSquare, Award, CheckCircle, Calendar, Heart, Shield } from "lucide-react";

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

// Sample friends
const friends = [
  { id: "1", name: "Alex", avatar: "", streak: 14 },
  { id: "2", name: "Jordan", avatar: "", streak: 9 },
  { id: "3", name: "Taylor", avatar: "", streak: 24 }
];

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <div className="p-4 bg-white border-b">
        <h1 className="text-2xl font-semibold text-brand-dark">Profile</h1>
      </div>
      
      <div className="p-4">
        <Card className="mb-4">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Avatar className="h-20 w-20 border-4 border-brand">
                <AvatarFallback className="bg-brand text-white text-xl">JD</AvatarFallback>
                <AvatarImage src="" />
              </Avatar>
              
              <div className="ml-4">
                <h2 className="text-xl font-semibold">Jane Doe</h2>
                <p className="text-muted-foreground">7-day streak 🌱</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    Edit Profile
                  </Button>
                  <Button size="sm" className="bg-brand hover:bg-brand-dark text-xs">
                    <Bell className="h-3 w-3 mr-1" />
                    Notifications
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="achievements" className="mb-4">
          <TabsList className="w-full">
            <TabsTrigger value="achievements" className="flex-1">
              Achievements
            </TabsTrigger>
            <TabsTrigger value="social" className="flex-1">
              Friends
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="achievements" className="mt-4">
            <BadgeDisplay badges={badges} />
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Treatment Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Brace Wearing Time</span>
                      <span className="text-sm text-muted-foreground">16/18 hours</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full">
                      <div className="h-2 bg-brand rounded-full" style={{ width: '89%' }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Exercise Completion</span>
                      <span className="text-sm text-muted-foreground">4/5 this week</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full">
                      <div className="h-2 bg-brand rounded-full" style={{ width: '80%' }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Treatment Plan</span>
                      <span className="text-sm text-muted-foreground">Month 2 of 6</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full">
                      <div className="h-2 bg-brand rounded-full" style={{ width: '33%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="social" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Friends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {friends.map(friend => (
                  <div key={friend.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                        <AvatarImage src={friend.avatar} />
                      </Avatar>
                      <div className="ml-3">
                        <p className="font-medium">{friend.name}</p>
                        <p className="text-sm text-muted-foreground">{friend.streak} day streak</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Message</Button>
                  </div>
                ))}
                
                <Separator className="my-4" />
                
                <div className="text-center">
                  <Button className="bg-brand hover:bg-brand-dark">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat with Friends
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-4">
                  <p className="text-muted-foreground mb-4">Join challenges with friends to stay motivated!</p>
                  <Button className="bg-brand hover:bg-brand-dark">Join a Challenge</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Profile;
