const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');


router.post('/', async (req, res) => {
  const transaction = new Transaction(req.body);
  await transaction.save();
  res.status(201).json({ message: 'Transaction added' });
});


router.get('/:userId', async (req, res) => {
  const transactions = await Transaction.find({ userId: req.params.userId });
  res.json(transactions);
});

module.exports = router;
