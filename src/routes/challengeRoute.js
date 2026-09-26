const express = require('express');
const router = express.Router();

// Temporary in-memory storage
let challenges = [
  {
    _id: '1',
    title: 'Pothole Detection AI',
    department: 'Public Works',
    description: 'Automated road hazard detection using municipal bus cameras.',
    status: 'Graveyard',
    confidenceScore: 82,
    readinessIndex: 65,
    upvotes: 14,
  },
  {
    _id: '2',
    title: 'Smart Waste Sorting',
    department: 'Sanitation',
    description: 'IoT sensor array for public recycling containers.',
    status: 'In Review',
    confidenceScore: 78,
    readinessIndex: 50,
    upvotes: 8,
  },
];

// GET all challenges
router.get('/', (req, res) => {
  res.json(challenges);
});

// POST new challenge
router.post('/', (req, res) => {
  const newChallenge = {
    _id: Date.now().toString(),
    ...req.body,
    status: 'In Review',
    confidenceScore: Math.floor(Math.random() * 25) + 70,
    readinessIndex: Math.floor(Math.random() * 35) + 50,
    upvotes: 1,
  };
  challenges.push(newChallenge);
  res.status(201).json(newChallenge);
});

// PATCH revive challenge
router.patch('/:id/revive', (req, res) => {
  const challenge = challenges.find((c) => c._id === req.params.id);
  if (!challenge) {
    return res.status(404).json({ message: 'Challenge not found' });
  }
  challenge.status = 'Active';
  res.json(challenge);
});

module.exports = router;