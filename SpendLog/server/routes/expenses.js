const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');

// GET all expenses for user
router.get('/', auth, async (req, res) => {
  const expenses = await Expense.find({ userId: req.userId });
  res.json(expenses);
});

// POST new expense
router.post('/', auth, async (req, res) => {
  const { title, amount, category, date } = req.body;
  const newExpense = new Expense({ userId: req.userId, title, amount, category, date });
  await newExpense.save();
  res.status(201).json(newExpense);
});

// PUT update expense
router.put('/:id', auth, async (req, res) => {
  const updated = await Expense.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE expense
router.delete('/:id', auth, async (req, res) => {
  await Expense.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: 'Deleted' });
});

module.exports = router;
