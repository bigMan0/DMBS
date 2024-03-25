import React from 'react';
import Patientform from './API-requests/createPatient'; 
import PatientsTable from './components/PatientsTable';
import SearchPatients from './components/SearchPatients';
import AddBookings from './components/addBookings';
import HomePage from './pages/Homepage';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
//import NavbarComp from './components/Navbar';
import PatientsPage from './pages/patientsPage';
import AdminPage from './pages/adminPage';

function App() {
  return (
    <Router>
      <div className="App bg-gray">
        <header className="App-header">
        {/* <NavbarComp/> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-patient" element={<><Patientform/></>} />
          <Route path="/patients" element={<><PatientsTable/></>} />
          <Route path = "/patients-page" element={<><PatientsPage/></>} />
          <Route path="/search-patients" element={<><SearchPatients/></>} />
          <Route path="/add-booking" element={<><AddBookings/></>} />
          <Route path="/admin-page" element={<><AdminPage/></>} />
        </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;