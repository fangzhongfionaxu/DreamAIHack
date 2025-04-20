
const CLAUDE_API_ENDPOINT = "https://api.anthropic.com/v1/messages";
const CLAUDE_MODEL = "claude-3-haiku-20240307";

// Function to call Claude API using project-wide API key
export const callClaudeApi = async (prompt: string): Promise<string> => {
  console.log("Making request to Claude API...");
  
  // Create request body
  const requestBody = {
    model: CLAUDE_MODEL,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    max_tokens: 500
  };
  
  // Log request (without API key)
  console.log("Claude API request body:", JSON.stringify(requestBody, null, 2));
  
  try {
    // Replace placeholder with actual secret value at runtime
    // The secret is injected when deployed
    const response = await fetch(CLAUDE_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_API_KEY || "secret:CLAUDE_API_KEY",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Claude API error status:", response.status);
      console.error("Claude API error response:", errorText);
      
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
    console.log("Claude API response received successfully");
    
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
