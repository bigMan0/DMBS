import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; // Import Link
import PatientsNavbar from '../API-requests/patientsNavbar'; // Import PatientsNavbar

function PatientsPage() {
  const [healthCardId, setHealthCardId] = useState('');
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [procedures, setProcedures] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [error, setError] = useState(null);

  const fetchPatientAndRecords = async () => {
    try {
      setSearchPerformed(true);
      const patientResponse = await fetch(`http://localhost:5000/Patients/${healthCardId}`);
      if (!patientResponse.ok) {
        throw new Error(`Error fetching patient: ${patientResponse.status}`);
      }
      const patientData = await patientResponse.json();
      console.log('Received patient data:', patientData);
      setPatient(patientData);

      const recordsResponse = await fetch(`http://localhost:5000/Records/${healthCardId}`);
      if (!recordsResponse.ok) {
        throw new Error(`Error fetching records: ${recordsResponse.status}`);
      }
      const recordsData = await recordsResponse.json();
      console.log('Received records data:', recordsData);
      setRecords(recordsData);

      const bookingsResponse = await fetch(`http://localhost:5000/Bookings/${healthCardId}`);
      if (!bookingsResponse.ok) {
        throw new Error(`Error fetching bookings: ${bookingsResponse.status}`);
      }
      const bookingsData = await bookingsResponse.json();
      console.log('Received bookings data:', bookingsData);
      setBookings(bookingsData);

      const proceduresResponse = await fetch(`http://localhost:5000/Procedures/${healthCardId}`);
      if (!proceduresResponse.ok) {
        throw new Error(`Error fetching procedures: ${proceduresResponse.status}`);
      }
      const proceduresData = await proceduresResponse.json();
      console.log('Received procedures data:', proceduresData);
      setProcedures(proceduresData);

    } catch (error) {
      console.error('Error fetching patient, records, bookings, or procedures:', error);
      if (!error.message.includes('404')) {
        setError(error.message);
      }
    }
  };
  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    
    const { appointment_number, appointment_date, appointment_time } = editFormData;
  
    const response = await fetch(`http://localhost:5000/Bookings/${editFormData.appointment_number}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ appointment_number, appointment_date, appointment_time }),
    });
  
    if (response.ok) {
      fetchPatientAndRecords();
      setIsEditFormVisible(false);
    } else if (response.status === 404) {
      alert('Appointment does not exist.');
    } else {
      console.error('Error updating booking:', response.status);
    }
  };
  //add a clear option to clear the search results
  const clearSearch = () => {
    setHealthCardId('');
    setPatient(null);
    setRecords(null);
    setBookings(null);
    setProcedures(null);
    setSearchPerformed(false);
    setError(null);
    setIsEditFormVisible(false);
    setEditFormData({});
  };
  console.log(bookings)
  return (
    <>
    <PatientsNavbar />
    <div style={{maxWidth: '50%', margin: 'auto'}}>
    <div className='container shadow-lg rounded mt-5 mb-5'>
      <h1>Enter your health Number: </h1>
      <input
      type="text"
      value={healthCardId}
      onChange={e => setHealthCardId(e.target.value)}
      placeholder="Enter Health Card ID"
      className="form-control mb-3"
      />
      <button onClick={fetchPatientAndRecords} className="btn btn-primary">
        Enter
      </button>
      <button onClick={clearSearch} className='btn btn-secondary ml-2'>Clear</button>
      
      {patient && patient.health_card ? (
      <div className="card container mt-5 mb-5">
        <div className="card-header">
          <h2>Patient Details</h2>
        </div>
        <div className="card-body">
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Health Card Number</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Date of Birth</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              <tr key={patient.health_card}>
                <td>{patient.first_name}</td>
                <td>{patient.last_name}</td>
                <td>{patient.health_card}</td>
                <td>{patient.address}</td>
                <td>{patient.phone}</td>
                <td>{patient.dob}</td>
                <td>{patient.gender}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ) : searchPerformed ? (
      <p className="mt-3">No patient details found.</p>
    ) : null}

    {records   ? (
      <div className="card container mt-5 mb-5" key={records.length}>
        <div className="card-header">
          <h2>Records</h2>
        </div>
        <div className="card-body">
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Health Card Number</th>
                <th>Allergies</th>
                <th>Medications</th>
              </tr>
            </thead>
            <tbody>
                {records.map(record => (
                <tr key={record.health_card}>
                  <td>{record.health_card}</td>
                  <td>{record.allergies}</td>
                  <td>{record.prescriptions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : searchPerformed ?(
      <p className="mt-3">No records found</p>
    ) : null}
{/* <Link to="/add-booking" className="btn btn-success ml-2">Add Booking</Link> */}
    
    {bookings && bookings.length > 0 ? (
      <div className="card container mt-5 mb-5">
        <div className="card-header">
          <h2>Bookings</h2>
        </div>
        <div className="card-body">
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.health_card}>
                  <td>{booking.appointment_number}</td>
                  <td>{booking.appointment_date}</td>
                  <td>{booking.appointment_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => { setIsEditFormVisible(true); setEditFormData(bookings); }} className="btn btn-primary ml-2">Edit Appointment</button>
      </div>
    ) : searchPerformed ?(
      <p className="mt-3">No bookings found.</p>
    ) : null}
       {searchPerformed && <Link to="/add-booking" className="btn btn-success ml-2">Book Appointment</Link>}
    {/* // Add an edit form that is shown when the edit button is clicked */}
    {isEditFormVisible && (
      
      <form onSubmit={handleEditFormSubmit}>
        <label>
          Appointment Number:
          <input type="text" value={editFormData.appointment_number} onChange={e => setEditFormData({ ...editFormData, appointment_number: e.target.value })} />
        </label>
        <label>
          New Appointment Date:
          <input type="date" value={editFormData.appointment_date} onChange={e => setEditFormData({ ...editFormData, appointment_date: e.target.value })} />
        </label>
        <label>
          New Appointment Time:
          <input type="time" value={editFormData.appointment_time} onChange={e => setEditFormData({ ...editFormData, appointment_time: e.target.value })} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )}

    {procedures && procedures.health_card ? (
      <div className="card container mt-5 mb-5">
        <div className="card-header">
          <h2>Procedures</h2>
        </div>
        <div className="card-body">
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Procedure ID</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr key={procedures.health_card}>
                <td>{procedures.procedure_number}</td>
                <td>{procedures.procedure_info}</td>
                <td>{procedures.procedure_date}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ) : searchPerformed ?(
      <p className="mt-3">No procedures found.</p>
    ) : null}
    {error && <p className="mt-3">Error: {error}</p>}
    </div>
    </div>
    </>
  );
}

export default PatientsPage;