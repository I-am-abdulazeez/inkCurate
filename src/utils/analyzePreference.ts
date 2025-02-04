import { genAI } from "@/utils";


export const analyzePreferencesWithAI = async (input: string) => {
  try {
    const prompt = `
    You are an AI designed to extract book details from user input for recommendation purposes.

    ### **Task:**
    Extract **key details** from the following book request and return the response **strictly in valid JSON format**.

    ### **User Input:** "${input}"

    ### **Expected JSON Output Format:**
    \`\`\`json
    {
      "genre": "Mystery",
      "themes": ["Strong female lead", "Psychological suspense"],
      "character_traits": ["Intelligent", "Independent"],
      "time_period": "Modern",
      "other_details": ["Set in a small town", "Detective as main character"]
    }
    \`\`\`
    `;

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
      data: parsedData, // Now properly parsed JSON or raw text
    };
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred while analyzing the preference.",
    };
  }
};
