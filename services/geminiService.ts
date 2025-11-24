import { GoogleGenAI, Tool } from "@google/genai";
import { SearchResult, ParsedOpportunity } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const searchOpportunities = async (query: string, location: string): Promise<SearchResult> => {
  try {
    const modelId = 'gemini-2.5-flash';
    // We request a specific format to allow manual parsing since Search tool doesn't support JSON schema
    const prompt = `
      Please use Google Search to find volunteer opportunities suitable for middle or high school students related to "${query}" in "${location}".
      
      Focus on non-profits, community centers, libraries, or charities.
      
      Please list 3-5 specific opportunities. To help me process them, strictly follow this format for each opportunity, separated by "---":

      ---
      Name: [Organization Name]
      Role: [Volunteer Role]
      Description: [Short description including requirements]
      ---
      
      If structured data is not found, try to provide it in a similar clear format.
    `;

    // Configure tools with Google Search
    const tools: Tool[] = [{ googleSearch: {} }];

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: tools,
        systemInstruction: "You are 'TimeBank', an AI assistant helping students find real volunteer work. Please answer in English.",
      },
    });

    const text = response.text || "No relevant opportunities found.";
    
    // Parse the text into structured objects
    const parsedOpportunities: ParsedOpportunity[] = [];
    const parts = text.split('---');
    
    parts.forEach(part => {
      const nameMatch = part.match(/Name:\s*(.+)/i);
      const roleMatch = part.match(/Role:\s*(.+)/i);
      const descMatch = part.match(/Description:\s*(.+)/is); // s flag for multiline

      if (nameMatch && roleMatch) {
        parsedOpportunities.push({
          name: nameMatch[1].trim(),
          role: roleMatch[1].trim(),
          description: descMatch ? descMatch[1].trim() : "Please contact the organization for details."
        });
      }
    });

    // Extract grounding chunks (URLs)
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .map((chunk) => {
        if (chunk.web) {
          return {
            title: chunk.web.title || "Source",
            uri: chunk.web.uri || "#",
          };
        }
        return null;
      })
      .filter((source): source is { title: string; uri: string } => source !== null);

    // Filter unique URIs
    const sourceMap = new Map<string, { title: string; uri: string }>();
    sources.forEach((item) => sourceMap.set(item.uri, item));
    const uniqueSources = Array.from(sourceMap.values());

    return {
      text,
      parsedOpportunities,
      sources: uniqueSources,
    };

  } catch (error) {
    console.error("Error searching opportunities:", error);
    return {
      text: "Sorry, the search service is temporarily unavailable. Please try again later.",
      parsedOpportunities: [],
      sources: []
    };
  }
};

export const verifyActivityLog = async (description: string, hours: number): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), 1500);
    });
};