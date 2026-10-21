const Habit = require('../models/Habit');
const { calculateCarbonScore, getScoreLabel } = require('../utils/carbonScore');

// Save a new habit entry
const addHabit = async (req, res) => {
  const { transport, electricityUsage, foodChoice, shoppingFrequency, wasteDisposal } = req.body;
  try {
    const score = calculateCarbonScore({ transport, electricityUsage, foodChoice, shoppingFrequency, wasteDisposal });
    const label = getScoreLabel(score);

    const habit = await Habit.create({
      user: req.user.id,
      transport,
      electricityUsage,
      foodChoice,
      shoppingFrequency,
      wasteDisposal,
      carbonScore: score,
      scoreLabel: label
    });
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all habit entries for logged-in user
const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addHabit, getHabits };