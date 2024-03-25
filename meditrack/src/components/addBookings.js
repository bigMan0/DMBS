import React, { useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import PatientsNavbar from '../API-requests/patientsNavbar'; // Import PatientsNavbar

function AddBooking() {
  const [healthCardId, setHealthCardId] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentNumber, setAppointmentNumber] = useState(''); // [1
  const [appointmentDate, setAppointmentDate] = useState('');
  const [staffNumber, setStaffNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const booking = {
      health_card: healthCardId,
      appointment_number: appointmentNumber,
      appointment_time: appointmentTime,
      appointment_date: appointmentDate,
      staff_number: staffNumber,
    };

    try {
      const response = await fetch('http://localhost:5000/Bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      });

      if (!response.ok) {
        console.log(appointmentTime);
        throw new Error(`Error: ${response.status}`);
      }

      alert('Booking added successfully!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClear = () => {
    setHealthCardId('');
    setAppointmentTime('');
    setAppointmentNumber('');
    setAppointmentDate('');
    setStaffNumber('');
  };
  // ...
  
  return (
    <>
    <PatientsNavbar /> {/* Add PatientsNavbar component */}
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="mt-3">
            <Card.Body>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Health Card ID:</label>
                  <input type="text" className="form-control" value={healthCardId} onChange={e => setHealthCardId(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Appointment Time:</label>
                  <input type="time" step="1" className="form-control" value={appointmentTime} onChange={e => setAppointmentTime(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Appointment Date:</label>
                  <input type="date" className="form-control" value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Appointment Number:</label>
                  <input type="number" className="form-control" value={appointmentNumber} onChange={e => setAppointmentNumber(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Staff Number:</label>
                  <input type="text" className="form-control" value={staffNumber} onChange={e => setStaffNumber(e.target.value)} required />
                </div>
                <Button variant="primary" type="submit">Add Booking</Button>
                <Button variant="secondary" type="button" onClick={handleClear} className="ml-2">Clear</Button>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
    
  );
}

export default AddBooking;