
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, UserPlus } from "lucide-react";

// Sample friends
const friends = [
  { id: "1", name: "Alex", avatar: "", streak: 14 },
  { id: "2", name: "Jordan", avatar: "", streak: 9 },
  { id: "3", name: "Taylor", avatar: "", streak: 24 }
];

const FriendsList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Friends</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {friends.map(friend => (
          <FriendItem key={friend.id} friend={friend} />
        ))}
        
        <Separator className="my-4" />
        
        <div className="text-center">
          <Button className="bg-brand hover:bg-brand-dark">
            <UserPlus className="h-4 w-4 mr-2" />
            Chat with Friends
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface FriendItemProps {
  friend: {
    id: string;
    name: string;
    avatar: string;
    streak: number;
  };
}

const FriendItem = ({ friend }: FriendItemProps) => {
  return (
    <div className="flex items-center justify-between">
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
      <Button variant="outline" size="icon">
        <MessageSquare className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default FriendsList;
