
import { toast } from "@/components/ui/use-toast";

const CLAUDE_API_ENDPOINT = "https://api.anthropic.com/v1/messages";
const CLAUDE_MODEL = "claude-3-haiku-20240307";

let storedApiKey: string | null = null;

// Function to get API key from localStorage or the one passed in
export const getApiKey = (apiKey?: string): string | null => {
  if (apiKey) {
    return apiKey;
  }
  
  if (storedApiKey) {
    return storedApiKey;
  }
  
  // Try to get from localStorage
  const savedKey = localStorage.getItem('claude_api_key');
  if (savedKey) {
    storedApiKey = savedKey;
    return savedKey;
  }
  
  return null;
};

// Function to save API key to localStorage
export const saveApiKey = (apiKey: string): void => {
  localStorage.setItem('claude_api_key', apiKey);
  storedApiKey = apiKey;
  console.log("API key saved successfully");
};

// Function to remove API key from localStorage
export const removeApiKey = (): void => {
  localStorage.removeItem('claude_api_key');
  storedApiKey = null;
};

// Function to check if API key is valid
export const isApiKeyValid = (apiKey: string): boolean => {
  return apiKey && apiKey.startsWith('sk-') && apiKey.length > 20;
};

// Function to call Claude API
export const callClaudeApi = async (prompt: string, apiKey?: string): Promise<string> => {
  const key = getApiKey(apiKey);
  
  if (!key) {
    console.error("Claude API call failed: No API key provided");
    throw new Error("No API key provided");
  }

  console.log("Making request to Claude API...");
  
  try {
    const response = await fetch(CLAUDE_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Claude API error:", response.status, errorText);
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { error: errorText };
      }
      
      const errorMessage = errorData.error?.message || `API request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("Claude API response received", data);
    
    if (!data.content || !data.content[0] || !data.content[0].text) {
      console.error("Unexpected Claude API response format:", data);
      throw new Error("Unexpected API response format");
    }
    
    return data.content[0].text;
  } catch (error) {
    console.error("Error calling Claude API:", error);
    throw error;
  }
};
