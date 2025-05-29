const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    category: { type: String, required: true, default: "other💰" },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", IncomeSchema);
