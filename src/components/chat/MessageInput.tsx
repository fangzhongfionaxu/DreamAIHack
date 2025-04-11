
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Paperclip, ArrowUp } from "lucide-react";

interface MessageInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSend: () => void;
  isLoading: boolean;
}

const MessageInput = ({ input, setInput, handleSend, isLoading }: MessageInputProps) => {
  return (
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
  );
};

export default MessageInput;
