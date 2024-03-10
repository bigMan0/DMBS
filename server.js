const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // Load environment variables

const app = express();
const supabase = createClient(process.env.EXPRESS_SUPABASE_URL, process.env.EXPRESS_SUPABASE_ANON_KEY);

//(define routes and middleware here)
//(basically)


