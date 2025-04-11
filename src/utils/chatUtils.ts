
export const generateResponse = (input: string): string => {
  let responseContent = '';
  
  if (input.toLowerCase().includes('diagnosis') || 
      input.toLowerCase().includes('diagnose') || 
      input.toLowerCase().includes('what do i have')) {
    responseContent = "Unfortunately, I'm not qualified to provide medical advice or diagnosis. Would you like to consult a healthcare professional instead?";
  } else {
    if (input.toLowerCase().includes('exercise') || input.toLowerCase().includes('exercises')) {
      responseContent = "Remember to do your prescribed exercises regularly. Would you like me to set a reminder for you?";
    } else if (input.toLowerCase().includes('pain') || input.toLowerCase().includes('hurt')) {
      responseContent = "I understand that can be uncomfortable. Make sure to follow your doctor's advice about managing pain. Would you like some general relaxation techniques?";
    } else if (input.toLowerCase().includes('brace') || input.toLowerCase().includes('wear')) {
      responseContent = "Consistent brace wearing is key for your treatment. How many hours have you worn it today?";
    } else {
      responseContent = "I'm here to support you with your treatment plan. Is there something specific you'd like to talk about?";
    }
  }
  
  return responseContent;
};
