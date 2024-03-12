const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

//Supabase client
/**
 * Supabase client instance.
 * @type {import('@supabase/supabase-js').SupabaseClient}
 */
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

//Body parser middleware
app.use(bodyParser.json());

// ... (define routes and middleware here)
const {getAllPatients} = require('./routes/get-all-patients');
const { getAllDepartments } = require('./routes/get-all-departments');
const {getAllRecords} = require('./routes/get-all-records');
const {getAllProcedeurs} = require('./routes/get-all-procedeurs');


app.get('/Patients', (req, res) => getAllPatients(req, res, supabase));
app.get('/Department', (req, res) => getAllDepartments(req, res, supabase));
app.get('/Records', (req, res) => getAllRecords(req, res, supabase));
app.get('/Procedures', (req, res) => getAllProcedeurs(req, res, supabase));

app.listen(port, () => console.log(`Server Listening on port ${port}`))
