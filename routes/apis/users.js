const express = require("express");
const supabase = require("../../config/dbConnection");
const router = express.Router();

router.post("/register", async (req, res) => {
    const user = req.body;
    let { data: Integrantes, error } = await supabase
    .from('Integrantes')
    .select('Usuario')
    .filter("Usuario", "eq", user.userName);

    if (!error) {
        if (Integrantes.length <= 0) {

            const { data, error } = await supabase
            .from('Integrantes')
            .insert([
                { 
                    ceduala: user.id,
                    Usuario: user.userName,
                    Contraseña: user.password,
                    Nombre: user.name,
                    Apellido: user.lastName,
                    Telefono: user.phone,
                    Correo: user.email,
                    Semestre: user.semester,
                    Fecha_Registro: Date.now(),
                    Id_Carrera: user.carrer_id,
                    Id_Rol: user.rol_id
                },
            ])
            .select()

            if (!error) {

                if (data.length > 0) {

                    return res.status(200).json({message: "Successfully register"});

                } else {

                    return res.status(400).json({message: "Error to register. Please try later"});

                }
            } else {

                return res.status(500).json({message: "Something went wrong. Please try later"},error);

            }

        } else {

            return res.status(400).json({message: "User Name already exist",});

        }
    } else {

        return res.status(500).json({message: "Something went wrong. Please try later"},error);

    }

});

router.post("/login", async (req, res) => {
    const user = req.body;

    let { data: Integrantes, error } = await supabase
    .from('Integrantes')
    .select('Usuario, Contraseña')
    .filter("Usuario", "eq", user.userName);

    if (!error) {

        if (Integrantes.length > 0) {

            if (Integrantes[0].Contraseña === user.password) {

                return res.status(200).json({message: "Successfully Log-in",});
            } else {

                return res.status(500).json({message: "User password is incorrect",});
            }
        } else {

            return res.status(500).json({message: "User Name is incorrect or does not exist",});
        }
    } else {
        
        return res.status(500).json({message: "Something went wrong. Please try later",});
    }

});

module.exports = router;