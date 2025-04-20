
import { callClaudeApi, getApiKey } from './claudeUtils';
import { toast } from "@/components/ui/use-toast";

export const generateResponse = async (input: string): Promise<string> => {
  const apiKey = getApiKey();
  
  console.log("Generating response for:", input);
  console.log("API key available:", !!apiKey);
  
  // If we have an API key, use Claude API
  if (apiKey) {
    try {
      console.log("Attempting to call Claude API");
      const response = await callClaudeApi(input);
      console.log("Claude API response received successfully");
      return response;
    } catch (error) {
      console.error("Error generating response with Claude:", error);
      
      // Show error toast to user
      toast({
        title: "Claude API Error",
        description: error instanceof Error ? error.message : "Failed to communicate with Claude",
        variant: "destructive",
      });
      
      // Fall back to preset responses if API fails
      console.log("Falling back to preset responses");
      return generateFallbackResponse(input);
    }
  } else {
    // No API key, use fallback responses
    console.log("No API key available, using fallback responses");
    return generateFallbackResponse(input);
  }
};

// Function with the original preset responses as a fallback
const generateFallbackResponse = (input: string): string => {
  // Check for inability to answer
  const unknownQueries = [
    'diagnosis', 'diagnose', 'medical advice', 
    'professional opinion', 'treatment recommendation'
  ];

  if (unknownQueries.some(query => input.toLowerCase().includes(query))) {
    return "I'm still learning and might not be able to help with that for now. Thanks for being patient with me! ❤️";
  }

  // Existing response logic
  if (input.toLowerCase().includes('exercise') || input.toLowerCase().includes('exercises')) {
    return "Remember to do your prescribed exercises regularly. Would you like me to set a reminder for you?";
  } else if (input.toLowerCase().includes('pain') || input.toLowerCase().includes('hurt')) {
    return "I understand that can be uncomfortable. Make sure to follow your doctor's advice about managing pain. Would you like some general relaxation techniques?";
  } else if (input.toLowerCase().includes('brace') || input.toLowerCase().includes('wear')) {
    return "Consistent brace wearing is key for your treatment. How many hours have you worn it today?";
  } else {
    return "I'm here to support you with your treatment plan. Is there something specific you'd like to talk about?";
  }
};
