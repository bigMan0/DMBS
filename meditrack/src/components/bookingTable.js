//needs to be tested
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function BookingsTable() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:5000/Bookings');

        if (!response.ok) {
          throw new Error(`Error fetching bookings: ${response.status}`);
        }

        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading bookings...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='container'>
      <h1>Bookings</h1>
      <table className='container table table-striped table-hover'>
        <thead>
          <tr>
            <th>Appointment Number</th>
            <th>Health Card Number</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.appointment_number}>
              <td>{booking.appointment_number}</td>
              <td>{booking.health_card}</td>
              <td>{booking.appointment_date}</td>
              <td>{booking.appointment_time}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingsTable;