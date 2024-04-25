const supabasePublic = require('../../DB/postgresql')

const supabase = require('../../DB/postgresql').supabase

exports.createUser = async (email, password, card, name, lastName, semester, major, rol) =>{
    let { data: Major, errorMajor } = await supabase
    .from('Carreras')
    .select('id')
    .eq('Nombre', major)
    .single()
    if(errorMajor) return errorMajor
    if(!Major) return 'Carrera no existente'
    let { data: Rol, errorRol } = await supabase
    .from('Roles')
    .select('id')
    .eq('Nombre', rol)
    .single()
    if(errorRol) return errorRol
    if(!Rol) return 'Rol no existente'
    let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    })
    if(error) return error
    let { dataInsert, errorInsert } = await supabase
    .from('Integrantes')
    .insert(
    { id: data.user.id, cedula: card, Nombre: name, Apellido: lastName, Semestre: semester, Id_Carrera: Major.id, Id_Rol: Rol.id }
    )
    .select()
    if(errorInsert) {
        const { dataUser, errorUser } = await supabase.auth.admin.deleteUser(data.user.id)
        if(dataUser) return errorInsert
    }
    console.log(dataInsert)
    return 'Usuario creado'
}

exports.login = async (email, password) =>{
    let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })
    if(error) return error
    let { data: users, errorUsers } = await supabase
    .from('Integrantes')
    .select('cedula, Nombre, Apellido, Semestre, Carreras (Nombre), Roles (Nombre)')
    .eq('id', data.user.id)
    .single()
    if(errorUsers) return errorUsers
    console.log(users)
    const user = {
         "email":data.user.email,
         "card": users.cedula,
         "name": users.Nombre,
         "lastName": users.Apellido,
         "semester": users.Semestre,
         "major": users.Carreras.Nombre,
         "rol": users.Roles.Nombre,
         "access_token": data.session.access_token
     }
    return user
}

exports.getResetToken = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
         redirectTo: `http://localhost:5173/restablecer-password/`,
    })
    if(error) return error
    return data
}

exports.resetPassword = async (token, newPassword) => {
    const { data, error } = await supabase.auth.updateUser(token,{
        password: newPassword
    })
    if(error) return error
    return data
}

exports.authMiddleware = async (datos) =>{
    const token = datos.headers.authorization?.split(' ')[1]
    if(!token) return 'Token no proporcionado'
    let { data, error } = await supabase.auth.getUser(token)
    if(error){
        console.log("Failed to get supabase auth user", error)
        return "Unauthorized"
    }
    return data
}
