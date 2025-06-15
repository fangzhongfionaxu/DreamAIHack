
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const MOTIVATIONAL_MESSAGES = [
  "You're doing amazing! Every day counts in your journey! 🌱",
  "Small steps lead to big changes. Keep going! 💪",
  "Your consistency is building something beautiful! ✨",
  "Progress, not perfection. You're on the right track! 🌟",
  "Every day you choose growth, you're becoming stronger! 🌿",
  "Your dedication is inspiring! Keep nurturing your goals! 🌺",
  "Believe in yourself - you've got this! 🚀",
  "Your journey is unique and valuable. Stay the course! 🎯",
  "Growth happens one day at a time. You're proof of that! 🌳",
  "Your commitment today shapes your tomorrow! 🌅",
  "Celebrate every step forward - you're making real progress! 🎉",
  "Your resilience is your superpower! Keep shining! ⭐"
];

interface MotivationalChatBubbleProps {
  className?: string;
}

const MotivationalChatBubble: React.FC<MotivationalChatBubbleProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length);
    return MOTIVATIONAL_MESSAGES[randomIndex];
  };

  const handleBubbleClick = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setCurrentMessage(getRandomMessage());
      setIsOpen(true);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Message Card positioned to the left of the bubble */}
      {isOpen && (
        <Card className="absolute top-1/2 right-16 transform -translate-y-1/2 w-64 shadow-lg animate-fade-in z-30 bg-white">
          <CardContent className="p-4 relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="absolute top-1 right-1 h-6 w-6 text-gray-400 hover:text-gray-600"
            >
              <X className="h-3 w-3" />
            </Button>
            <p className="text-sm text-gray-700 pr-6 leading-relaxed">
              {currentMessage}
            </p>
            {/* Speech bubble tail pointing right */}
            <div className="absolute top-1/2 left-full transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-white"></div>
          </CardContent>
        </Card>
      )}

      {/* Chat Bubble */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleBubbleClick}
        className="rounded-full bg-brand hover:bg-brand-dark text-white border-none shadow-lg animate-pulse-soft"
      >
        <MessageCircle className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default MotivationalChatBubble;
