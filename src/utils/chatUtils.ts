import { supabase } from "@/integrations/supabase/client";

// Types
interface Message {
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
  timestamp: Date;
}

// Backend API URL
const RAG_API_URL = 'http://127.0.0.1:5001/chat';
const HEALTH_API_URL = 'http://127.0.0.1:5001/api/health';

// Function to update streak when user practices with brace
async function updateStreak(userId: string, photoUrl?: string) {
  try {
    const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    
    console.log('Updating streak for user:', userId, 'date:', today);
    
    // First check if a streak already exists for today
    const { data: existingStreak, error: checkError } = await (supabase as any)
      .from('streaks')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error('Error checking existing streak:', checkError);
      throw checkError;
    }

    if (existingStreak) {
      console.log('Updating existing streak:', existingStreak.id);
      // Update existing streak
      const { error: updateError } = await (supabase as any)
        .from('streaks')
        .update({
          status: 'completed',
          photo_url: photoUrl || existingStreak.photo_url,
          practice_time: existingStreak.practice_time + 1
        })
        .eq('id', existingStreak.id);

      if (updateError) {
        console.error('Error updating existing streak:', updateError);
        throw updateError;
      }
    } else {
      console.log('Creating new streak for today');
      // Create new streak
      const { error: insertError } = await (supabase as any)
        .from('streaks')
        .insert({
          user_id: userId,
          date: today,
          practice_time: 1,
          photo_url: photoUrl,
          status: 'completed'
        });

      if (insertError) {
        console.error('Error creating new streak:', insertError);
        throw insertError;
      }

      // Update user's streak count
      const { data: userData, error: userError } = await (supabase as any)
        .from('users')
        .select('streak_count, total_practice_time')
        .eq('id', userId)
        .single();

      if (userError) {
        console.error('Error getting user data:', userError);
        throw userError;
      }

      console.log('Current user data:', userData);

      const { error: updateUserError } = await (supabase as any)
        .from('users')
        .update({
          streak_count: (userData?.streak_count || 0) + 1,
          total_practice_time: (userData?.total_practice_time || 0) + 1
        })
        .eq('id', userId);

      if (updateUserError) {
        console.error('Error updating user streak count:', updateUserError);
        throw updateUserError;
      }

      console.log('User streak count updated successfully');
    }

    return true;
  } catch (error) {
    console.error('Error updating streak:', error);
    throw error;
  }
}

// Function to convert base64 to blob
function base64ToBlob(base64Data: string, contentType: string = 'image/jpeg'): Blob {
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
}

