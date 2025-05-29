import React from "react";
import Button from "react-bootstrap/esm/Button";

const ExpenseList = ({ expenses, onDelete }) => {
  return (
    <ul>
      {expenses.map((exp, index) => (
        <li
          key={exp._id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <b style={{ position: "relative", left: "-10px" }}>
            {index + 1}. &nbsp; {exp.title} - ${exp.amount} / {exp.category}
          </b>
          <div>
          <Button variant="danger" onClick={() => onDelete(exp._id)}>
            Delete
          </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
