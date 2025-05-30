import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./Register.css";
import register from "../Assets/register.gif";
import ArrowCircle from "../Assets/ArrowCircle.svg";
import Login from "./Login";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLogin, setIsLogin] = useState(false);
  const isFormValid = form.name && form.email && form.password;

  const isValidPassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return regex.test(password);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidPassword(form.password)) {
      alert("Please set strong password to your account !🔑");
      return;
    }
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully. Now login.");
      // navigate("/login");
      setIsLogin(true);
    } catch (err) {
      alert(err.response.data.message || "Register failed");
    }
  };

  return (
    <div className="RegisterParent">
      <div className="registeruserform">
        {!isLogin ? (
          <form onSubmit={handleSubmit} className="registermainform">
            <h5 className="letsonboard">
              Let's on-board yourself by full-filling few details 🚀
            </h5>
            <label htmlFor="" className="registerformlbls">
              {" "}
              Enter Your Name 👇🏻:
            </label>
            <input
              placeholder="Name"
              className="registerinputfields"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <label htmlFor="" className="registerformlbls">
              {" "}
              Enter Your Email-Id 👇🏻:
            </label>
            <input
              placeholder="Email"
              className="registerinputfields"
              type="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <label htmlFor="" className="registerformlbls">
              {" "}
              Give Password To Your Account👇🏻:
            </label>
            <input
              type="password"
              placeholder="Password"
              className="registerinputfields"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />{" "}
            <br />
            <button
              type="submit"
              className={`registerbtn ${!isFormValid ? "disabled-btn" : ""}`}
              disabled={!isFormValid}
            >
              Register
              <img src={ArrowCircle} className="arrow-icon" alt="" />
            </button>
            <Link to="/login">Have an acoount?</Link>
            {/* <button type="submit">Register</button> */}
          </form>
        ) : (
          <Login />
        )}
        <div className="gifdiv">
          <img src={register} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Register;
