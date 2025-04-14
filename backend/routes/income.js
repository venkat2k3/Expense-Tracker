const express = require('express');
const router = express.Router();
const Income = require('../models/Income');

// Get all income entries
router.get('/', async (req, res) => {
  try {
    const incomes = await Income.find().sort({ date: -1 });
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new income entry
router.post('/', async (req, res) => {
  const income = new Income({
    name: req.body.name,
    amount: req.body.amount
  });

  try {
    const newIncome = await income.save();
    res.status(201).json(newIncome);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
