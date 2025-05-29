import React, { useState } from "react";
import API from "../services/api";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";

const IncomeForm = ({ onAdd }) => {
  const [income, setIncome] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const incomeCategories = [
    "💼 Salary",
    "🧾 Freelance",
    "🏦 Bank Interest",
    "📈 Investments",
    "🎁 Gifts",
    "👨‍🏫 Teaching",
    "📊 Dividends",
    "💸 Refunds",
    "🏠 Rent Income",
    "🧳 Travel Reimbursements",
    "👨‍⚕️ Consulting",
    "🪙 Crypto Earnings",
    "🔄 Side Hustle",
    "🧧 Bonus",
    "🛒 Sales Revenue",
    "🪜 Royalties",
    "💰 Other Income",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/incomes", income);
    onAdd(res.data);
    setIncome({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            required
            value={income.title}
            onChange={(e) => setIncome({ ...income, title: e.target.value })}
            placeholder="Title"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Amount:</Form.Label>
          <Form.Control
            type="number"
            required
            value={income.amount}
            onChange={(e) => setIncome({ ...income, amount: e.target.value })}
            placeholder="Enter the amount of your expense"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>date:</Form.Label>
          <Form.Control
            type="date"
            required
            value={income.date}
            onChange={(e) => setIncome({ ...income, date: e.target.value })}
            placeholder="Date"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Income Category:</Form.Label>
          <Form.Control
            list="income-options"
            value={income.category}
            onChange={(e) => setIncome({ ...income, category: e.target.value })}
            placeholder="Select or type a category"
            required
          />
          <datalist id="income-options">
            {incomeCategories.map((cat, index) => (
              <option key={index} value={cat} />
            ))}
          </datalist>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Add any extra note:</Form.Label>
          <Form.Control
            type="text"
            value={income.description}
            onChange={(e) =>
              setIncome({ ...income, description: e.target.value })
            }
            placeholder="description"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Income
        </Button>
      </Form>
    </>
  );
};

export default IncomeForm;
