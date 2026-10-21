const calculateCarbonScore = (habits) => {
  let score = 0;

  // Transport (max 30 points)
  const transportScores = {
    'Car': 30,
    'Electric Vehicle': 10,
    'Public Transport': 15,
    'Bike': 5,
    'Walking': 0,
  };
  score += transportScores[habits.transport] || 20;

  // Electricity Usage (max 25 points)
  const electricity = Number(habits.electricityUsage);
  if (electricity > 300) score += 25;
  else if (electricity > 200) score += 20;
  else if (electricity > 150) score += 15;
  else if (electricity > 100) score += 10;
  else score += 5;

  // Food Choice (max 25 points)
  const foodScores = {
    'Meat-based': 25,
    'Mixed': 15,
    'Vegetarian': 8,
    'Vegan': 3,
  };
  score += foodScores[habits.foodChoice] || 15;

  // Shopping Frequency (max 10 points)
  const shoppingScores = {
    'Daily': 10,
    'Weekly': 7,
    'Monthly': 3,
    'Rarely': 1,
  };
  score += shoppingScores[habits.shoppingFrequency] || 5;

  // Waste Disposal (max 10 points)
  const wasteScores = {
    'Mixed bin': 10,
    'Recycling': 5,
    'Composting': 2,
    'Minimal waste': 0,
  };
  score += wasteScores[habits.wasteDisposal] || 5;

  return score; // 0-100, lower is better
};

const getScoreLabel = (score) => {
  if (score <= 20) return 'Excellent 🌱';
  if (score <= 40) return 'Good 🌿';
  if (score <= 60) return 'Needs Improvement 🌍';
  return 'Poor ⚠️';
};

module.exports = { calculateCarbonScore, getScoreLabel };