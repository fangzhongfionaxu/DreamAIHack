import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell, UserCog, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const ProfileHeader = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  
  const streak = 12;

  const getUserInitials = () => {
    if (!user) return "?";
    
    const username = user.user_metadata?.username || user.email || "";
    
    if (!username) return "?";
    
    if (username.includes(" ")) {
      const names = username.split(" ");
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
    }
    
    return username.charAt(0).toUpperCase();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <CardContent className="p-6">
      <div className="flex items-center">
        <Avatar className="h-20 w-20 border-4 border-brand">
          {user?.user_metadata?.avatar_url ? (
            <AvatarImage src={user.user_metadata.avatar_url} alt={user.user_metadata?.username || "User"} />
          ) : (
            <AvatarFallback className="bg-teal-500 text-white text-xl">{getUserInitials()}</AvatarFallback>
          )}
        </Avatar>
        
        <div className="ml-4">
          <h2 className="text-xl font-semibold">{user?.user_metadata?.username || user?.email || "Anonymous User"}</h2>
          <p className="text-muted-foreground">{streak}-day streak 🌱</p>
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
            
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  size="icon" 
                  className="h-9 w-9 bg-red-500 hover:bg-red-600 text-white" 
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <p className="text-sm">Sign Out</p>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </CardContent>
  );
};

export default ProfileHeader;
