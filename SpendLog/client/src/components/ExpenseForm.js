import React, { useState } from "react";
import API from "../services/api";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";

const ExpenseForm = ({ onAdd }) => {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/expenses", expense);
    onAdd(res.data);
    setExpense({ title: "", amount: "", category: "" });
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     placeholder="Title"
    //     required
    //     value={expense.title}
    //     onChange={(e) => setExpense({ ...expense, title: e.target.value })}
    //   />
    //   <input
    //     type="number"
    //     placeholder="Amount"
    // required
    // value={expense.amount}
    // onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
    //   />
    //   <input
    //     placeholder="Category"
    //     required
    //     value={expense.category}
    //     onChange={(e) => setExpense({ ...expense, category: e.target.value })}
    //   />
    //   <Button variant="secondary" type="submit">
    //     Add Expense
    //   </Button>
    // </form>
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            required
            value={expense.title}
            onChange={(e) => setExpense({ ...expense, title: e.target.value })}
            placeholder="Title"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Amount:</Form.Label>
          <Form.Control
            type="number"
            required
            value={expense.amount}
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
            placeholder="Enter the amount of your expense"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Category:</Form.Label>
          <Form.Control
            type="text"
            required
            value={expense.category}
            onChange={(e) => setExpense({ ...expense, category: e.target.value })}
            placeholder="Enter the Category"
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Add Expense
        </Button>
      </Form>
    </>
  );
};

export default ExpenseForm;
