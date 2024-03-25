import React from 'react';
import PatientsTable from '../components/PatientsTable';
import RecordsTable from '../components/recordsTable';
import BookingsTable from '../components/bookingTable';
import DepartmentTable from '../components/departmentTable';
import ProcedureTable from '../components/procedureTable';
import HomeNavbar from '../components/homeNavbar';
import { Tab, Tabs } from 'react-bootstrap';

function AdminPage() {
  return (
    <>
    <HomeNavbar/>
    <div className='container'>
      <h1 className='container mb-4 mt-4'>Welcome-Back admin</h1>
      <Tabs defaultActiveKey="patients" id="uncontrolled-tab-example">
        <Tab eventKey="patients" title="Patients">
          <PatientsTable />
        </Tab>
        <Tab eventKey="records" title="Records">
          <RecordsTable />
        </Tab>
        <Tab eventKey="bookings" title="Bookings">
          <BookingsTable />
        </Tab>
        <Tab eventKey="departments" title="Departments">
          <DepartmentTable />
        </Tab>
        <Tab eventKey="procedures" title="Procedures">
          <ProcedureTable />
        </Tab>
      </Tabs>
    </div>
    </>
  );
}

export default AdminPage;