
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell, UserCog, LogOut, PenSquare } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useStreak } from "@/contexts/StreakContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

const ProfileHeader = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { streak } = useStreak();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [username, setUsername] = useState(user?.user_metadata?.username || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || '');
  const [isLoading, setIsLoading] = useState(false);
  
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

  const handleEditProfile = () => {
    setIsEditDialogOpen(true);
    setUsername(user?.user_metadata?.username || '');
    setAvatarUrl(user?.user_metadata?.avatar_url || '');
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          username: username,
          avatar_url: avatarUrl,
        },
      });

      if (error) throw error;

      // Also update the profile table if username changed
      await supabase
        .from('profiles')
        .update({ 
          username: username,
          avatar_url: avatarUrl 
        })
        .eq('id', user.id);

      toast({
        title: "Profile updated successfully",
        duration: 3000,
      });
      
      setIsEditDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
            <Button 
              size="icon" 
              variant="outline" 
              className="h-9 w-9"
              onClick={handleEditProfile}
            >
              <PenSquare className="h-4 w-4" />
            </Button>
            
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center mb-4">
              <Avatar className="h-24 w-24 border-4 border-brand mb-2">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt={username || "User"} />
                ) : (
                  <AvatarFallback className="bg-teal-500 text-white text-2xl">{getUserInitials()}</AvatarFallback>
                )}
              </Avatar>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="avatarUrl">Avatar URL</Label>
              <Input 
                id="avatarUrl" 
                value={avatarUrl} 
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://example.com/avatar.png"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter a URL to an image online or leave blank for default
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveProfile}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CardContent>
  );
};

export default ProfileHeader;
