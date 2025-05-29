import React from "react";
import Button from "react-bootstrap/esm/Button";

const IncomeList = ({ incomes, onDelete }) => {
  return (
    <ul>
      {incomes.map((inc, index) => (
        <li
          key={inc._id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <b style={{position:'relative',left:'-10px'}}>
            {index + 1}. &nbsp;{inc.title} - ${inc.amount} / {inc.category}
          </b>
          <div>
            <Button variant="danger" onClick={() => onDelete(inc._id)} style={{position:'relative', top:'-6px'}}>
              Delete
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default IncomeList;
