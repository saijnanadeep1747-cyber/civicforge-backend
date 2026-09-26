const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');

// @route   GET /api/challenges
// @desc    Fetch all civic challenges
router.get('/', async (req, res) => {
  try {
    const challenges = await Challenge.find({});
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching challenges', error: error.message });
  }
});

// @route   POST /api/challenges
// @desc    Submit a new civic challenge
router.post('/', async (req, res) => {
  try {
    const { title, department, description } = req.body;

    const newChallenge = new Challenge({
      title,
      department: department || 'General',
      description,
      status: 'In Review',
      confidenceScore: Math.floor(Math.random() * 25) + 70, // Mock AI Triage score
      readinessIndex: Math.floor(Math.random() * 35) + 50,  // Mock Readiness score
      upvotes: 1,
    });

    const savedChallenge = await newChallenge.save();
    res.status(201).json(savedChallenge);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create challenge', error: error.message });
  }
});

// @route   PATCH /api/challenges/:id/revive
// @desc    Revive a dormant project from Graveyard to Active status
router.patch('/:id/revive', async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    challenge.status = 'Active';
    const updatedChallenge = await challenge.save();
    res.json(updatedChallenge);
  } catch (error) {
    res.status(500).json({ message: 'Server error reviving project', error: error.message });
  }
});

module.exports = router;