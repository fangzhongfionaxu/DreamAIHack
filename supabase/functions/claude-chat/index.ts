// src/utils/chatUtils.ts

// Define the Message interface
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

// For development
const RAG_API_URL = 'http://127.0.0.1:5000/chat';

// If you want to make it configurable via environment variables:
// const RAG_API_URL = import.meta.env.VITE_RAG_API_URL || 'http://127.0.0.1:5000/chat';

export const generateResponse = async (
  input: string,
  userId: string,
  conversationHistory: Message[] = []
): Promise<string> => {
  console.log("Calling RAG API with:", input, userId, conversationHistory);
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