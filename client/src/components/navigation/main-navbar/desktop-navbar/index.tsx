import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

interface MainDesktopNavbarProps {}

const MainDesktopNavbar: React.FC<MainDesktopNavbarProps> = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <div className="container">
        <Navbar.Brand href="/">Restaurant Reviewer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link to="/auth">Get Started</Link>

            {/* <NavDropdown title="Get Started" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default MainDesktopNavbar;
