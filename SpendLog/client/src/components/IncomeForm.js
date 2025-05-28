import React, { useState } from "react";
import API from "../services/api";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";

const IncomeForm = ({ onAdd }) => {
  const [income, setIncome] = useState({ title: "", amount: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/incomes", income);
    onAdd(res.data);
    setIncome({ title: "", amount: "" });
  };
  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     placeholder="Title"
    //     required
    //     value={income.title}
    //     onChange={(e) => setIncome({ ...income, title: e.target.value })}
    //   />
    //   <input
    //     type="number"
    //     placeholder="Amount"
    //     required
    //     value={income.amount}
    //     onChange={(e) => setIncome({ ...income, amount: e.target.value })}
    //   />
    //   <Button variant="secondary" type="submit">
    //     Add Income
    //   </Button>
    // </form>
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

        <Button variant="primary" type="submit">
          Add Income
        </Button>
      </Form>
    </>
  );
};

export default IncomeForm;
