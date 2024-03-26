import { useState } from 'react';

const DeletePatientForm = () => {
  const [health_card, setHealthCard] = useState('');

  const deletePatient = async () => {
    try {
      const response = await fetch(`http://localhost:5000/Patients/${health_card}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Patient deleted successfully');
        alert('Patient deleted successfully');
      } else {
        console.log('Failed to delete patient');
        alert('Failed to delete patient');
      }
    } catch (error) {
      console.error('An error occurred while deleting patient:', error);
      alert('An error occurred while deleting patient');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!health_card) {
      alert('Please enter a health card ID.');
      return;
    }

    deletePatient();
  };

  return (
    <div className='container shadow lg'>
      <h1>Delete a Patient</h1>
      <br></br>
      <form onSubmit={handleSubmit} className="container-fluid">
        <div className="mb-3">
          <label htmlFor="healthCard" className="form-label">Health Card:</label>
          <input type="text" id="healthCard" value={health_card} onChange={(e) => setHealthCard(e.target.value)} className="form-control" />
        </div>

        <button type="submit" className="btn btn-danger">Delete</button>
      </form>
    </div>
  );
};

export default DeletePatientForm;