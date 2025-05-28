import React from 'react'
import Button from 'react-bootstrap/esm/Button'

const IncomeList = ({ incomes, onDelete }) => {
  return (
    <ul>
      {incomes.map((inc) => (
        <li key={inc._id}>
          {inc.title} - ${inc.amount}
          <Button variant='danger' onClick={() => onDelete(inc._id)}>Delete</Button>
        </li>
      ))}
    </ul>
  )
}

export default IncomeList