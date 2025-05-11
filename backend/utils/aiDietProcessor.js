const { CohereClient } = require('cohere-ai');
const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });

exports.getDietRecommendation = async (userData) => {
  const prompt = `You are a certified health assistant dietician. Generate a JSON diet plan based on this data:
${JSON.stringify(userData, null, 2)}

Respond STRICTLY with valid JSON format containing:
- breakfast (string)
- lunch (string)
- dinner (string)
- snacks (string)
- waterIntake (string with quantity)
- generalTips (array of strings)

Example format:
{
  "breakfast": "...",
  "lunch": "...",
  "dinner": "...",
  "snacks": "...",
  "waterIntake": "...",
  "generalTips": ["...", "..."]
}

Important:
- Use double quotes for all strings
- Escape any double quotes within content
- No markdown formatting
- No extra text outside JSON`;

  try {
    const response = await cohere.generate({
      model: 'command-r-plus',
      prompt: prompt,
      maxTokens: 500,
      temperature: 0.7,
    });

    const text = response.generations[0].text;
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    const jsonString = text.slice(jsonStart, jsonEnd + 1);

    // Add validation and error logging
    try {
      return JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Failed to parse JSON:', jsonString);
      throw new Error('Invalid JSON format from AI response');
    }
    
  } catch (error) {
    console.error('Cohere API Error:', error);
    throw new Error('Failed to generate diet recommendations');
  }
};