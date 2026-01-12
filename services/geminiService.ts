import { GoogleGenAI } from "@google/genai";
import { ThemeConfig } from "../types";

export const getDesignCritique = async (theme: ThemeConfig, userRole: string) => {
  // Initialize AI instance within the call to ensure the latest API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    As a world-class Design Critic, analyze this portfolio theme direction for ${userRole}:
    Theme Name: ${theme.name}
    Aesthetic: ${theme.tagline}
    Description: ${theme.description}
    Style Category: ${theme.style}

    Provide a concise (max 150 words) professional critique on how this visual direction communicates seniority and leadership for a Senior Creative Director/Branding expert. 
    Focus on perception, market authority, and the effectiveness of the editorial aesthetic.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "Critique unavailable at the moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating AI critique.";
  }
};