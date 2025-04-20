
import { callClaudeApi } from './claudeUtils';
import { toast } from "@/components/ui/use-toast";

export const generateResponse = async (input: string): Promise<string> => {
  console.log("Generating response for:", input);
  
  try {
    console.log("Attempting to call Claude API");
    const response = await callClaudeApi(input);
    console.log("Claude API response received successfully");
    return response;
  } catch (error) {
    console.error("Error generating response with Claude:", error);
    
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to communicate with Claude",
      variant: "destructive",
    });
    
    return "I'm having trouble connecting right now. Please try again in a moment.";
  }
};
