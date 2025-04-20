
import React, { useState, useEffect, useRef } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import MessageItem from './chat/MessageItem';
import MessageInput from './chat/MessageInput';
import { generateResponse } from '@/utils/chatUtils';
import { getApiKey, saveApiKey, isApiKeyValid } from '@/utils/claudeUtils';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
  const [apiKey, setApiKey] = useState('');
  const [hasStoredApiKey, setHasStoredApiKey] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Check if API key exists in localStorage
    const savedKey = getApiKey();
    setHasStoredApiKey(!!savedKey);
  }, []);

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
      const responseContent = await generateResponse(input);
      
      const aiMessage: Message = {
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      toast({
        title: "Error",
        description: "Failed to generate a response. Please try again.",
        variant: "destructive"
      });
      
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter an API key",
        variant: "destructive"
      });
      return;
    }

    if (!isApiKeyValid(apiKey)) {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid Claude API key starting with 'sk-'",
        variant: "destructive"
      });
      return;
    }

    saveApiKey(apiKey);
    setHasStoredApiKey(true);
    setApiKey('');
    toast({
      title: "Success",
      description: "API key saved successfully",
    });
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
        </div>
        
        {!hasStoredApiKey && (
          <Card className="mx-4 my-2 p-3 bg-white/80">
            <h3 className="font-medium mb-2">Claude API Setup</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Please enter your Claude API key to enable the AI assistant. 
              Get your key from <a href="https://console.anthropic.com/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Anthropic Console</a>.
            </p>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Enter Claude API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSaveApiKey}>Save</Button>
            </div>
          </Card>
        )}
        
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
