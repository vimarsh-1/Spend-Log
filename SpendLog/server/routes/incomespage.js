const express = require("express");
const router = express.Router();
const Income = require("../models/Income");
const auth = require("../middleware/auth");

// GET all expenses for user
router.get("/", auth, async (req, res) => {
  const incomes = await Income.find({ userId: req.userId });
  res.json(incomes);
});

// POST new expense
router.post("/", auth, async (req, res) => {
  const { title, amount } = req.body;
  const newIncome = new Income({ userId: req.userId, title, amount });
  await newIncome.save();
  res.status(201).json(newIncome);
});

// PUT update expense
router.put("/:id", auth, async (req, res) => {
  const updated = await Income.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE expense
router.delete("/:id", auth, async (req, res) => {
  await Income.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: "Deleted" });
});

module.exports = router;
