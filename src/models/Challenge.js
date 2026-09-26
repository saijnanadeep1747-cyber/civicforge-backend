const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    department: { type: String, default: 'General' },
    description: { type: String, required: true },
    status: { type: String, enum: ['Active', 'In Review', 'Graveyard'], default: 'In Review' },
    confidenceScore: { type: Number, default: 75 },
    readinessIndex: { type: Number, default: 60 },
    upvotes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Challenge', challengeSchema);