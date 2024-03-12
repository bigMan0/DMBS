const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

//Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

//Body parser middleware
app.use(bodyParser.json());

// ... (define routes and middleware here)
const {getAllPatients} = require('./routes/get-all-patients');
const { getAllDepartments } = require('./routes/get-all-departments');
const {getAllRecords} = require('./routes/get-all-records');
const {getAllProcedeurs} = require('./routes/get-all-procedeurs');


app.get('/Patients', getAllPatients);
app.get('/Departments', getAllDepartments);
app.get('/Records',getAllRecords);
app.get('/Proceduers',getAllProcedeurs);

app.listen(port, () => console.log('Server Listening on port ${port}'))
