import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//needs to be tested
function RecordsTable() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:5000/Records');

        if (!response.ok) {
          throw new Error(`Error fetching records: ${response.status}`);
        }

        const data = await response.json();
        setRecords(data);
      } catch (error) {
        console.error('Error fetching records:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading records...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='container'>
      <h1>Records</h1>
      <table className='container table table-striped table-hover'>
        <thead>
          <tr>

            <th>Health Card Number</th>
            <th>Record Details</th>
            <th>Prescriptions</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.health_card}>

              <td>{record.health_card}</td>
              <td>{record.allergies}</td>
              <td>{record.prescriptions}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecordsTable;