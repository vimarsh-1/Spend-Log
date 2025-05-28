import React from 'react';
import Button from 'react-bootstrap/esm/Button'

const ExpenseList = ({ expenses, onDelete }) => {
  return (
    <ul>
      {expenses.map((exp) => (
        <li key={exp._id}>
          {exp.title} - ${exp.amount}
          <Button variant='danger' onClick={() => onDelete(exp._id)}>Delete</Button>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
