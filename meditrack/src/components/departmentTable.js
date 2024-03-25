import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function DepartmentTable() {
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:5000/Department');

        if (!response.ok) {
          throw new Error(`Error fetching departments: ${response.status}`);
        }

        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading departments...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='container'>
      <h1>Departments</h1>
      <table className='container table table-striped table-hover'>
        <thead>
          <tr>
            <th>Staff Number</th>
            <th>Department Name</th>
            <th>Staff first name</th>
            <th>Staff last name</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.staff_number}>
              <td>{department.staff_number}</td>
              <td>{department.department}</td>
              <td>{department.staff_fname}</td>
              <td>{department.staff_lname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentTable;