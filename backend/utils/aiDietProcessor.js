const { CohereClient } = require("cohere-ai");
const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });

exports.getDietRecommendation = async (userData) => {
  const prompt = `You are a certified health assistant dietician. Generate a diet plan based on this data:
${JSON.stringify(userData, null, 2)}

Respond with a diet plan in this EXACT JSON format:
{
  "breakfast": "meal description",
  "lunch": "meal description",
  "dinner": "meal description",
  "snacks": ["snack 1", "snack 2", "snack 3"],
  "waterIntake": "recommended amount",
  "generalTips": ["tip 1", "tip 2", "tip 3"]
}

Rules:
1. Use double quotes for all strings
2. Do not escape quotes within content
3. Keep responses concise and clear
4. Return ONLY the JSON object, no other text
5. For snacks and generalTips, use an array of strings`;

  try {
    const response = await cohere.generate({
      model: "command-r-plus",
      prompt: prompt,
      maxTokens: 500,
      temperature: 0.7,
      stopSequences: ["}"],
    });

    const text = response.generations[0].text.trim();

    // Find the first { and last }
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("Invalid response format: Missing JSON brackets");
    }

    let jsonString = text.slice(jsonStart, jsonEnd + 1);

    // Function to clean and parse JSON string
    const cleanAndParseJSON = (str) => {
      try {
        // First try parsing as is
        return JSON.parse(str);
      } catch (e) {
        // If that fails, try cleaning the string
        let cleanedStr = str
          .replace(/\n/g, " ") // Remove newlines
          .replace(/\s+/g, " ") // Normalize whitespace
          .replace(/\\"/g, '"') // Replace escaped quotes with regular quotes
          .replace(/([{,]\s*)([a-zA-Z0-9_]+)(\s*:)/g, '$1"$2"$3') // Ensure property names are quoted
          .replace(/"\s*:\s*"/g, '": "') // Fix spacing around colons
          .replace(/"\s*,\s*"/g, '", "') // Fix spacing around commas
          .replace(/"\s*}\s*"/g, '"}') // Fix spacing around closing braces
          .replace(/"\s*]\s*"/g, '"]') // Fix spacing around closing brackets
          .replace(/"\s*\[\s*"/g, '["') // Fix array start
          .replace(/"\s*\]\s*"/g, '"]') // Fix array end
          .replace(/([^\\])"/g, '$1\\"') // Escape unescaped quotes
          .replace(/\\{2}"/g, '\\"') // Fix double escaped quotes
          .replace(/\\\\/g, "\\") // Fix double backslashes
          .replace(/"\s*"/g, '"') // Remove empty quotes
          .replace(/\[\s*\]/g, "[]") // Fix empty arrays
          .replace(/\{\s*\}/g, "{}") // Fix empty objects
          .replace(/"\s*:\s*\[\s*\]/g, '": []') // Fix empty array values
          .replace(/"\s*:\s*\{\s*\}/g, '": {}'); // Fix empty object values

        try {
          return JSON.parse(cleanedStr);
        } catch (e2) {
          // If that still fails, try one more time with a different approach
          cleanedStr = cleanedStr
            .replace(/([^\\])"/g, '$1\\"') // Escape all unescaped quotes
            .replace(/\\{2}"/g, '\\"') // Fix double escaped quotes
            .replace(/\\\\/g, "\\") // Fix double backslashes
            .replace(/"\s*"/g, '"') // Remove empty quotes
            .replace(/\[\s*\]/g, "[]") // Fix empty arrays
            .replace(/\{\s*\}/g, "{}") // Fix empty objects
            .replace(/"\s*:\s*\[\s*\]/g, '": []') // Fix empty array values
            .replace(/"\s*:\s*\{\s*\}/g, '": {}'); // Fix empty object values

          return JSON.parse(cleanedStr);
        }
      }
    };

    try {
      const parsedData = cleanAndParseJSON(jsonString);

      // Validate the required structure
      const requiredFields = [
        "breakfast",
        "lunch",
        "dinner",
        "snacks",
        "waterIntake",
        "generalTips",
      ];

      // Check for missing fields
      const missingFields = requiredFields.filter(
        (field) => !(field in parsedData)
      );

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }

      // Validate field types
      if (!Array.isArray(parsedData.snacks)) {
        parsedData.snacks = [parsedData.snacks];
      }
      if (!Array.isArray(parsedData.generalTips)) {
        parsedData.generalTips = [parsedData.generalTips];
      }

      // Ensure all fields are strings or arrays of strings
      const stringFields = ["breakfast", "lunch", "dinner", "waterIntake"];
      stringFields.forEach((field) => {
        if (typeof parsedData[field] !== "string") {
          parsedData[field] = String(parsedData[field]);
        }
      });

      return parsedData;
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Problematic JSON string:", jsonString);
      throw new Error("Failed to parse diet recommendations");
    }
  } catch (error) {
    console.error("Diet Generation Error:", error);
    throw new Error("Failed to generate diet recommendations");
  }
};
