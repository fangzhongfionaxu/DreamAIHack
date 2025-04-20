
import React, { useState, useEffect, useRef } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import MessageItem from './chat/MessageItem';
import MessageInput from './chat/MessageInput';
import { generateResponse, processResponseForHabits } from '@/utils/chatUtils';

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
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem('claude_api_key'));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Pass the conversation history to provide context to Claude
      const messageHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp
      }));

      const responseContent = await generateResponse(input, messageHistory, apiKey || undefined);
      
      // Process any habit tracking data if available
      const habitData = processResponseForHabits(responseContent);
      if (habitData) {
        console.log('Extracted habit data:', habitData);
        // Here you could store or use this habit data, for example:
        // updateHabitStreaks(habitData);
      }
      
      const aiMessage: Message = {
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error in chat interaction:', error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const key = formData.get('api_key') as string;
    
    if (key) {
      localStorage.setItem('claude_api_key', key);
      setApiKey(key);
      toast({
        title: "API Key Saved",
        description: "Your Claude API key has been saved.",
      });
    }
  };

  return (
    <div className="flex flex-col h-full"> 
      <div className="flex flex-col flex-1 bg-gradient-to-br from-pastel-pink to-pastel-yellow pb-16">
        <div className="p-2 sm:p-4 bg-white/50 text-xs sm:text-sm text-gray-700 text-center space-y-2">
          <strong className="block text-sm sm:text-base">**Training in progress**</strong> 
          <p className="text-xs sm:text-sm">
            Our AI assistant is still learning! Mistakes may occur and we appreciate your patience. 
            Do verify the accuracy of results before relying on them.
          </p>
          
          {!apiKey && (
            <div className="mt-2 p-2 bg-white/70 rounded-md">
              <form onSubmit={handleApiKeySubmit} className="flex flex-col sm:flex-row gap-2 items-center">
                <input 
                  type="password" 
                  name="api_key" 
                  placeholder="Enter your Claude API key" 
                  className="border p-1 text-sm rounded flex-1" 
                />
                <button 
                  type="submit" 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  Save Key
                </button>
              </form>
              <p className="text-xs mt-1">API key is stored locally and never sent to our servers.</p>
            </div>
          )}
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
