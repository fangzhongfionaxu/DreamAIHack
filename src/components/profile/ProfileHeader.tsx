
import React, { useState } from 'react';
import { CardContent } from "@/components/ui/card";
import ProfileAvatar from './ProfileAvatar';
import ProfileInfo from './ProfileInfo';
import ProfileActions from './ProfileActions';
import EditProfileDialog from './EditProfileDialog';

const ProfileHeader = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditProfile = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  return (
    <CardContent className="p-6">
      <div className="flex items-center">
        <ProfileAvatar size="small" />
        <ProfileInfo />
      </div>
      
      <div className="mt-4">
        <ProfileActions onEditProfile={handleEditProfile} />
      </div>

      <EditProfileDialog 
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
      />
    </CardContent>
  );
};

export default ProfileHeader;
