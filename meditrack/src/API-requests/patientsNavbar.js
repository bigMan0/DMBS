// PatientsNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';

function PatientsNavbar() {
    return (
      <div className="container">
          <Navbar bg="primary" variant="dark" className='rounded-3'>
              <Container>
              <Navbar.Brand as={Link} to="/">MediTrack</Navbar.Brand>
              </Container>
          </Navbar>
      </div>
    );
}

export default PatientsNavbar;