
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Function to check if we can connect to the Claude API
const canConnectToClaudeApi = async (): Promise<boolean> => {
  try {
    // Make a simple call to check if the edge function exists and is properly configured
    const { error } = await supabase.functions.invoke("claude-chat", {
      body: { prompt: "test" },
    });
    
    if (error) {
      console.error("Error checking Claude API connection:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error checking Claude API connection:", error);
    return false;
  }
};

export const generateResponse = async (input: string): Promise<string> => {
  console.log("Generating response for:", input);
  
  try {
    console.log("Calling Claude API via edge function");
    
    // Call the Claude API via our edge function
    const { data, error } = await supabase.functions.invoke("claude-chat", {
      body: { prompt: input },
    });
    
    if (error) {
      console.error("Error from Claude edge function:", error);
      throw new Error(error.message || "Failed to communicate with Claude");
    }
    
    if (!data || !data.text) {
      console.error("Unexpected response format:", data);
      throw new Error("Received an invalid response format");
    }
    
    console.log("Claude API response received successfully");
    return data.text;
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
