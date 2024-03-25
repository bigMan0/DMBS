import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProcedureTable() {
  const [procedures, setProcedures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:5000/Procedures');

        if (!response.ok) {
          throw new Error(`Error fetching procedures: ${response.status}`);
        }

        const data = await response.json();
        setProcedures(data);
      } catch (error) {
        console.error('Error fetching procedures:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading procedures...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='container'>
      <h1>Procedures</h1>
      <table className='container table table-striped table-hover'>
        <thead>
          <tr>
            <th>Procedure Date</th>
            <th>Procedure Description</th>
            <th>Health Card Number</th>
            <th>Doctor ID</th>
          </tr>
        </thead>
        <tbody>
          {procedures.map((procedure) => (
            <tr key={procedure.health_card}>
              <td>{procedure.procedure_date}</td>
              <td>{procedure.procedure_info}</td>
              <td>{procedure.health_card}</td>
              <td>{procedure.staff_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProcedureTable;