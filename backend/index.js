require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

//Rotas da API
const usuariosRoutes = require('./routes/usuariosRoutes')
app.use('/usuarios', usuariosRoutes)

const tarefasRoutes = require('./routes/tarefasRoutes')
app.use('/tarefas', tarefasRoutes)

//Conexão banco de dados

const db_user = process.env.db_user
const db_password = encodeURIComponent(process.env.db_password)

mongoose
    .connect(`mongodb+srv://${db_user}:${db_password}@apicluster.efr8cp8.mongodb.net/bancoapi?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3000, (req,res)=>{
            console.log("Conectado ao MongoDB.")
        })
    })
    .catch((err) => console.log(err))