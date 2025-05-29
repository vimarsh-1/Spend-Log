import React, { useState } from "react";
import API from "../services/api";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";

const ExpenseForm = ({ onAdd }) => {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const predefinedCategories = [
    "🛒 Groceries",
  "🍽️ Dining Out",
  "🏠 Rent",
  "🔌 Utilities",
  "🚗 Transportation",
  "🚌 Public Transit",
  "⛽ Fuel",
  "📱 Mobile Bill",
  "💻 Internet",
  "🎓 Education",
  "🏥 Medical",
  "💊 Medicines",
  "👕 Clothing",
  "🎉 Entertainment",
  "💅 Personal Care",
  "🐾 Pet Care",
  "✈️ Travel",
  "📦 Subscriptions",
  "🎁 Gifts",
  "🏦 Loan Repayment",
  "📚 Books",
  "🛠️ Home Maintenance",
  "🧾 Insurance",
  "💰 Savings",
  "💸 Other Expense"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/expenses", expense);
    onAdd(res.data);
    setExpense({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          required
          value={expense.title}
          onChange={(e) => setExpense({ ...expense, title: e.target.value })}
          placeholder="Title"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Amount:</Form.Label>
        <Form.Control
          type="number"
          required
          value={expense.amount}
          onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
          placeholder="Enter the amount"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date:</Form.Label>
        <Form.Control
          type="date"
          required
          value={expense.date}
          onChange={(e) => setExpense({ ...expense, date: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category:</Form.Label>
        <Form.Control
          list="category-options"
          value={expense.category}
          onChange={(e) => setExpense({ ...expense, category: e.target.value })}
          placeholder="Select or type a category"
          required
        />
        <datalist id="category-options">
          {predefinedCategories.map((cat, index) => (
            <option key={index} value={cat} />
          ))}
        </datalist>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Add any extra note:</Form.Label>
        <Form.Control
          type="text"
          value={expense.description}
          onChange={(e) =>
            setExpense({ ...expense, description: e.target.value })
          }
          placeholder="Description"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Expense
      </Button>
    </Form>
  );
};

export default ExpenseForm;
