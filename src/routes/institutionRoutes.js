const express = require('express');
const router = express.Router();
const Institution = require('../models/Institution');

// @route   GET /api/institutions
// @desc    Fetch all registered institutions & passports
router.get('/', async (req, res) => {
  try {
    const institutions = await Institution.find({});
    res.json(institutions);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching institutions', error: error.message });
  }
});

// @route   POST /api/institutions
// @desc    Register a new institution
router.post('/', async (req, res) => {
  try {
    const { name, type, passportBadge } = req.body;

    const newInstitution = new Institution({
      name,
      type,
      activeProjects: 0,
      passportBadge: passportBadge || 'Bronze Innovator',
    });

    const savedInstitution = await newInstitution.save();
    res.status(201).json(savedInstitution);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create institution', error: error.message });
  }
});

module.exports = router;