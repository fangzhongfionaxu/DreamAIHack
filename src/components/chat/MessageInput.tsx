
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Paperclip, ArrowUp, Camera } from "lucide-react";
import CameraView from './CameraView';

interface MessageInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSend: () => void;
  isLoading: boolean;
  onImageSend: (imageDataUrl: string) => void;
}

const MessageInput = ({ input, setInput, handleSend, isLoading, onImageSend }: MessageInputProps) => {
  const [showCamera, setShowCamera] = useState(false);
  
  const handleCapture = (imageDataUrl: string) => {
    onImageSend(imageDataUrl);
    setShowCamera(false);
  };

  return (
    <>
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
          className="pl-20 pr-20 resize-none min-h-[40px] max-h-[200px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
          rows={1}
        />
        
        <Button 
          onClick={() => setShowCamera(true)}
          className="absolute bottom-2 right-12 rounded-full h-7 w-7 p-0 transition-transform bg-gradient-to-br from-fuchsia-400 to-purple-500 text-white animate-glow hover:scale-110"
          size="icon"
          disabled={isLoading}
          aria-label="Open camera"
        >
          <Camera className="h-4 w-4" />
        </Button>

        <Button 
          onClick={handleSend}
          className="absolute bottom-2 right-2 rounded-full bg-blue-500 hover:bg-blue-600 h-7 w-7 p-0"
          size="icon"
          disabled={!input.trim() || isLoading}
        >
          <ArrowUp className="h-4 w-4 text-white" />
        </Button>
      </div>
      {showCamera && <CameraView onCapture={handleCapture} onClose={() => setShowCamera(false)} />}
    </>
  );
};

export default MessageInput;
