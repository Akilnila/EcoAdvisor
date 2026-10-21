const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  transport: {
    type: String,
    required: true
  },
  electricityUsage: {
    type: Number,
    required: true
  },
  foodChoice: {
    type: String,
    required: true
  },
  shoppingFrequency: {
    type: String,
    required: true
  },
  wasteDisposal: {
    type: String,
    required: true
  },
  carbonScore: {
    type: Number,
    default: 0
  },
  scoreLabel: {
    type: String,
    default: 'Good'
  }
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);