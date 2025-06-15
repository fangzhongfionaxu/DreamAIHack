import React from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell, LogOut, PenSquare } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
interface ProfileActionsProps {
  onEditProfile: () => void;
}
const ProfileActions = ({
  onEditProfile
}: ProfileActionsProps) => {
  const {
    signOut
  } = useAuth();
  const {
    toast
  } = useToast();
  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        duration: 3000
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };
  return <div className="flex gap-2 mt-2">
      <Button size="icon" variant="outline" className="h-9 w-9" onClick={onEditProfile}>
        <PenSquare className="h-4 w-4" />
      </Button>
      
      <Popover>
        <PopoverTrigger asChild>
          
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <p className="text-sm">Notifications</p>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button size="icon" className="h-9 w-9 bg-red-500 hover:bg-red-600 text-white" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <p className="text-sm">Sign Out</p>
        </PopoverContent>
      </Popover>
    </div>;
};
export default ProfileActions;