require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const getSuggestions = async (req, res) => {
  const { transport, electricityUsage, foodChoice, shoppingFrequency, wasteDisposal } = req.body;

  try {
    const completion = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [
        {
          role: 'user',
          content: `
            You are an environmental sustainability expert.
            A user has shared their daily habits:
            - Transport: ${transport}
            - Electricity Usage: ${electricityUsage} units/month
            - Food Choice: ${foodChoice}
            - Shopping Frequency: ${shoppingFrequency}
            - Waste Disposal: ${wasteDisposal}

            Based on these habits:
            1. Give 5 specific, actionable eco-friendly suggestions to reduce their carbon footprint.
            2. Rate their current lifestyle as: Excellent / Good / Needs Improvement / Poor
            3. Give one motivational closing line.

            Format your response exactly like this:
            RATING: [rating here]
            SUGGESTIONS:
            1. [suggestion]
            2. [suggestion]
            3. [suggestion]
            4. [suggestion]
            5. [suggestion]
            MOTIVATION: [motivational line]
          `
        }
      ],
    });

    const text = completion.choices[0]?.message?.content || '';
    console.log('AI RAW RESPONSE:', text);

    const ratingMatch = text.match(/RATING:\s*(.+)/);
    const motivationMatch = text.match(/MOTIVATION:\s*(.+)/);
    const suggestionsMatch = text.match(/SUGGESTIONS:\s*\n([\s\S]*?)(?:MOTIVATION|$)/);

    const rating = ratingMatch ? ratingMatch[1].trim() : 'Good';
    const motivation = motivationMatch ? motivationMatch[1].trim() : 'Every small step counts!';
    const suggestionsRaw = suggestionsMatch ? suggestionsMatch[1].trim() : '';
    const suggestions = suggestionsRaw
  .split('\n')
  .filter(s => s.trim())
  .map(s => s.replace(/^\d+\.\s*/, '').trim())
  .filter(s => s.length > 0);

    res.status(200).json({ rating, suggestions, motivation });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'AI service error' });
  }
};

module.exports = { getSuggestions };