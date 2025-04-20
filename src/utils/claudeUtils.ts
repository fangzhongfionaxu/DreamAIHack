
import { toast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

interface ClaudeResponse {
  content: Array<{ text: string; type: string }>;
}

export const CLAUDE_SYSTEM_PROMPT = `
You are a habit-tracking assistant for patients with chronic spinal conditions. 
The user will talk to you like you are their accountability buddy. Respond to the user in a friendly tone.

1. Identify each relevant habit mentioned.
2. Normalize the habit names (e.g., "wore my back brace" → "brace", "took a walk" → "walk").
3. For each habit, return a structured JSON object with:
   - "habit" (normalized string)
   - "completed" (true/false)
   - "streak_days" (integer, assume +1 if completed today)

At the end of your response, output the JSON list like:
[
  {"habit": "brace", "completed": true, "streak_days": 3},
  {"habit": "walk", "completed": true, "streak_days": 2}
]

Only use the JSON format shown above. Do not explain the output.
Only include the most relevant habits mentioned.
`;

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = 'claude-3-7-sonnet-latest';

export const callClaudeAPI = async (
  userMessage: string,
  messageHistory: Message[] = [],
  apiKey: string
): Promise<string> => {
  try {
    // Format message history in the format Claude API expects
    const formattedHistory = messageHistory.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Add the latest user message
    const messages = [
      ...formattedHistory,
      { role: 'user', content: userMessage }
    ];

    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 1000,
        temperature: 0.6,
        system: CLAUDE_SYSTEM_PROMPT,
        messages: messages,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Claude API error:', errorData);
      throw new Error(`API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json() as ClaudeResponse;
    return data.content[0].text;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    toast({
      title: "Error",
      description: "Failed to get a response from Claude. Please try again later.",
      variant: "destructive",
    });
    return "I'm sorry, I encountered an error processing your request. Please try again later.";
  }
};

export const extractJsonFromText = (text: string): any | null => {
  try {
    // Look for JSON pattern in text
    const jsonMatch = text.match(/\[[\s\S]*?\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return null;
  } catch (error) {
    console.error('Error extracting JSON:', error);
    return null;
  }
};
