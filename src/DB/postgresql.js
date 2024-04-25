const config = require('../config')
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(config.supabase.url, config.supabase.urlKey);
module.exports = {
    supabase
}