
import { callClaudeApi } from './claudeUtils';
import { toast } from "@/components/ui/use-toast";

// Function to check if the API key is set
const isApiKeyConfigured = (): boolean => {
  // The value will be replaced at runtime with the actual secret
  // If no secret is configured, it will remain as the placeholder string
  return process.env.CLAUDE_API_KEY !== undefined && 
         process.env.CLAUDE_API_KEY !== "CLAUDE_API_KEY";
};

export const generateResponse = async (input: string): Promise<string> => {
  console.log("Generating response for:", input);
  
  if (!isApiKeyConfigured()) {
    console.warn("Claude API key not configured, unable to generate response");
    toast({
      title: "API Key Missing",
      description: "The Claude API key is not configured. Please contact the administrator.",
      variant: "destructive",
    });
    return "I'm sorry, but I'm not properly configured yet. The administrator needs to set up the Claude API key for me to work correctly.";
  }
  
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
