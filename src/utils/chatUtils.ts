import { callClaudeAPI, extractJsonFromText } from './claudeUtils';
import { toast } from '@/hooks/use-toast';

// This is a temporary function that will be used if the Claude API key is not set
const generateLocalResponse = (input: string): string => {
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

export const generateResponse = async (
  input: string, 
  messageHistory: Array<{role: 'user' | 'assistant', content: string, timestamp: Date}> = [],
  apiKey?: string
): Promise<string> => {
  try {
    // If apiKey is provided, use it directly
    if (apiKey) {
      const response = await callClaudeAPI(input, messageHistory, apiKey);
      return response;
    } else {
      // No API key available, use local response
      toast({
        title: "Using local responses",
        description: "No Claude API key is available. Using pre-defined responses instead.",
        variant: "default",
      });
      return generateLocalResponse(input);
    }
  } catch (error) {
    console.error("Error generating response with Claude:", error);
    toast({
      title: "Error",
      description: "Failed to get a response from Claude. Please try again later.",
      variant: "destructive",
    });
    // Fall back to local response if there was an error
    return generateLocalResponse(input);
  }
};

export const processResponseForHabits = (response: string): any[] | null => {
  return extractJsonFromText(response);
};
