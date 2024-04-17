const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();

const supabaseUrl = process.env.URL_SUPA_PROJECT;
const supabaseKey = process.env.API_KRY_PROJECT;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;