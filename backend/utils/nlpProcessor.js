const { OpenAI } = require('openai');
const openaiInstance = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.generatePrescription = async (conversationText) => {
  const prompt = `Analyze the following doctor-patient conversation and generate a prescription with medications and instructions:
"""
${conversationText}
"""`;

  const response = await openaiInstance.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are an experienced medical assistant.' },
      { role: 'user', content: prompt }
    ]
  });

  const content = response.choices[0].message.content;
  return JSON.parse(content); // Expects JSON format from the model
};
