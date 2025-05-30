import React, { useEffect } from "react";
import Savings from "../../Assets/Savings.jpeg";
import NavScrollExample from "../Navbar/NavigationBar";
import "./LandingPage.css";
import ArrowCircle from "../../Assets/ArrowCircle.svg";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const LandingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  });
  return (
    <div style={{ overflow: "hidden" }}>
      <NavScrollExample />
      <div className="centercontent">
        <div className="headline">
          <h1 className="firstline" data-aos="fade-down" data-aos-delay={500}>
            Track. Analyze. Save.
          </h1>
          <h5 className="secondline" data-aos="fade-down" data-aos-delay={800}>
            Smarter budgeting starts here.
          </h5>
          <p className="deepdesc" data-aos="fade-down" data-aos-delay={1100}>
            Let's keep track of your all transaction which leads you to a
            powerfull finance and can help you to budgeting your month and money{" "}
            , "Stay on top of your finances with ease. Our expense tracker helps
            you monitor spending, manage budgets, and make smarter money
            decisions — all in one place."
          </p>
          <Link to="/register">
            <button
              className="registerbtn"
              data-aos="zoom-in-up"
              data-aos-delay={1400}
            >
              Let's start with register
              <img src={ArrowCircle} className="arrow-icon" alt="" />
            </button>
          </Link>
        </div>
        <img
          src={Savings}
          className="landingpageimg"
          data-aos="zoom-in-up"
          data-aos-delay={1400}
          alt=""
        />
      </div>
    </div>
  );
};

export default LandingPage;
