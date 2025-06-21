
// import { toast } from "@/components/ui/use-toast";
// import { supabase } from "@/integrations/supabase/client";

// // Function to check if we can connect to the Claude API
// const canConnectToClaudeApi = async (): Promise<boolean> => {
//   try {
//     // Make a simple call to check if the edge function exists and is properly configured
//     const { error } = await supabase.functions.invoke("claude-chat", {
//       body: { prompt: "test" },
//     });
    
//     if (error) {
//       console.error("Error checking Claude API connection:", error);
//       return false;
//     }
    
//     return true;
//   } catch (error) {
//     console.error("Error checking Claude API connection:", error);
//     return false;
//   }
// };

// export const generateResponse = async (input: string): Promise<string> => {
//   console.log("Generating response for:", input);
  
//   try {
//     console.log("Calling Claude API via edge function");
    
//     // Call the Claude API via our edge function
//     const { data, error } = await supabase.functions.invoke("claude-chat", {
//       body: { prompt: input },
//     });
    
//     if (error) {
//       console.error("Error from Claude edge function:", error);
//       throw new Error(error.message || "Failed to communicate with Claude");
//     }
    
//     if (!data || !data.text) {
//       console.error("Unexpected response format:", data);
//       throw new Error("Received an invalid response format");
//     }
    
//     console.log("Claude API response received successfully");
//     return data.text;
//   } catch (error) {
//     console.error("Error generating response with Claude:", error);
    
//     toast({
//       title: "Error",
//       description: error instanceof Error ? error.message : "Failed to communicate with Claude",
//       variant: "destructive",
//     });
    
//     return "I'm having trouble connecting right now. Please try again in a moment.";
//   }
// };

// import { Message } from '../types/chat';  // Assuming you have a Message type defined

const RAG_API_URL = 'http://127.0.0.1:5000/chat';  // Update with your actual API URL

export const generateResponse = async (
  input: string,
  userId: string,
  conversationHistory: string
): Promise<string> => {
  try {
    const response = await fetch(RAG_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: input,
        user_id: userId,
        conversation_history: conversationHistory
      }),
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status === 'error') {
      throw new Error(data.error);
    }

    return data.response;

  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
};

export const canConnectToRagApi = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${RAG_API_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('Failed to connect to RAG API:', error);
    return false;
  }
};