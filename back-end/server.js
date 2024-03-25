const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
//Supabase client
/**
 * Supabase client instance.
 * @type {import('@supabase/supabase-js').SupabaseClient}
 */
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

//Body parser middleware
app.use(bodyParser.json());

// ... (define routes and middleware here)
app.use(cors());
//GETS
const {getAllPatients} = require('./routes/get-all-patients');
const {getAllDepartments} = require('./routes/get-all-departments');
const {getAllRecords} = require('./routes/get-all-records');
const {getAllProcedeurs} = require('./routes/get-all-procedeurs');
const {getAllBookings} = require('./routes/get-all-bookings');

const {getPatientRecords} = require('./routes/get-record-HealthCardID')
const {getPatientById} = require('./routes/get-patient-by-id');
const {getBookingbyId} = require('./routes/get-booking-by-id');
const {getDepartmentbyid} = require('./routes/get-department-by-id');
const {getProcedureById} = require('./routes/get-procedure-by-id');

//POSTS
const {addpatient} = require('./routes/add-patient');
const {adddepartment} = require('./routes/add-departments');
const {addrecord} = require('./routes/add-record');
const {addprocedeur} = require('./routes/add-procedeur');
const {addbooking} = require('./routes/add-booking');

//PUT
const {updatePatient} = require('./routes/update-patient')
const {updateDepartment} = require('./routes/update-department')
const {updateRecord} = require('./routes/update-record')
const {updateProcedeur} = require('./routes/update-procedeur')
const {updateBooking} = require('./routes/update-booking')

//DELETE
const {removePatient} = require('./routes/remove-patient');
const {removeDepartment} = require('./routes/remove-department');
const {removeRecord} = require('./routes/remove-record');
const {removeProcedeur} = require('./routes/remove-procedeur');
const {removeBooking} = require('./routes/remove-booking');

//getting all rows of the table.
app.get('/Patients', (req, res) => getAllPatients(req, res, supabase));
app.get('/Department', (req, res) => getAllDepartments(req, res, supabase));
app.get('/Records', (req, res) => getAllRecords(req, res, supabase));
app.get('/Procedures', (req, res) => getAllProcedeurs(req, res, supabase));
app.get('/Bookings', (req, res) => getAllBookings(req, res, supabase));

// getting rows by id.
app.get('/Records/:health_card', (req, res) => getPatientRecords(req, res, supabase));
app.get('/Patients/:health_card', (req, res) => getPatientById(req, res, supabase));
app.get('/Bookings/:health_card', (req, res) => getBookingbyId(req, res, supabase));
app.get('/Department/:staff_number', (req, res) => getDepartmentbyid(req, res, supabase));
app.get('/Procedures/:health_card', (req, res) => getProcedureById(req, res, supabase));

//adding new rows to the table
app.post('/Patients', (req, res) => addpatient(req, res, supabase));
app.post('/Department', (req, res) => adddepartment(req, res, supabase));
app.post('/Records', (req, res) => addrecord(req, res, supabase));
app.post('/Procedures', (req, res) => addprocedeur(req, res, supabase));
app.post('/Bookings', (req, res) => addbooking(req, res, supabase));

//updating rows in the table
app.put('/Patients/:health_card', (req, res) => updatePatient(req, res, supabase));
app.put('/Department/:staff_number', (req, res) => updateDepartment(req, res, supabase));
app.put('/Records/:health_card', (req, res) => updateRecord(req, res, supabase));
app.put('/Procedures/:procedure_number', (req, res) => updateProcedeur(req, res, supabase));
app.put('/Bookings/:appointment_number', (req, res) => updateBooking(req, res, supabase));

//removing rows from the table
app.delete('/Patients/:health_card', (req, res) => removePatient(req, res, supabase));
app.delete('/Department/:staff_number', (req, res) => removeDepartment(req, res, supabase));
app.delete('/Records/:health_card', (req, res) => removeRecord(req, res, supabase));
app.delete('/Procedures/:procedure_number', (req, res) => removeProcedeur(req, res, supabase));
app.delete('/Bookings/:appointment_number', (req, res) => removeBooking(req, res, supabase));


app.listen(port, () => console.log(`Server Listening on port ${port}`))

