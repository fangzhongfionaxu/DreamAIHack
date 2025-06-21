// import { serve } from "https://deno.land/std@0.168.0/http/server.ts";


// const RAG_API_URL = 'http://your-rag-api-url:5000/chat';

// const CLAUDE_API_ENDPOINT = "https://api.anthropic.com/v1/messages";
// const CLAUDE_MODEL = "claude-3-haiku-20240307";

// const SYSTEM_PROMPT = `You are a habit-tracking assistant for patients with chronic spinal conditions.
// The user will talk to you like you are their accountability buddy. Respond to the user in a friendly and motivational tone. You'll be speaking mostly to teenagers. Adapt your tone to the user's behavior. Make sure to keep your responses concise, ideally less than 20 words so that it's not too difficult to stay engaged with you. You are not allowed to diagnose or provide medical advice. If there are any messages that sound troubling, especially for a vulnerable teenager, you are obligated to flag it to the user to seek additional help and highlight that you are not qualified to handle emergencies.

// You will track the user's activities daily through a photo-sharing feature. Each day when users start their activity (e.g. wear a brace), they will send you a photo taken in real-time. Analyze the image to confirm what activity it is. You will record this activity as structured JSON object: 
// "activity" (text) - for the name of the activity (e.g. bracing)
// "start_time" (timestamptz) - for the start time of this activity

// The user would have previously indicated a bracing goal which is stored in the Supabase backend in the user_onboarding table as "bracing_goal". Add this bracing_goal as an interval in terms of number of hours to this "start_time" to create a structured JSON object "projected_end_time" (timestamptz). 

// When the user tells you that they have completed the activity (e.g. removed their brace), ask for a photo confirmation record the timing of this confirmation as a structured JSON object: "end_time" (timestamptz)

// If "end_time" is later than or equal to "projected_end_time", congratulate them for hitting their goals and maintaining their streak. Mark the activity as completed for the day using these structured JSON objects: 
// "completed" (boolean) - mark as TRUE
// "streak_days" (integer) - add 1 for streak maintained

// If "end_time" is earlier than "projected_end_time", encourage the user to try again tomorrow. Mark the activity as not completed for the day using these structured JSON objects: 
// "completed" (boolean) - mark as FALSE
// "streak_days" (integer) - use 0 for streak not maintained

// Only use the JSON format shown above. Do not display the JSON object to the user but store the output in the Supabase backend.`;

// // CORS headers for browser access
// const corsHeaders = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
//   'Content-Type': 'application/json'
// };

// // Handle OPTIONS request for CORS preflight
// function handleCors(req: Request) {
//   if (req.method === "OPTIONS") {
//     return new Response(null, {
//       headers: corsHeaders,
//     });
//   }
//   return null;
// }

// // Utility: Extract activities array from any JSON present in Claude's output
// function tryExtractActivitiesFromText(text: string): any[] | null {
//   if (!text) return null;

//   // Look for JSON arrays or objects in the text output
//   const regex = /```json\s*([\s\S]+?)```|(\[[\s\S]+?\])|({[\s\S]+?})/g;
//   let match: RegExpExecArray | null;
//   let activities: any[] = [];

//   while ((match = regex.exec(text))) {
//     let jsonText = match[1] || match[2] || match[3];

//     try {
//       const data = JSON.parse(jsonText.trim());
//       // If it's already an array, add all items
//       if (Array.isArray(data)) {
//         for (const entry of data) {
//           if (entry && typeof entry.activity === "string") {
//             activities.push(entry);
//           }
//         }
//       } else if (typeof data === "object" && data !== null && data.activity) {
//         // If it's a single activity object, add it
//         activities.push(data);
//       }
//     } catch (e) {
//       console.log("Failed to parse potential JSON:", e);
//     }
//   }

//   return activities.length > 0 ? activities : null;
// }

// // Utility: Remove all JSON blocks matched by tryExtractHabitsFromText regex from the AI text
// function removeJsonBlocks(text: string): string {
//   // Remove both ```json blocks and bare JSON objects/arrays
//   return text.replace(/```json\s*[\s\S]+?```|({[\s\S]+?})|(\[[\s\S]+?\])/g, '').trim();
// }

// serve(async (req: Request) => {
//   // Handle CORS preflight request
//   const corsResponse = handleCors(req);
//   if (corsResponse) return corsResponse;

//   try {
//     // Parse request
//     const { prompt } = await req.json();

//     if (!prompt || typeof prompt !== 'string') {
//       return new Response(
//         JSON.stringify({ error: "Invalid or missing prompt" }),
//         { headers: corsHeaders, status: 400 }
//       );
//     }

//     // Auth: Require JWT (user must be logged in)
//     const supabaseAuthHeader = req.headers.get('Authorization') || req.headers.get('authorization');
//     if (!supabaseAuthHeader) {
//       return new Response(
//         JSON.stringify({ error: "Missing authorization header (user must be authenticated)" }),
//         { headers: corsHeaders, status: 401 }
//       );
//     }
//     const jwt = supabaseAuthHeader.replace("Bearer ", "");
//     // Decode JWT to extract user_id (sub)
//     let user_id = null;
//     try {
//       const payload = JSON.parse(
//         atob(jwt.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
//       );
//       user_id = payload.sub;
//     } catch (e) {
//       console.error("JWT decoding failed", e);
//       return new Response(JSON.stringify({ error: "Invalid authorization token" }), { headers: corsHeaders, status: 401 });
//     }

