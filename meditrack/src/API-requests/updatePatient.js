import { useState } from 'react';

const UpdatePatientForm = () => {
  const [health_card, setHealthCard] = useState('');
  const [last_name, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');

  const updatePatient = async () => {
    try {
      const response = await fetch(`http://localhost:5000/Patients/${health_card}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          last_name: last_name,
          address: address,
          phone: phone,
          dob: dob,
          gender: gender,
        }),
      });

      if (response.ok) {
        alert('Patient updated successfully');
      } else {
        alert('Failed to update patient');
      }
    } catch (error) {
      alert('An error occurred while updating patient');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!health_card || !last_name || !address || !phone || !dob || !gender) {
      alert('Please fill in all fields.');
      return;
    }

    updatePatient();
  };

  return (
    <div className='container shadow lg'>
      <h1>Update a Patient</h1>
      <br></br>
      <form onSubmit={handleSubmit} className="container-fluid">
      <div className="mb-3">
          <label htmlFor="healthCard" className="form-label">Health Card:</label>
          <input type="numeber" id="healthCard" value={health_card} onChange={(e) => setHealthCard(e.target.value)} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name:</label>
          <input type="text" id="lastName" value={last_name} onChange={(e) => setLastName(e.target.value)} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address:</label>
          <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone:</label>
          <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">Date of Birth:</label>
          <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender:</label>
          <input type="text" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="form-control" />
        </div>

        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdatePatientForm;