import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PatientDetail() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [records, setRecords] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      // Fetch patient details
      const patientResponse = await fetch(`http://localhost:5000/Patients/${id}`);
      const patientData = await patientResponse.json();
      setPatient(patientData);

      // Fetch appointments
      const bookingsResponse = await fetch(`http://localhost:5000/Bookings/${id}`);
      const bookingsData = await bookingsResponse.json();
      setAppointments(bookingsData);

      // Fetch past procedures
      const proceduresResponse = await fetch(`http://localhost:5000/Procedures/${id}`);
      const proceduresData = await proceduresResponse.json();
      setProcedures(proceduresData);

      // Fetch past records
      const recordsResponse = await fetch(`http://localhost:5000/Records/${id}`);
      const recordsData = await recordsResponse.json();
      setRecords(recordsData);
    };

    fetchPatientData();
  }, [id]);

  // Render patient details, appointments, procedures, and Records
  return (
    <div className='container'>
      {/* Display patient details, appointments, procedures, and Records */}
      <h1>Patient Details</h1>
        {patient && (
            <div>
            <h2>{patient.first_name} {patient.last_name}</h2>
            <p>Health Card Number: {patient.health_card}</p>
            <p>Address: {patient.address}</p>
            <p>Phone: {patient.phone}</p>
            <p>Date of Birth: {patient.dob}</p>
            </div>)}
    </div>
  );
}

export default PatientDetail;