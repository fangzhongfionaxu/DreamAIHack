
import React, { useState, useEffect, useRef } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import MessageItem from './chat/MessageItem';
import MessageInput from './chat/MessageInput';
import { generateResponse } from '@/utils/chatUtils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AiChatInterface = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi there! I'm your health buddy. How is your day?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const responseContent = generateResponse(input);
      
      const aiMessage: Message = {
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full"> 
      <div className="flex flex-col flex-1 bg-gradient-to-br from-pastel-pink to-pastel-yellow pb-16">
        <div className="p-2 sm:p-4 bg-white/50 text-xs sm:text-sm text-gray-700 text-center">
          <strong className="block mb-1 text-sm sm:text-base">**Training in progress**</strong> 
          Our AI assistant is still learning! Mistakes may occur and we appreciate your patience. 
          Do verify the accuracy of results before relying on them.
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 pb-4">
            {messages.map((message, index) => (
              <MessageItem 
                key={index}
                role={message.role}
                content={message.content}
                timestamp={message.timestamp}
                user={user}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-4 bg-background border-t fixed bottom-16 left-0 right-0 z-10">
          <MessageInput
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default AiChatInterface;
