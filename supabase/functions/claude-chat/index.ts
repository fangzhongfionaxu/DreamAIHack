
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CLAUDE_API_ENDPOINT = "https://api.anthropic.com/v1/messages";
const CLAUDE_MODEL = "claude-3-haiku-20240307";

const SYSTEM_PROMPT = `You are a habit-tracking assistant for patients with chronic spinal conditions.
The user will talk to you like you are their accountability buddy. Respond to the user in a friendly and motivational tone. You'll be speaking to teenagers, so try to adapt your tone based on their behavior. Also keep your responses concise, ideally less than 20 words so that it's not too difficult to stay engaged with you.

Identify each relevant habit mentioned by the user.
Normalize the habit names (e.g., "wore my back brace" → "brace", "took a walk" → "walk").
For each habit, record a structured JSON object with:
"habit" (normalized string)
"completed" (true/false)
"streak_days" (integer, assume +1 if completed today)

Only use the JSON format shown above. Do not display the JSON object in the output but store the output in the Supabase backend.
Only include the most relevant habits mentioned.`;

// CORS headers for browser access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Handle OPTIONS request for CORS preflight
function handleCors(req: Request) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }
  return null;
}

serve(async (req: Request) => {
  // Handle CORS preflight request
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Get message content from request body
    const { prompt } = await req.json();
    
    if (!prompt || typeof prompt !== 'string') {
      return new Response(
        JSON.stringify({ error: "Invalid or missing prompt" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }
    
    // Access the API key from environment variables (Supabase secrets)
    const apiKey = Deno.env.get("CLAUDE_API_KEY");
    
    if (!apiKey) {
      console.error("Claude API key not found in environment");
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    // Log request (without API key)
    console.log(`Sending request to Claude API for prompt: ${prompt.substring(0, 50)}...`);

    // Create request body with system prompt as a top-level parameter
    // This is the fix - we're moving the system prompt from being a message to a top-level parameter
    const requestBody = {
      model: CLAUDE_MODEL,
      system: SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens: 500
    };

    // Make request to Claude API
    const response = await fetch(CLAUDE_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify(requestBody)
    });

    // Handle API error responses
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
      
      return new Response(
        JSON.stringify({ error: errorMessage }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: response.status }
      );
    }

    // Process successful response
    const data = await response.json();
    
    if (!data.content || !data.content[0] || !data.content[0].text) {
      console.error("Unexpected Claude API response format:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "Unexpected API response format" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }
    
    // Return the AI response
    return new Response(
      JSON.stringify({ text: data.content[0].text }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    // Log and return any errors
    console.error("Edge function error:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
