
import { GoogleGenAI, Chat } from "@google/genai";

let ai: GoogleGenAI;

try {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
} catch (error) {
    console.error("Failed to initialize GoogleGenAI. Make sure API_KEY is set.", error);
    // In a real app, you might want to show an error to the user.
}


export const initializeChat = async (language: string): Promise<Chat> => {
    if (!ai) {
        throw new Error("GoogleGenAI not initialized. Check API Key.");
    }
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
        systemInstruction: `You are a helpful and enthusiastic chatbot named 'Masti', specializing in world literature, with a deep knowledge of the author Masti Venkatesha Iyengar. Always respond in ${language}. Use headings, emojis, and bullet points to make your answers engaging.`,
    },
  });
  return chat;
};

export const sendMessageToBot = async (chat: Chat, message: string): Promise<string> => {
  if (!chat) {
    throw new Error("Chat session is not initialized.");
  }
  try {
    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "I'm having trouble connecting right now. Please check my configuration or try again later.";
  }
};