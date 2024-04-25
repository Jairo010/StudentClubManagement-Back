const modelo = require('./modelo')

exports.createUser =(data) =>{
        if(!data.email) return 'No se ha enviado un email'
        if(!data.password) return 'No se ha enviado una contraseña'
        if(!data.card) return 'No se ha enviado una cedula'
        if(!data.name) return 'No se ha enviado un nombre'
        if(!data.lastName) return 'No se ha enviado un apellido'
        if(!data.semester) return 'No se ha enviado un semestre'
        if(!data.major) return 'No se ha enviado una carrera'
        if(!data.rol) return 'No se ha enviado un rol'
        return modelo.createUser(data.email, data.password, data.card, data.name, data.lastName, data.semester, data.major, data.rol)
}

exports.login =(data) =>{
    if(!data.email) return 'No se ha enviado un email'
    if(!data.password) return 'No se ha enviado una contraseña'
    return modelo.login(data.email, data.password)
}

exports.getResetToken = (data) =>{
    if(!data.email) return 'No se ha enviado un email'
    return modelo.getResetToken(data.email)
}

exports.resetPassword = (data) =>{
    if(!data.token) return 'No se ha enviado un token'
    if(!data.password) return 'No se ha enviado una contraseña'
    return modelo.resetPassword(data.token, data.password)
}