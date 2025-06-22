import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ImageIcon, SendIcon, Camera, Upload } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface MessageInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSend: () => Promise<void>;
  isLoading: boolean;
  onImageSend: (imageDataUrl: string) => Promise<void>;
  onImageUpload: (file: File) => Promise<void>;
}

const MessageInput: React.FC<MessageInputProps> = ({
  input,
  setInput,
  handleSend,
  isLoading,
  onImageSend,
  onImageUpload
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        handleSendClick();
      }
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image file",
          variant: "destructive"
        });
        return;
      }

      // Check file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "File size should be less than 5MB",
          variant: "destructive"
        });
        return;
      }

      setIsUploading(true);
      try {
        await onImageUpload(file);
        toast({
          title: "Image Uploaded",
          description: "Your image has been uploaded successfully",
          variant: "default"
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        toast({
          title: "Upload Failed",
          description: "Failed to upload image. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsUploading(false);
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const handleSendClick = async () => {
    if (input.trim() && !isLoading) {
      try {
        await handleSend();
      } catch (error) {
        console.error('Error sending message:', error);
        toast({
          title: "Send Failed",
          description: "Failed to send message. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const startCamera = async () => {
    try {
      setIsCapturing(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user' // Front camera by default
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
      setIsCapturing(false);
    }
  };

  const capturePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Set canvas size to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw the video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert to base64
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        
        try {
          // Send the captured image
          await onImageSend(imageDataUrl);
          toast({
            title: "Photo Captured",
            description: "Your photo has been captured and sent!",
            variant: "default"
          });
        } catch (error) {
          console.error('Error sending captured image:', error);
          toast({
            title: "Capture Failed",
            description: "Failed to send captured photo. Please try again.",
            variant: "destructive"
          });
        }
        
        // Stop camera
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCapturing(false);
  };

  return (
    <div className="space-y-4">
      {/* Camera View */}
      {isCapturing && (
        <div className="relative bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-64 object-cover"
            autoPlay
            playsInline
            muted
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            <Button
              onClick={capturePhoto}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
              size="sm"
            >
              <Camera className="w-4 h-4 mr-2" />
              Capture
            </Button>
            <Button
              onClick={stopCamera}
              variant="outline"
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
              size="sm"
            >
              Cancel
            </Button>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-center gap-2 p-4 border-t bg-white/80 backdrop-blur-sm rounded-lg">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          id="image-upload"
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isUploading || isLoading}
        />
        
        {/* File upload button */}
        <label 
          htmlFor="image-upload" 
          className={`p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors ${
            (isUploading || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title="Upload Image"
        >
          <Upload className="w-5 h-5 text-gray-500" />
        </label>

        {/* Camera button */}
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={isCapturing ? stopCamera : startCamera}
          disabled={isLoading || isUploading}
          className="p-2 rounded-full hover:bg-gray-100"
          title={isCapturing ? "Stop Camera" : "Take Photo"}
        >
          <Camera className="w-5 h-5 text-gray-500" />
        </Button>

        {/* Message input */}
        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isLoading ? "AI is thinking..." : 
              isUploading ? "Uploading image..." : 
              "Type a message..."
            }
            disabled={isLoading || isUploading}
            className="w-full p-3 pr-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[44px] max-h-32"
            rows={1}
            style={{
              height: 'auto',
              minHeight: '44px'
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 128) + 'px';
            }}
          />
        </div>

        {/* Send button */}
        <Button
          onClick={handleSendClick}
          disabled={!input.trim() || isLoading || isUploading}
          className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Send Message"
        >
          <SendIcon className="w-5 h-5 text-white" />
        </Button>
      </div>

      {/* Loading/Status indicator */}
      {(isLoading || isUploading) && (
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-600">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span>
              {isLoading ? "Processing..." : isUploading ? "Uploading..." : ""}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageInput;