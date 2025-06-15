
import React, { useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload, Camera } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ProfileAvatarProps {
  size?: 'small' | 'large';
  avatarUrl?: string;
  username?: string;
  showUploadButton?: boolean;
  onAvatarUpdate?: (url: string) => void;
}

const ProfileAvatar = ({ 
  size = 'small', 
  avatarUrl, 
  username, 
  showUploadButton = false,
  onAvatarUpdate 
}: ProfileAvatarProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const avatarSize = size === 'large' ? 'h-24 w-24' : 'h-20 w-20';
  const fallbackTextSize = size === 'large' ? 'text-2xl' : 'text-xl';

  const getUserInitials = () => {
    if (!user) return "?";
    
    const displayName = username || user.user_metadata?.username || user.email || "";
    
    if (!displayName) return "?";
    
    if (displayName.includes(" ")) {
      const names = displayName.split(" ");
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
    }
    
    return displayName.charAt(0).toUpperCase();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          upsert: true // This will overwrite existing files
        });

      if (uploadError) throw uploadError;

      // Get the public URL for the uploaded file
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update the avatar URL via callback
      if (onAvatarUpdate) {
        onAvatarUpdate(data.publicUrl);
      }

      toast({
        title: "Avatar uploaded successfully",
        description: "Your profile picture has been updated",
      });

    } catch (error: any) {
      toast({
        title: "Error uploading avatar",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const displayAvatarUrl = avatarUrl || user?.user_metadata?.avatar_url;
  const displayUsername = username || user?.user_metadata?.username || "User";

  return (
    <div className="flex flex-col items-center">
      <Avatar className={`${avatarSize} border-4 border-brand ${size === 'large' ? 'mb-2' : ''}`}>
        {displayAvatarUrl ? (
          <AvatarImage src={displayAvatarUrl} alt={displayUsername} />
        ) : (
          <AvatarFallback className={`bg-teal-500 text-white ${fallbackTextSize}`}>
            {getUserInitials()}
          </AvatarFallback>
        )}
      </Avatar>
      
      {showUploadButton && (
        <>
          <div className="flex gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <Upload className="h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Camera className="h-4 w-4" />
                  Upload Photo
                </>
              )}
            </Button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </>
      )}
    </div>
  );
};

export default ProfileAvatar;
