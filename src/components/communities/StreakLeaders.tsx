import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award } from "lucide-react";

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  streak: number;
  reactions: Record<string, number>;
}

// Sample leaderboard data, sorted by streak descending
const initialLeaderboard: LeaderboardUser[] = [
  { id: "3", name: "Taylor", avatar: "", streak: 24, reactions: { '🎉': 1 } },
  { id: "1", name: "Alex", avatar: "", streak: 14, reactions: {} },
  { id: "2", name: "Jordan", avatar: "", streak: 9, reactions: {} },
].sort((a, b) => b.streak - a.streak);

const StreakLeaders = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(initialLeaderboard);

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
      <CardHeader>
        <CardTitle className="text-lg flex items-center font-semibold">
          <Award className="h-5 w-5 mr-2 text-yellow-500" />
          Streak Leaders
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {leaderboard.map((user, index) => (
          <LeaderboardItem key={user.id} user={user} rank={index + 1} onAddReaction={handleAddReaction} />
        ))}
      </CardContent>
    </Card>
  );
};

interface LeaderboardItemProps {
  user: LeaderboardUser;
  rank: number;
  onAddReaction: (userId: string, emoji: string) => void;
}

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Award className="h-6 w-6 text-yellow-500" />;
  if (rank === 2) return <Award className="h-6 w-6 text-gray-400" />;
  if (rank === 3) return <Award className="h-6 w-6 text-amber-600" />; // bronze color
  return <div className="w-6 h-6 flex items-center justify-center text-sm text-muted-foreground font-medium">{rank}</div>;
};

const LeaderboardItem = ({ user, rank, onAddReaction }: LeaderboardItemProps) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/70 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-6 text-center">{getRankIcon(rank)}</div>
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-pastel-pink text-brand-dark font-semibold">{user.name.charAt(0)}</AvatarFallback>
          <AvatarImage src={user.avatar} />
        </Avatar>
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.streak} day streak</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {Object.entries(user.reactions).length > 0 && 
            Object.entries(user.reactions).map(([emoji, count]) => (
            <Button variant="outline" size="sm" key={emoji} className="rounded-full bg-white/50 hover:bg-white/80 px-3 h-8 border-gray-300" onClick={() => onAddReaction(user.id, emoji)}>
                {emoji} <span className="text-xs ml-1.5 font-semibold">{count}</span>
            </Button>
        ))}
        <Button variant="outline" size="icon" className="rounded-full bg-white/50 hover:bg-white/80 h-8 w-8 border-gray-300" onClick={() => onAddReaction(user.id, '😊')}>
          <span>😊</span>
        </Button>
      </div>
    </div>
  );
};

export default StreakLeaders;
