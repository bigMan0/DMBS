import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

function NavbarComp() {
    return (
      <div className="container">
          <Navbar bg="primary" variant="dark" className='rounded-3'>
              <Container>
              <Navbar.Brand>MediTrack</Navbar.Brand>
              <Nav className="me-auto">
                  <Nav.Link as={Link} to="/create-patient">Add Patient</Nav.Link>
                  <Nav.Link as={Link} to="/patients">Patients</Nav.Link>
                  <Nav.Link as={Link} to="/search-patients">Search Patients</Nav.Link>
                  <Nav.Link as={Link} to="/add-booking">Add Booking</Nav.Link>
              </Nav>
              </Container>
          </Navbar>
      </div>
      
    );
  }
  export default NavbarComp;