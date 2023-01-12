const mongoose = require('mongoose')

const Tarefas = mongoose.model('Tarefas', {
    user: String,
    nomeTarefa: String,
    prioridade: String,

})

module.exports = Tarefas