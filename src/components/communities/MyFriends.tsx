
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Plus } from "lucide-react";

// Sample friends from wireframe
const friends = [
  { id: "3", name: "Taylor", avatar: "", streak: 24 },
  { id: "1", name: "Alex", avatar: "", streak: 14 },
  { id: "2", name: "Jordan", avatar: "", streak: 9 },
  // Adding more to show scroll
  { id: "4", name: "Casey", avatar: "", streak: 5 },
  { id: "5", name: "Drew", avatar: "", streak: 2 },
];

const MyFriends = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg flex items-center font-semibold">
          <User className="h-5 w-5 mr-2 text-brand-dark" />
          My Friends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-40">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 pr-4">
                <Button variant="outline" className="flex flex-col items-center justify-center h-28 aspect-square border-dashed border-2 bg-white/70 hover:bg-white/90 text-muted-foreground">
                    <Plus className="h-6 w-6 mb-1" />
                    <span className="text-xs">Add Friend</span>
                </Button>
                {friends.map(friend => (
                <FriendCard key={friend.id} friend={friend} />
                ))}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

interface FriendCardProps {
  friend: {
    id: string;
    name: string;
    avatar: string;
    streak: number;
  };
}

const FriendCard = ({ friend }: FriendCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-pastel-pink/50 h-28 aspect-square">
      <Avatar className="h-10 w-10 mb-2">
        <AvatarFallback className="bg-white text-brand-dark font-semibold">{friend.name.charAt(0)}</AvatarFallback>
        <AvatarImage src={friend.avatar} />
      </Avatar>
      <p className="font-semibold text-sm text-center">{friend.name}</p>
      <p className="text-xs text-muted-foreground">{friend.streak} days</p>
    </div>
  );
};

export default MyFriends;
