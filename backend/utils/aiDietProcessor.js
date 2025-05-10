const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.getDietRecommendation = async (userData) => {
  const prompt = `Generate a personalized diet plan for the following patient data:
${JSON.stringify(userData)}
`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a health assistant dietician.' },
      { role: 'user', content: prompt }
    ]
  });

  const content = completion.choices[0].message.content;
  return JSON.parse(content); // Assumes output is JSON string
};