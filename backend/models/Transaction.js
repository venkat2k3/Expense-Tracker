const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: String,
  type: { type: String, enum: ['income', 'expense'] },
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now },
  note: String,
});

module.exports = mongoose.model('Transaction', TransactionSchema);