// Main function to generate response from backend
export const generateResponse = async (
  input: string,
  userId: string,
  conversationHistory: Message[] | string
): Promise<string> => {
  try {
    console.log('🚀 Generating response...');
    console.log('Input:', input);
    console.log('User ID:', userId);
    console.log('API URL:', RAG_API_URL);

    // Parse conversation history if it's a string
    let parsedHistory: any[] = [];
    if (typeof conversationHistory === 'string') {
      try {
        parsedHistory = JSON.parse(conversationHistory);
      } catch (e) {
        console.log('Could not parse conversation history, using empty array');
        parsedHistory = [];
      }
    } else if (Array.isArray(conversationHistory)) {
      parsedHistory = conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp instanceof Date ? msg.timestamp.toISOString() : msg.timestamp
      }));
    }

    const payload = {
      message: input,
      user_id: userId,
      conversation_history: parsedHistory
    };

    console.log('📤 Sending payload:', payload);

    const response = await fetch(RAG_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    console.log('📥 Response status:', response.status);
    console.log('📥 Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error response text:', errorText);
      throw new Error(`Backend API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    console.log('📋 Response data:', data);

    if (data.status === 'error') {
      throw new Error(data.error || 'Unknown error from backend');
    }

    // Handle brace detection and streak update
    if (data.is_brace && userId !== 'anonymous') {
      try {
        console.log('🦷 Brace detected! Updating streak...');
        await updateStreak(userId);
        console.log('✅ Streak updated successfully');
      } catch (streakError) {
        console.error('❌ Error updating streak:', streakError);
        // Don't throw here, just log the error so the main response still works
      }
    }

    return data.response || 'No response received from backend';

  } catch (error) {
    console.error('❌ Error in generateResponse:', error);
    
    // Provide specific error messages based on error type
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to the AI service. Please check if the backend server is running on port 5000.');
    }
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('An unexpected error occurred while generating response');
  }
};

// Function to handle image uploads and brace detection
export const generateImageResponse = async (
  imageDataUrl: string,
  userId: string,
  conversationHistory: Message[] | string
): Promise<string> => {
  try {
    console.log('🖼️ Processing image for brace detection...');

    // Parse conversation history
    let parsedHistory: any[] = [];
    if (typeof conversationHistory === 'string') {
      try {
        parsedHistory = JSON.parse(conversationHistory);
      } catch (e) {
        parsedHistory = [];
      }
    } else if (Array.isArray(conversationHistory)) {
      parsedHistory = conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp instanceof Date ? msg.timestamp.toISOString() : msg.timestamp
      }));
    }

    // Send image data to backend for processing
    const payload = {
      message: `Please analyze this image for brace detection: ${imageDataUrl}`,
      user_id: userId,
      conversation_history: parsedHistory,
      type: 'image'
    };

    console.log('📤 Sending image payload to backend...');

    const response = await fetch(RAG_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Backend API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    console.log('📋 Image response data:', data);

    if (data.status === 'error') {
      throw new Error(data.error || 'Unknown error from backend');
    }

    // If brace is detected, upload image and update streak
    if (data.is_brace && userId !== 'anonymous') {
      try {
        console.log('🦷 Brace detected in image! Uploading and updating streak...');
        
        // Convert base64 to blob for upload
        const base64Data = imageDataUrl.split(',')[1];
        const blob = base64ToBlob(base64Data);

        // Upload to Supabase storage
        const fileName = `${userId}/${Date.now()}.jpg`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('brace-photos')
          .upload(fileName, blob);

        if (uploadError) {
          console.error('❌ Error uploading image:', uploadError);
          // Still update streak without photo URL
          await updateStreak(userId);
        } else {
          console.log('✅ Image uploaded successfully');
          const photoUrl = supabase.storage
            .from('brace-photos')
            .getPublicUrl(uploadData.path).data.publicUrl;
          
          await updateStreak(userId, photoUrl);
        }

        console.log('✅ Brace detected and streak updated!');
      } catch (streakError) {
        console.error('❌ Error updating streak:', streakError);
        // Don't throw here, just log the error
      }
    }

    return data.response || 'Image processed successfully';

  } catch (error) {
    console.error('❌ Error in generateImageResponse:', error);
    throw error;
  }
};

// Health check function
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    console.log('🔍 Checking backend health...');
    const response = await fetch(HEALTH_API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    const isHealthy = response.ok;
    console.log('💓 Backend health status:', isHealthy);
    
    if (isHealthy) {
      const data = await response.json();
      console.log('💓 Health response:', data);
    }
    
    return isHealthy;
  } catch (error) {
    console.error('❌ Backend health check failed:', error);
    return false;
  }
};

// Function to test connection
export const testConnection = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const isHealthy = await checkBackendHealth();
    if (!isHealthy) {
      return {
        success: false,
        message: 'Backend server is not responding. Please make sure it\'s running on port 5000.'
      };
    }

    // Test actual chat endpoint
    const testResponse = await generateResponse(
      'Hello, this is a connection test',
      'test-user',
      []
    );

    return {
      success: true,
      message: `Connection successful! Response: ${testResponse.substring(0, 100)}...`
    };
  } catch (error) {
    return {
      success: false,
      message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};