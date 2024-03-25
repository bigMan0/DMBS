import { useState } from 'react';

const Patientform = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [health_card, setHealthCard] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');

  const checkPatientExists = async () => {
    try {
      const response = await fetch(`http://localhost:5000/Patients/${health_card}`);
      return response.ok;
    } catch (error) {
      console.error('An error occurred while checking patient:', error);
      return false;
    }
  };
  const submitForm = async () => {
    try {
        const response = await fetch('http://localhost:5000/Patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name,
                last_name,
                address,
                health_card,
                phone,
                dob,
                gender,
            }),
        });

        if (response.ok) {
            console.log('Patient created successfully');
        } else {
            console.log('Failed to create patient');
        }
    } catch (error) {
        console.error('An error occurred while creating patient:', error);
    }
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!first_name || !last_name || !address || !health_card || !phone || !dob || !gender) {
      alert('Please fill all the fields.');
      return;
    }
    
    const patientExists = await checkPatientExists();
    if (patientExists) {
      alert('Patient with this health card already exists.');
      return;
    }
    

    submitForm();
    console.log({ first_name, last_name, address, health_card, phone, dob, gender });
  };

  return (
    <div className='container shadow lg'>
      <h1>Create a new Patient</h1>
      <br></br>
      <form onSubmit={handleSubmit} className="container-fluid">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name:</label>
          <input type="text" id="firstName" value={first_name} onChange={(e) => setFirstName(e.target.value)} className="form-control" />
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
          <label htmlFor="healthCard" className="form-label">Health Card:</label>
          <input type="text" id="healthCard" value={health_card} onChange={(e) => setHealthCard(e.target.value)} className="form-control" />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone:</label>
          <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" />
        </div>

        <div className="mb-3">
          <label htmlFor="dob" className="form-label">Date of Birth:</label>
          <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} className="form-control" />
        </div>

        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender:</label>
          <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="form-control">
            <option value="">Select...</option>
            <option value="male">M</option>
            <option value="female">F</option>
            <option value="other">O</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
  );
};

export default Patientform;

