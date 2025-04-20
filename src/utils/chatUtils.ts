
import { callClaudeApi, getApiKey } from './claudeUtils';

export const generateResponse = async (input: string): Promise<string> => {
  const apiKey = getApiKey();
  
  // If we have an API key, use Claude API
  if (apiKey) {
    try {
      return await callClaudeApi(input);
    } catch (error) {
      console.error("Error generating response with Claude:", error);
      // Fall back to preset responses if API fails
      return generateFallbackResponse(input);
    }
  } else {
    // No API key, use fallback responses
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
