
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
  'Content-Type': 'application/json'
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

// Utility: Extract habits array from any JSON present in Claude's output
function tryExtractHabitsFromText(text: string): any[] | null {
  if (!text) return null;
  // Look for a JSON array or object in the text output
  const regex = /```json\s*([\s\S]+?)```|({[\s\S]+?})|(\[[\s\S]+?\])/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text))) {
    let json = match[1] || match[2] || match[3];
    try {
      const data = JSON.parse(json.trim());
      if (Array.isArray(data)) return data;
      if (typeof data === "object" && data.habit) return [data];
    } catch (e) {
      // Ignore parse errors: continue searching
    }
  }
  return null;
}

serve(async (req: Request) => {
  // Handle CORS preflight request
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Parse request
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return new Response(
        JSON.stringify({ error: "Invalid or missing prompt" }),
        { headers: corsHeaders, status: 400 }
      );
    }

    // Auth: Require JWT (user must be logged in)
    const supabaseAuthHeader = req.headers.get('Authorization') || req.headers.get('authorization');
    if (!supabaseAuthHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header (user must be authenticated)" }),
        { headers: corsHeaders, status: 401 }
      );
    }
    const jwt = supabaseAuthHeader.replace("Bearer ", "");
    // Decode JWT to extract user_id (sub)
    let user_id = null;
    try {
      const payload = JSON.parse(
        atob(jwt.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
      );
      user_id = payload.sub;
    } catch (e) {
      console.error("JWT decoding failed", e);
      return new Response(JSON.stringify({ error: "Invalid authorization token" }), { headers: corsHeaders, status: 401 });
    }

    // Access Claude API key from environment variables
    const apiKey = Deno.env.get("CLAUDE_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        { headers: corsHeaders, status: 500 }
      );
    }

    // Log request
    console.log(`[Claude Chat] Prompt: "${prompt.substring(0, 50)}..." (user_id: ${user_id})`);

    // Create Claude API request
    const requestBody = {
      model: CLAUDE_MODEL,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Claude API error:", errorText);
      return new Response(JSON.stringify({ error: "Claude API error" }), { headers: corsHeaders, status: response.status });
    }

    const data = await response.json();

    // Validate Claude output
    if (!data.content || !data.content[0] || typeof data.content[0].text !== "string") {
      console.error("Unexpected Claude API response:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "Unexpected API response format" }),
        { headers: corsHeaders, status: 500 }
      );
    }

    const aiText = data.content[0].text;

    // --- STEP 1: Try to parse JSON with habits from aiText ---
    let insertedHabitIds: string[] = [];
    let habitsToInsert = tryExtractHabitsFromText(aiText);

    if (habitsToInsert && Array.isArray(habitsToInsert)) {
      // Insert each habit via Supabase REST API
      try {
        const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
        const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

        if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
          console.error("Supabase URL or service role key missing in env");
        } else {
          const insertResults = [];

          for (const habit of habitsToInsert) {
            // Sanity check the structure
            if (
              typeof habit.habit !== "string" ||
              typeof habit.completed !== "boolean" ||
              typeof habit.streak_days !== "number"
            ) {
              console.warn("Malformed habit object:", habit);
              continue;
            }

            // Insert into habits table
            const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/habits`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "apikey": SERVICE_ROLE_KEY,
                "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
                "Prefer": "return=representation"
              },
              body: JSON.stringify([{
                user_id,
                habit: habit.habit,
                completed: habit.completed,
                streak_days: habit.streak_days
              }])
            });

            if (insertRes.ok) {
              const insertData = await insertRes.json();
              if (Array.isArray(insertData) && insertData[0] && insertData[0].id) {
                insertedHabitIds.push(insertData[0].id);
                insertResults.push({ habit: habit.habit, status: "success" });
              } else {
                insertResults.push({ habit: habit.habit, status: "unknown_id" });
              }
            } else {
              const errorMsg = await insertRes.text();
              insertResults.push({ habit: habit.habit, status: "error", error: errorMsg });
            }
          }

          console.log(`[Claude Chat] Inserted habits: `, JSON.stringify(insertResults));
        }
      } catch (insertionError) {
        console.error("Error inserting habits:", insertionError);
      }
    } else {
      console.log("No structured habits JSON detected in Claude output.");
    }

    // Return AI response text
    return new Response(
      JSON.stringify({ text: aiText }),
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("[Claude Chat] Edge function error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { headers: corsHeaders, status: 500 }
    );
  }
});
