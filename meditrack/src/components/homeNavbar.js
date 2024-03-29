import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

function HomeNavbar() {
    return (
      <div className="container">
          <Navbar bg="primary" variant="dark" className='rounded-3'>
              <Container>
              <Nav>
                <Navbar.Brand as={Link} to="/">MediTrack</Navbar.Brand>
              </Nav>
              <Nav>
                <Nav.Link as={Link} to="/patients-page">Login</Nav.Link>
                <Nav.Link as={Link} to="/admin-page">Admin</Nav.Link>
              </Nav>
              </Container>
          </Navbar>
      </div>
      
    );
  }
  export default HomeNavbar;