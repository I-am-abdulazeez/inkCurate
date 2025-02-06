import { genAI } from "@/utils";


export const analyzePreferences = async (input: string) => {
  try {
    const prompt = `
    You are a book search AI that creates optimized queries for Google Books API.

    Input: "${input}"

    Return focused JSON for book search:
    \`\`\`json
    {
      "genre": "", // Main category (e.g., "Fiction", "Technical", "Self-Help")
      "themes": [], // 1-3 primary search terms
      "character_traits": [], // Only if specifically mentioned
      "time_period": "", // When relevant
      "other_details": [] // Additional key search terms
    }
    \`\`\`

    Guidelines:
    - Use common book categories and search terms
    - Match input language
    - For fiction: focus on genre and themes
    - For technical: use technology name and "Programming"
    - For non-fiction: use subject area and key topics
    - Keep terms simple and searchable
    `
      ;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const result = await model.generateContent([prompt]);
    const text = await result.response.text();

    if (!text) throw new Error("Empty AI response.");

    // Extract only the JSON part
    const jsonMatch = text.match(/```json([\s\S]*?)```/);
    const jsonText = jsonMatch ? jsonMatch[1].trim() : text;

    let parsedData;
    try {
      parsedData = JSON.parse(jsonText);
    } catch (parseError) {
      console.warn("AI response is not valid JSON. Returning as text.", parseError);
      parsedData = { rawResponse: jsonText };
    }

    return {
      success: true,
      data: parsedData,
    };
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred while analyzing the preference.",
    };
  }
};
