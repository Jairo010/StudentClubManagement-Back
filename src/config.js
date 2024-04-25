require('dotenv').config();



module.exports ={
    app:{
        port: process.env.PORT || 4000,
    },
    supabase: {
        url: process.env.SUPABASEURL,
        urlKey: process.env.SUPABASEKEY,
        urlPublicKey: process.env.SUPABASEKEYPUBLIC
    },
}