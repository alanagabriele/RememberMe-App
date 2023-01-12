const mongoose = require('mongoose')

const Usuarios = mongoose.model('Usuarios', {
    user: String,
    email: String,
    senha: String,

})

module.exports = Usuarios