
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAuth } from '@/contexts/AuthContext';
import { useStreak } from '@/contexts/StreakContext';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  streak: number;
  reactions: Record<string, number>;
}

// Sample leaderboard data
const initialLeaderboardData: LeaderboardUser[] = [
  { id: "3", name: "Taylor", avatar: "", streak: 24, reactions: { '🎉': 1, '💯': 1 } },
  { id: "1", name: "Alex", avatar: "", streak: 14, reactions: {} },
  { id: "2", name: "Jordan", avatar: "", streak: 9, reactions: {} },
];

const StreakLeaders = () => {
  const { user: currentUser } = useAuth();
  const { streak: currentUserStreak } = useStreak();
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(
    [...initialLeaderboardData].sort((a, b) => b.streak - a.streak)
  );

  useEffect(() => {
    if (currentUser && !leaderboard.some(u => u.id === currentUser.id)) {
      setLeaderboard(prevLeaderboard => {
        const newLeaderboard = [...prevLeaderboard, {
          id: currentUser.id,
          name: currentUser.user_metadata?.username || 'You',
          avatar: currentUser.user_metadata?.avatar_url || '',
          streak: currentUserStreak,
          reactions: {},
        }];
        return newLeaderboard.sort((a, b) => b.streak - a.streak);
      });
    }
  }, [currentUser, leaderboard, currentUserStreak]);

  const handleAddReaction = (userId: string, emoji: string) => {
    setLeaderboard(prevLeaderboard =>
      prevLeaderboard.map(user => {
        if (user.id === userId) {
          const newReactions = { ...user.reactions };
          newReactions[emoji] = (newReactions[emoji] || 0) + 1;
          return { ...user, reactions: newReactions };
        }
        return user;
      })
    );
  };
  
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-base sm:text-lg flex items-center font-semibold">
          <Award className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-yellow-500" />
          Streak Leaders
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 space-y-2">
        {leaderboard.map((user, index) => {
          if (user.id === currentUser?.id) {
            return (
              <div key={user.id} className="w-full flex items-center justify-between p-2 sm:p-3 rounded-xl bg-blue-100/50 border border-blue-200 shadow-sm">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className="w-5 sm:w-6 text-center flex-shrink-0">{getRankIcon(index + 1)}</div>
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                        <AvatarFallback className="bg-blue-200 text-blue-800 font-semibold text-xs sm:text-sm">
                            {user.name.charAt(0)}
                        </AvatarFallback>
                        <AvatarImage src={user.avatar} />
                    </Avatar>
                    <div className="min-w-0 flex-1">
                        <p className="font-semibold text-blue-900 text-sm sm:text-base truncate">{user.name === 'You' ? 'You' : `${user.name} (You)`}</p>
                        <p className="text-xs sm:text-sm text-blue-700/80">{user.streak} day streak</p>
                    </div>
                </div>
              </div>
            );
          }
          return <LeaderboardItem key={user.id} user={user} rank={index + 1} onAddReaction={handleAddReaction} />
        })}
      </CardContent>
    </Card>
  );
};

interface LeaderboardItemProps {
  user: LeaderboardUser;
  rank: number;
  onAddReaction: (userId: string, emoji: string) => void;
}

const availableReactions = ['👏', '🎉', '💪', '🔥', '⭐', '💯'];

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Award className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-500" />;
  if (rank === 2) return <Award className="h-4 w-4 sm:h-6 sm:w-6 text-gray-400" />;
  if (rank === 3) return <Award className="h-4 w-4 sm:h-6 sm:w-6 text-amber-600" />; // bronze color
  return <div className="w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm text-muted-foreground font-medium">{rank}</div>;
};

const LeaderboardItem = ({ user, rank, onAddReaction }: LeaderboardItemProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleReactionClick = (emoji: string) => {
    onAddReaction(user.id, emoji);
    setPopoverOpen(false);
  };

  const reactionEntries = Object.entries(user.reactions);
  const hasReactions = reactionEntries.length > 0;

  return (
    <div className="flex items-start justify-between p-2 sm:p-3 rounded-xl bg-white/70 shadow-sm gap-2">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <div className="w-5 sm:w-6 text-center flex-shrink-0">{getRankIcon(rank)}</div>
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
          <AvatarFallback className="bg-pastel-pink text-brand-dark font-semibold text-xs sm:text-sm">{user.name.charAt(0)}</AvatarFallback>
          <AvatarImage src={user.avatar} />
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm sm:text-base truncate">{user.name}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">{user.streak} day streak</p>
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        {hasReactions && (
          <div className="flex flex-wrap gap-1 justify-end max-w-[120px] sm:max-w-[160px]">
            {reactionEntries.map(([emoji, count]) => (
              <Button 
                variant="outline" 
                size="sm" 
                key={emoji} 
                className="rounded-full bg-white/50 hover:bg-white/80 px-2 h-6 sm:h-7 border-gray-300 text-xs flex-shrink-0" 
                onClick={() => onAddReaction(user.id, emoji)}
              >
                <span className="text-xs">{emoji}</span>
                <span className="text-xs ml-1 font-semibold">{count}</span>
              </Button>
            ))}
          </div>
        )}
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full bg-white/50 hover:bg-white/80 h-6 w-6 sm:h-7 sm:w-7 border-gray-300 flex-shrink-0">
              <span className="text-xs">😊</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" side="top" align="end">
            <div className="grid grid-cols-3 gap-1">
              {availableReactions.map(emoji => (
                <Button
                  key={emoji}
                  variant="ghost"
                  size="icon"
                  className="text-lg sm:text-xl rounded-full h-8 w-8"
                  onClick={() => handleReactionClick(emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default StreakLeaders;
