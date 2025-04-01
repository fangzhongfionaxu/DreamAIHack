
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Plus, PaperClip, Edit, ArrowUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

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
  const { toast } = useToast();

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInput('');

    // Simple AI response simulation with safety layer
    setTimeout(() => {
      let responseContent = '';
      
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
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1 p-4 space-y-4 bg-gradient-to-br from-pastel-pink to-pastel-yellow">
          <div className="space-y-4 pb-4">
            {messages.map((message, index) => (
              <Card 
                key={index} 
                className={`animate-fade-in max-w-[80%] ${
                  message.role === 'user' 
                    ? 'ml-auto bg-brand/10 border-brand/20' 
                    : 'mr-auto bg-white'
                }`}
              >
                <div className="p-3">
                  <p>{message.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 bg-background border-t">
          <div className="flex gap-2 items-end relative rounded-xl bg-card border shadow-sm p-2">
            <div className="flex items-center gap-2 absolute bottom-3 left-3">
              <Button variant="ghost" size="icon" className="rounded-full h-7 w-7 p-0">
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-7 w-7 p-0">
                <PaperClip className="h-4 w-4" />
              </Button>
            </div>
            
            <Textarea
              placeholder="Ask Lovable..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="pl-16 pr-10 resize-none min-h-[40px] max-h-[200px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
              rows={1}
            />
            
            <Button 
              onClick={handleSend}
              className="absolute bottom-2 right-2 rounded-full bg-brand hover:bg-brand-dark h-7 w-7 p-0"
              size="icon"
              disabled={!input.trim()}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChatInterface;
