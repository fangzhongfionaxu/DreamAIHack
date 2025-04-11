
import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from '@supabase/supabase-js';

interface MessageItemProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  user: User | null;
}

const MessageItem = ({ role, content, timestamp, user }: MessageItemProps) => {
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

  return (
    <div className={`flex items-start gap-3 ${role === 'user' ? 'flex-row-reverse' : ''}`}>
      <Avatar className="mt-1">
        {role === 'assistant' ? (
          <AvatarFallback className="bg-brand text-white">AI</AvatarFallback>
        ) : (
          user?.user_metadata?.avatar_url ? (
            <AvatarImage src={user.user_metadata.avatar_url} alt={user.user_metadata?.username || "User"} />
          ) : (
            <AvatarFallback className="bg-teal-500 text-white">{getUserInitials()}</AvatarFallback>
          )
        )}
      </Avatar>
      <Card 
        className={`animate-fade-in max-w-[75%] ${
          role === 'user' 
            ? 'bg-brand/10 border-brand/20' 
            : 'bg-white'
        }`}
      >
        <div className="p-3">
          <p>{content}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default MessageItem;
