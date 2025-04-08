
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell, UserCog } from "lucide-react";

const ProfileHeader = () => {
  return (
    <CardContent className="p-6">
      <div className="flex items-center">
        <Avatar className="h-20 w-20 border-4 border-brand">
          <AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt="Jane Doe" />
          <AvatarFallback className="bg-brand text-white text-xl">JD</AvatarFallback>
        </Avatar>
        
        <div className="ml-4">
          <h2 className="text-xl font-semibold">Jane Doe</h2>
          <p className="text-muted-foreground">7-day streak 🌱</p>
          <div className="flex gap-2 mt-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon" variant="outline" className="h-9 w-9">
                  <UserCog className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <p className="text-sm">Edit Profile</p>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon" className="h-9 w-9 bg-brand hover:bg-brand-dark">
                  <Bell className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <p className="text-sm">Notifications</p>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </CardContent>
  );
};

export default ProfileHeader;
