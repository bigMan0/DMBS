const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // Load environment variables

const app = express();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
const bodyParser = require('body-parser');

// ... (define routes and middleware here)

