const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // Load environment variables

const app = express();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// ... (define routes and middleware here)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
