import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function NavScrollExample() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  });
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#" style={{ position: "relative", left: "60px" }} data-aos="fade-down" data-aos-delay={500}>
          <img
            src={logo}
            style={{
              width: "5%",
              height: "2%",
              position: "relative",
              left: "10px",
            }}
            alt=""
          />
          pend-Log
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px", position: "relative", left: "80px" }}
            navbarScroll
          >
            {/* <Nav.Link href="#action1">Home</Nav.Link>
            <NavDropdown title="Other Services" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}
            {/* <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
          </Nav>
          <Link to="/login">
            <Button
              variant="outline-success"
              className="registerbtn"
              style={{ position: "relative", right: "150px", width: "100%" }}
              data-aos="fade-down" data-aos-delay={700}
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
