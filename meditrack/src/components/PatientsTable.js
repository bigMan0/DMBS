import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function PatientsTable() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:5000/Patients');

        if (!response.ok) {
          throw new Error(`Error fetching patients: ${response.status}`);
        }

        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading patients...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='container'>
      <h1>Patients</h1>
      <table className='container table table-striped table-hover'>
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
          {patients.map((patient) => (
            <tr key={patient.health_card}>
              <td>{patient.first_name}</td>
              <td>{patient.last_name}</td>
              <td>{patient.health_card}</td>
              <td>{patient.address}</td>
              <td>{patient.phone}</td>
              <td>{patient.dob}</td>
              <td>{patient.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientsTable;