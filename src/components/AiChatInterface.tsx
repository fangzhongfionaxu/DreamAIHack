import React, { useState, useEffect, useRef } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import MessageItem from './chat/MessageItem';
import MessageInput from './chat/MessageInput';
import { generateResponse, generateImageResponse, checkBackendHealth } from '@/utils/chatUtils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
  timestamp: Date;
}

export interface MessageInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSend: () => Promise<void>;
  isLoading: boolean;
  onImageSend: (imageDataUrl: string) => Promise<void>;
  onImageUpload: (file: File) => Promise<void>;
}

const AiChatInterface = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi there! I'm your health buddy. How is your day?",
      imageUrl: undefined,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check backend health on component mount
  // useEffect(() => {
  //   const checkHealth = async () => {
  //     try {
  //       const isHealthy = await checkBackendHealth();
  //       setBackendStatus(isHealthy ? 'online' : 'offline');
        
  //       if (!isHealthy) {
  //         toast({
  //           title: "Backend Connection Issue",
  //           description: "AI service is not available. Please check if the backend server is running.",
  //           variant: "destructive"
  //         });
  //       }
  //     } catch (error) {
  //       setBackendStatus('offline');
  //       console.error('Health check failed:', error);
  //     }
  //   };

  //   checkHealth();
    
  //   // Check health every 30 seconds
  //   const healthCheckInterval = setInterval(checkHealth, 30000);
    
  //   return () => clearInterval(healthCheckInterval);
  // }, [toast]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) {
      console.log('Empty input, not sending');
      return;
    }

    // Check backend status before sending
    if (backendStatus === 'offline') {
      toast({
        title: "Service Unavailable",
        description: "AI service is currently offline. Please try again later.",
        variant: "destructive"
      });
      return;
    }
    
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    console.log("👤 User sending message:", input);
    
    // Add user message immediately and clear input
    setMessages(prevMessages => [...prevMessages, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      console.log("🤖 Calling AI service...");
      
      // Get current messages including the new user message
      const currentMessages = [...messages, userMessage];
      
      // Call the AI service
      const responseContent = await generateResponse(
        currentInput, 
        user?.id || 'anonymous', 
        currentMessages
      );
      
      console.log("✅ AI response received:", responseContent);
      
      const aiMessage: Message = {
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      
      // Show success toast for brace detection
      if (responseContent.toLowerCase().includes('brace') && responseContent.toLowerCase().includes('detected')) {
        toast({
          title: "Great Job! 🦷",
          description: "Brace detected! Your streak has been updated.",
          variant: "default"
        });
      }
      
    } catch (error) {
      console.error('❌ Error generating response:', error);
      
      let errorMessage = "I'm experiencing difficulties right now. Please try again later.";
      let toastDescription = "Failed to generate response";
      
      if (error instanceof Error) {
        if (error.message.includes('connect to AI service') || error.message.includes('Backend API error')) {
          errorMessage = "I'm having trouble connecting to my brain right now. Please make sure the AI service is running and try again.";
          toastDescription = "Connection to AI service failed";
          setBackendStatus('offline');
        } else if (error.message.includes('MongoDB')) {
          errorMessage = "I'm having some database issues. The technical team is working on it!";
          toastDescription = "Database connection error";
        } else {
          errorMessage = `Sorry, I encountered an error: ${error.message}`;
          toastDescription = error.message;
        }
      }
      
      toast({
        title: "AI Assistant Error",
        description: toastDescription,
        variant: "destructive"
      });
      
      const errorResponseMessage: Message = {
        role: 'assistant',
        content: errorMessage,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, errorResponseMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSend = async (imageDataUrl: string) => {
    console.log("🖼️ User sending image");
    
    // Check backend status before sending
    if (backendStatus === 'offline') {
      toast({
        title: "Service Unavailable",
        description: "AI service is currently offline. Please try again later.",
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = {
      role: 'user',
      content: 'Shared an image',
      imageUrl: imageDataUrl,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      console.log("🤖 Processing image with AI...");
      
      // Get current messages including the new image message
      const currentMessages = [...messages, userMessage];
      
      // Call the image processing service
      const responseContent = await generateImageResponse(
        imageDataUrl,
        user?.id || 'anonymous',
        currentMessages
      );
      
      console.log("✅ Image AI response received:", responseContent);
      
      const aiMessage: Message = {
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      
      // Show success toast for brace detection in images
      if (responseContent.toLowerCase().includes('brace') && responseContent.toLowerCase().includes('detected')) {
        toast({
          title: "Excellent! 🦷📸",
          description: "Brace detected in your photo! Your streak has been updated.",
          variant: "default"
        });
      }
      
    } catch (error) {
      console.error('❌ Error processing image:', error);
      
      let errorMessage = "I'm having trouble processing your image right now. Please try again later.";
      
      if (error instanceof Error) {
        if (error.message.includes('connect')) {
          errorMessage = "I can't connect to my image processing service right now. Please check your connection and try again.";
          setBackendStatus('offline');
        } else {
          errorMessage = `Sorry, I couldn't process your image: ${error.message}`;
        }
      }
      
      toast({
        title: "Image Processing Error",
        description: error instanceof Error ? error.message : "Failed to process image",
        variant: "destructive"
      });
      
      const errorMessage_obj: Message = {
        role: 'assistant',
        content: errorMessage,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage_obj]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    console.log("📁 Processing uploaded file:", file.name);
    
    // Convert file to base64 and call handleImageSend
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Image = e.target?.result as string;
      await handleImageSend(base64Image);
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      toast({
        title: "File Upload Error",
        description: "Failed to read the uploaded file",
        variant: "destructive"
      });
    };
    reader.readAsDataURL(file);
  };

  // Backend status indicator
  const getStatusColor = () => {
    switch (backendStatus) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'checking': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (backendStatus) {
      case 'online': return 'AI Service Online';
      case 'offline': return 'AI Service Offline';
      case 'checking': return 'Checking AI Service...';
      default: return 'Unknown Status';
    }
  };

  return (
    <div className="flex flex-col h-full"> 
      <div className="flex flex-col flex-1 bg-gradient-to-br from-pastel-pink to-pastel-yellow pb-16">
        {/* Header with status indicator */}
        <div className="p-2 sm:p-4 bg-white/50 text-xs sm:text-sm text-gray-700 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
            <span className="text-xs font-medium">{getStatusText()}</span>
          </div>
          <strong className="block text-sm sm:text-base">**Training in progress**</strong> 
          <p className="text-xs sm:text-sm">
            Our AI assistant is still learning! Mistakes may occur and we appreciate your patience. Do verify the accuracy of results before relying on them
          </p>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 pb-4">
            {messages.map((message, index) => (
              <MessageItem 
                key={index}
                role={message.role}
                content={message.content}
                imageUrl={message.imageUrl}
                timestamp={message.timestamp}
                user={user}
              />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 max-w-xs">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-4 bg-background border-t fixed bottom-16 left-0 right-0 z-10">
          <MessageInput
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            isLoading={isLoading || backendStatus === 'offline'}
            onImageSend={handleImageSend}
            onImageUpload={handleImageUpload}
          />
          
          {backendStatus === 'offline' && (
            <div className="mt-2 text-center">
              <p className="text-xs text-red-600">
                ⚠️ AI service is offline. Please start the backend server.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiChatInterface;