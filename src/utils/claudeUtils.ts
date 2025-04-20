
const CLAUDE_API_ENDPOINT = "https://api.anthropic.com/v1/messages";
const CLAUDE_MODEL = "claude-3-haiku-20240307";

// Function to call Claude API using project-wide API key
export const callClaudeApi = async (prompt: string): Promise<string> => {
  console.log("Making request to Claude API...");
  
  try {
    const response = await fetch(CLAUDE_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "secret:CLAUDE_API_KEY",
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
