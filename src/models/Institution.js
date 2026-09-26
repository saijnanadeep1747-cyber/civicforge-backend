const mongoose = require('mongoose');

const institutionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    activeProjects: { type: Number, default: 0 },
    passportBadge: { type: String, default: 'Bronze Innovator' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Institution', institutionSchema);