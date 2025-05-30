import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "./Navbar.css";

function NavScrollExample() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  });
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand
          href="#"
          className="Navbarparent"
          data-aos="fade-down"
          data-aos-delay={500}
        >
          <div>
          <img src={logo} className="Navbarimglogo" alt="" />
          <span>pend-Log</span>
          </div>
          <Navbar.Toggle aria-controls="navbarScroll" />
        </Navbar.Brand>
        <Navbar.Collapse id="navbarScroll">
          {/* <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px", position: "relative", left: "80px" }}
            navbarScroll
          ></Nav> */}
          <Link to="/login">
            <Button
              variant="outline-success"
              className="registerbtn"
              style={{ position: "relative", right: "150px", width: "100%" }}
              data-aos="fade-down"
              data-aos-delay={700}
            >
              Login
            </Button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
