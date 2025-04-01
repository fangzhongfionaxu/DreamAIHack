
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Frown, Smile } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AiChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi there! I'm your health assistant. How can I help you with your treatment plan today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [persona, setPersona] = useState<'warm' | 'tough' | 'chill'>('warm');
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
        // Generate response based on current persona
        switch(persona) {
          case 'warm':
            responseContent = `I'm here for you! ${getPersonalizedResponse(input, 'warm')}`;
            break;
          case 'tough':
            responseContent = `Let's push through this! ${getPersonalizedResponse(input, 'tough')}`;
            break;
          case 'chill':
            responseContent = `No worries! ${getPersonalizedResponse(input, 'chill')}`;
            break;
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

  const getPersonalizedResponse = (query: string, persona: string) => {
    // In a real app, this would call the Llama 3.3 API
    if (query.toLowerCase().includes('exercise') || query.toLowerCase().includes('exercises')) {
      return "Remember to do your prescribed exercises regularly. Would you like me to set a reminder for you?";
    } else if (query.toLowerCase().includes('pain') || query.toLowerCase().includes('hurt')) {
      return "I understand that can be uncomfortable. Make sure to follow your doctor's advice about managing pain. Would you like some general relaxation techniques?";
    } else if (query.toLowerCase().includes('brace') || query.toLowerCase().includes('wear')) {
      return "Consistent brace wearing is key for your treatment. How many hours have you worn it today?";
    } else {
      return "I'm here to support you with your treatment plan. Is there something specific you'd like to talk about?";
    }
  };

  const changePersona = (newPersona: 'warm' | 'tough' | 'chill') => {
    setPersona(newPersona);
    toast({
      title: "Persona changed",
      description: `Your assistant will now use a ${newPersona} communication style.`,
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-semibold text-brand-dark">Your Assistant</h2>
        <div className="flex gap-2 mt-2">
          <Button 
            variant={persona === 'warm' ? "default" : "outline"} 
            size="sm" 
            onClick={() => changePersona('warm')}
            className={persona === 'warm' ? "bg-brand text-white" : ""}
          >
            <Smile className="h-4 w-4 mr-2" />
            Warm
          </Button>
          <Button 
            variant={persona === 'tough' ? "default" : "outline"} 
            size="sm" 
            onClick={() => changePersona('tough')}
            className={persona === 'tough' ? "bg-brand text-white" : ""}
          >
            <Frown className="h-4 w-4 mr-2" />
            Tough
          </Button>
          <Button 
            variant={persona === 'chill' ? "default" : "outline"} 
            size="sm" 
            onClick={() => changePersona('chill')}
            className={persona === 'chill' ? "bg-brand text-white" : ""}
          >
            <Smile className="h-4 w-4 mr-2" />
            Chill
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-4">
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
      
      <div className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} className="bg-brand hover:bg-brand-dark">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AiChatInterface;