//     // Access Claude API key from environment variables
//     const apiKey = Deno.env.get("CLAUDE_API_KEY");
//     if (!apiKey) {
//       return new Response(
//         JSON.stringify({ error: "API key not configured" }),
//         { headers: corsHeaders, status: 500 }
//       );
//     }

//     // Log request
//     console.log(`[Claude Chat] Prompt: "${prompt.substring(0, 50)}..." (user_id: ${user_id})`);

//     // Get user's bracing goal from onboarding data
//     let bracingGoal = 12; // default value
//     try {
//       const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
//       const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
      
//       if (SUPABASE_URL && SERVICE_ROLE_KEY) {
//         const onboardingRes = await fetch(`${SUPABASE_URL}/rest/v1/user_onboarding?user_id=eq.${user_id}`, {
//           headers: {
//             "apikey": SERVICE_ROLE_KEY,
//             "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
//           }
//         });
        
//         if (onboardingRes.ok) {
//           const onboardingData = await onboardingRes.json();
//           if (onboardingData && onboardingData[0]?.bracing_goal) {
//             bracingGoal = onboardingData[0].bracing_goal;
//           }
//         }
//       }
//     } catch (e) {
//       console.log("Could not fetch bracing goal, using default:", e);
//     }

//     // Enhanced system prompt with user-specific bracing goal
//     const enhancedSystemPrompt = `${SYSTEM_PROMPT}

// The user's current bracing goal is ${bracingGoal} hours per day. Use this when calculating projected_end_time.`;

//     // Create Claude API request
//     const requestBody = {
//       model: CLAUDE_MODEL,
//       system: enhancedSystemPrompt,
//       messages: [{ role: 'user', content: prompt }],
//       max_tokens: 500
//     };

//     // Make request to Claude API
//     const response = await fetch(CLAUDE_API_ENDPOINT, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-key": apiKey,
//         "anthropic-version": "2023-06-01"
//       },
//       body: JSON.stringify(requestBody)
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Claude API error:", errorText);
//       return new Response(JSON.stringify({ error: "Claude API error" }), { headers: corsHeaders, status: response.status });
//     }

//     const data = await response.json();

//     // Validate Claude output
//     if (!data.content || !data.content[0] || typeof data.content[0].text !== "string") {
//       console.error("Unexpected Claude API response:", JSON.stringify(data));
//       return new Response(
//         JSON.stringify({ error: "Unexpected API response format" }),
//         { headers: corsHeaders, status: 500 }
//       );
//     }

//     let aiText = data.content[0].text;
//     console.log("Original Claude output:", aiText);

//     // --- STEP 1: Try to parse JSON with activities from aiText ---
//     let insertedActivityIds: string[] = [];
//     let activitiesToInsert = tryExtractActivitiesFromText(aiText);
//     console.log("Extracted activities:", activitiesToInsert);

//     if (activitiesToInsert && Array.isArray(activitiesToInsert) && activitiesToInsert.length > 0) {
//       // Insert each activity via Supabase REST API
//       try {
//         const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
//         const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

//         if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
//           console.error("Supabase URL or service role key missing in env");
//         } else {
//           const insertResults = [];

//           for (const activity of activitiesToInsert) {
//             // Insert into activities table (one POST per activity)
//             const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/activities`, {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 "apikey": SERVICE_ROLE_KEY,
//                 "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
//                 "Prefer": "return=representation"
//               },
//               body: JSON.stringify({
//                 user_id,
//                 ...activity
//               })
//             });

//             if (insertRes.ok) {
//               const insertData = await insertRes.json();
//               if (Array.isArray(insertData) && insertData[0]?.id) {
//                 insertedActivityIds.push(insertData[0].id);
//                 insertResults.push({ activity: activity.activity, status: "success" });
//               } else if (insertData && insertData.id) {
//                 insertedActivityIds.push(insertData.id);
//                 insertResults.push({ activity: activity.activity, status: "success" });
//               } else {
//                 insertResults.push({ activity: activity.activity, status: "unknown_id" });
//               }
//             } else {
//               const errorMsg = await insertRes.text();
//               insertResults.push({ activity: activity.activity, status: "error", error: errorMsg });
//             }
//           }

//           console.log(`[Claude Chat] Inserted activities: `, JSON.stringify(insertResults));
//         }
//       } catch (insertionError) {
//         console.error("Error inserting activities:", insertionError);
//       }
//     } else {
//       console.log("No structured activities JSON detected in Claude output.");
//     }

//     // Remove JSON blocks from the AI text so that user doesn't see them
//     aiText = removeJsonBlocks(aiText);

//     // Return AI response text only (JSON removed)
//     return new Response(
//       JSON.stringify({ text: aiText }),
//       { headers: corsHeaders }
//     );
//   } catch (error) {
//     console.error("[Claude Chat] Edge function error:", error);
//     return new Response(
//       JSON.stringify({ error: error.message || "Internal server error" }),
//       { headers: corsHeaders, status: 500 }
//     );
//   }
// });
