
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Paperclip, ArrowUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AiChatInterface = () => {
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

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (would be replaced with actual API call in production)
    setTimeout(() => {
      let responseContent = '';
      
      // Simple AI response simulation with safety layer
      if (input.toLowerCase().includes('diagnosis') || 
          input.toLowerCase().includes('diagnose') || 
          input.toLowerCase().includes('what do i have')) {
        responseContent = "Unfortunately, I'm not qualified to provide medical advice or diagnosis. Would you like to consult a healthcare professional instead?";
      } else {
        // Generate simple personalized response
        if (input.toLowerCase().includes('exercise') || input.toLowerCase().includes('exercises')) {
          responseContent = "Remember to do your prescribed exercises regularly. Would you like me to set a reminder for you?";
        } else if (input.toLowerCase().includes('pain') || input.toLowerCase().includes('hurt')) {
          responseContent = "I understand that can be uncomfortable. Make sure to follow your doctor's advice about managing pain. Would you like some general relaxation techniques?";
        } else if (input.toLowerCase().includes('brace') || input.toLowerCase().includes('wear')) {
          responseContent = "Consistent brace wearing is key for your treatment. How many hours have you worn it today?";
        } else {
          responseContent = "I'm here to support you with your treatment plan. Is there something specific you'd like to talk about?";
        }
      }
      
      const aiMessage: Message = {
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  // Auto-scroll to bottom when new messages are added
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full"> 
      <div className="flex flex-col flex-1 bg-gradient-to-br from-pastel-pink to-pastel-yellow pb-16">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 pb-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <Avatar className="mt-1">
                  <AvatarFallback className={message.role === 'assistant' ? 'bg-brand text-white' : 'bg-teal-500 text-white'}>
                    {message.role === 'assistant' ? 'AI' : 'JD'}
                  </AvatarFallback>
                </Avatar>
                <Card 
                  className={`animate-fade-in max-w-[75%] ${
                    message.role === 'user' 
                      ? 'bg-brand/10 border-brand/20' 
                      : 'bg-white'
                  }`}
                >
                  <div className="p-3">
                    <p>{message.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-4 bg-background border-t fixed bottom-16 left-0 right-0 z-10">
          <div className="flex gap-2 items-end relative rounded-xl bg-card border shadow-sm p-2">
            <Button variant="ghost" size="icon" className="rounded-full h-7 w-7 p-0 absolute bottom-3 left-3">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full h-7 w-7 p-0 absolute bottom-3 left-12">
              <Paperclip className="h-4 w-4" />
            </Button>
            
            <Textarea
              placeholder="Type here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="pl-20 pr-10 resize-none min-h-[40px] max-h-[200px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
              rows={1}
            />
            
            <Button 
              onClick={handleSend}
              className="absolute bottom-2 right-2 rounded-full bg-blue-500 hover:bg-blue-600 h-7 w-7 p-0"
              size="icon"
              disabled={!input.trim() || isLoading}
            >
              <ArrowUp className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChatInterface;
