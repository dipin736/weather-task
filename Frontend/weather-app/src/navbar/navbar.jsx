import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import BootstrapNavbar from 'react-bootstrap/Navbar'; 
import { useAuth } from '../Auth/AuthContext';


const CustomNavbar = () => {
  const { user, logout } = useAuth();
  
  return (
    <BootstrapNavbar bg="light" data-bs-theme="light" expand="lg">
      <Container>
        <BootstrapNavbar.Brand href="#home">Weather App</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav className="ml-auto">
            {user ?(
              <>
                <Nav.Link href="/dashboard">Welcome, {user && user.username}!</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            ): (
              <>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default CustomNavbar;
