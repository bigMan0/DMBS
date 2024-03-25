import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchPatient() {
  const [healthCardId, setHealthCardId] = useState('');
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [procedures, setProcedures] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
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

  //add a clear option to clear the search results
  const clearSearch = () => {
    setHealthCardId('');
    setPatient(null);
    setRecords(null);
    setBookings(null);
    setProcedures(null);
    setSearchPerformed(false);
    setError(null);
  };
  return (
    <div className='container shadow-lg rounded mt-3 mb-3'>
      <h1>Search Patients</h1>
      <input
      type="text"
      value={healthCardId}
      onChange={e => setHealthCardId(e.target.value)}
      placeholder="Enter Health Card ID"
      className="form-control mb-3"
      />
      <button onClick={fetchPatientAndRecords} className="btn btn-primary">
        Search
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

    {records && records.health_card ? (
      <div className="card container mt-5 mb-5">
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
              <tr key={records.health_card}>
                <td>{records.health_card}</td>
                <td>{records.allergies}</td>
                <td>{records.prescriptions}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ) : searchPerformed ?(
      <p className="mt-3">No records found</p>
    ) : null}

    {bookings && bookings.health_card ? (
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
              <tr key={bookings.health_card}>
                <td>{bookings.appointment_number}</td>
                <td>{bookings.appointment_date}</td>
                <td>{bookings.appointment_time}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ) : searchPerformed ?(
      <p className="mt-3">No bookings found.</p>
    ) : null}

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
  );
}

export default SearchPatient;