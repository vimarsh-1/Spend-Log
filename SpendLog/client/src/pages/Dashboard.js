import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import "./Dashboard.css";
import Button from "react-bootstrap/Button";
import IncomeForm from "../components/IncomeForm";
import IncomeList from "../components/IncomeList";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import BalancePieChart from "../components/PieChart";

const Dashboard = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showIncomeList, setShowIncomeList] = useState(false);
  const [showExpenseList, setShowExpenseList] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [finalBalance, setFinalBalance] = useState(0);

  const fetchUser = async () => {
    try {
      const res = await API.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserName(res.data.name);
    } catch (err) {
      console.error("Failed to fetch user", err);
    }
  };

  const fetchExpenses = async () => {
    const res = await API.get("/expenses");
    setExpenses(res.data);

    const total = res.data.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalExpense(total);
  };

  const fetchIncomes = async () => {
    const res = await API.get("/incomes");
    setIncomes(res.data);

    const sum = res.data.reduce((acc, income) => acc + income.amount, 0);
    setTotalIncome(sum);

    setFinalBalance(sum - totalExpense);
  };
  const addIncome = (income) => {
    const updatedIncomes = [...incomes, income];
    setIncomes(updatedIncomes);

    const newTotalIncome = updatedIncomes.reduce(
      (acc, inc) => acc + inc.amount,
      0
    );
    setTotalIncome(newTotalIncome);
    setFinalBalance(newTotalIncome - totalExpense); // update balance
  };

  const addExpense = (expense) => {
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);

    const newTotalExpense = updatedExpenses.reduce(
      (acc, exp) => acc + exp.amount,
      0
    );
    setTotalExpense(newTotalExpense);
    setFinalBalance(totalIncome - newTotalExpense); // update balance
  };

  const deleteIncome = async (id) => {
    await API.delete(`/incomes/${id}`);
    const updatedIncomes = incomes.filter((inc) => inc._id !== id);
    setIncomes(updatedIncomes);

    const newTotalIncome = updatedIncomes.reduce(
      (acc, inc) => acc + inc.amount,
      0
    );
    setTotalIncome(newTotalIncome);
    setFinalBalance(newTotalIncome - totalExpense); // recalculate balance
  };

  const deleteExpense = async (id) => {
    await API.delete(`/expenses/${id}`);
    const updatedExpenses = expenses.filter((exp) => exp._id !== id);
    setExpenses(updatedExpenses);

    const newTotalExpense = updatedExpenses.reduce(
      (acc, exp) => acc + exp.amount,
      0
    );
    setTotalExpense(newTotalExpense);
    setFinalBalance(totalIncome - newTotalExpense); // recalculate balance
  };

  useEffect(() => {
    setFinalBalance(totalIncome - totalExpense);
  }, [totalIncome, totalExpense]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchUser();
      fetchExpenses();
      fetchIncomes();
    }
  }, [token]);

  return (
    <div>
      <div className="Navbar">
        {/* <h2>Dashboard</h2> */}
        <h4 className="welcomemsg">Welcome, {userName} 👋</h4>
        <Link to="/">
          <Button
            variant="dark"
            className="registerbtn"
            style={{
              width: "auto",
              position: "relative",
              right: "20px",
              margin: "5px",
              top:'-2px'
            }}
          >
            Logout
          </Button>
        </Link>
      </div>
      <div className="Tabparentdiv">
        <div
          className="IncomeBtnTab"
          style={{
            background: "linear-gradient(#7fffd4,#f5f5f5)",
            color: "black",
            cursor: "default",
          }}
        >
          <span> Balance💰: </span>
          <span style={{ color: "brown" }}>${finalBalance}</span>
        </div>
        <div className="IncomeBtnTab" onClick={() => setShowIncomeForm(true)}>
          <span style={{ color: "green" }}>Incomes📈:</span>
          <span style={{ color: "whitesmoke" }}>${totalIncome}</span>
        </div>
        <div
          className="IncomeBtnTab"
          style={{ background: "linear-gradient(#3d0c02,#b92e34)" }}
          onClick={() => setShowExpenseForm(true)}
        >
          <span style={{ color: "red" }}>Expenses📉:</span>
          <span style={{ color: "whitesmoke" }}>${totalExpense}</span>
        </div>
      </div>
      <div className="Tabparentdiv">
        <div
          className="IncomeBtnTab"
          style={{
            width: "20%",
            height: "10%",
            textDecoration: "underline",
            padding: "10px",
          }}
          onClick={() => setShowIncomeList(true)}
        >
          List of Incomes📈
        </div>
        <div
          className="IncomeBtnTab"
          style={{
            background: "linear-gradient(#3d0c02,#b92e34)",
            width: "20%",
            height: "10%",
            textDecoration: "underline",
            padding: "10px",
            color:'whitesmoke'
          }}
          onClick={() => setShowExpenseList(true)}
        >
          List of Expenses📉
        </div>
      </div>
      {/* <ExpenseForm onAdd={addExpense} />
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
      <IncomeForm onAdd={addIncome}/>
      <IncomeList incomes={incomes} onDelete={deleteExpense} /> */}

      {/* Expense-Modal */}
      <Modal
        show={showExpenseForm}
        style={{ fontFamily: "Inter" }}
        onHide={() => setShowExpenseForm(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Expense:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ExpenseForm
            onAdd={(expense) => {
              addExpense(expense);
              setShowExpenseForm(false); // close modal on submit
            }}
          />
        </Modal.Body>
      </Modal>
      {/* Income-Modal */}
      <Modal
        show={showIncomeForm}
        style={{ fontFamily: "Inter" }}
        onHide={() => setShowIncomeForm(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Income:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <IncomeForm
            onAdd={(income) => {
              addIncome(income);
              setShowIncomeForm(false); // close modal on submit
            }}
          />
        </Modal.Body>
      </Modal>
      {/* Income-List-Modal */}
      <Modal
        show={showIncomeList}
        style={{ fontFamily: "Inter" }}
        onHide={() => setShowIncomeList(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>List of your Incomes:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <IncomeList incomes={incomes} onDelete={deleteIncome} />
        </Modal.Body>
      </Modal>
      {/* Expense-List-modal */}
      <Modal
        show={showExpenseList}
        style={{ fontFamily: "Inter" }}
        onHide={() => setShowExpenseList(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>List of your Expenses:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ExpenseList expenses={expenses} onDelete={deleteExpense} />
        </Modal.Body>
      </Modal>
      <div
        style={{ marginTop: "80px", display: "flex",flexDirection:'column', justifyContent: "center" }}
      >
        <h1 style={{alignItems:'center', display:'flex', justifyContent:'center', fontFamily:"Inter", textDecoration:'dotted underline'}}>Analysis of your spend:</h1>
        <BalancePieChart income={totalIncome} expense={totalExpense} />
      </div>
    </div>
  );
};

export default Dashboard;
