// src/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Container, Button } from "react-bootstrap";

function Navbar() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <BootstrapNavbar bg="light" expand="lg">
      <Container>
        <BootstrapNavbar.Brand href="/">React App</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {loggedInUser ? (
              <>
                {/* Private links */}
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/todo">
                  Todo List
                </Nav.Link>
                <Nav.Link as={Link} to="/api">
                  API Posts
                </Nav.Link>
              </>
            ) : (
              <>
                {/* Public links */}
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
          {loggedInUser && (
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
