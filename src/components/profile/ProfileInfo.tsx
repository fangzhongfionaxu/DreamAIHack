
import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useStreak } from "@/contexts/StreakContext";

const ProfileInfo = () => {
  const { user } = useAuth();
  const { streak } = useStreak();

  return (
    <div className="ml-4">
      <h2 className="text-xl font-semibold">
        {user?.user_metadata?.username || user?.email || "Anonymous User"}
      </h2>
      <p className="text-muted-foreground">{streak}-day streak 🌱</p>
    </div>
  );
};

export default ProfileInfo;
