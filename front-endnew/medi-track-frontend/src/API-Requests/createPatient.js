import { useState } from 'react';

const Patientform = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [healthCard, setHealthCard] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');

  const submitForm = async () => {
    try {
        const response = await fetch('http://localhost:5000/Patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_Name,
                last_Name,
                address,
                health_Card,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    submitForm();
    console.log({ firstName, lastName, address, healthCard, phone, dob, gender });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <label htmlFor="firstName" className="mb-2">First Name:</label>
      <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mb-4 px-3 py-2 border border-gray-300 rounded-md" />

      <label htmlFor="lastName" className="mb-2">Last Name:</label>
      <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="mb-4 px-3 py-2 border border-gray-300 rounded-md" />

      <label htmlFor="address" className="mb-2">Address:</label>
      <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="mb-4 px-3 py-2 border border-gray-300 rounded-md" />

      <label htmlFor="healthCard" className="mb-2">Health Card:</label>
      <input type="text" id="healthCard" value={healthCard} onChange={(e) => setHealthCard(e.target.value)} className="mb-4 px-3 py-2 border border-gray-300 rounded-md" />

      <label htmlFor="phone" className="mb-2">Phone:</label>
      <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mb-4 px-3 py-2 border border-gray-300 rounded-md" />

      <label htmlFor="dob" className="mb-2">Date of Birth:</label>
      <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} className="mb-4 px-3 py-2 border border-gray-300 rounded-md" />

      <label htmlFor="gender" className="mb-2">Gender:</label>
      <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="mb-4 px-3 py-2 border border-gray-300 rounded-md">
        <option value="">Select...</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Submit</button>
    </form>
  );
};

export default Patientform;


