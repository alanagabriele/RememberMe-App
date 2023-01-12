const router = require('express').Router()
const Usuarios = require('../models/Usuarios')

//cadastrar novo usuário
router.post('/create', async(req, res) =>{
    const{user, email, senha} = req.body

    if ((!user) || (!email) || (!senha)){
        res.status(422).send(JSON.stringify('422'));
        return
    }
    const usuario = {user, email, senha}
    try {
        let response = await Usuarios.create(usuario)
        res.send(response);
        
    } catch (error) {
        res.status(500).json({error: error})
    }

})

//encontrar usuario para autenticação do login
router.post('/login', async (req, res) => {
    const{user, senha} = req.body

    if ((!user) || (!senha)){
        res.status(422).send(JSON.stringify('422'));
        return
    }
    try {
        let response = await Usuarios.findOne(({user: user}, {senha: senha}));
       
        if(response == null){
            res.status(404).send(JSON.stringify('404'));
            return
        }else{
            res.send(response);
        }
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// deletar todos usuarios
router.delete('/deletarTudo', async (req,res) => {
    try {
        await Usuarios.deleteMany()
        res.status(200).json({message: 'Todos Usarios apagados!'})
        
    } catch (error) {
        res.status(500).json({error: error})
    }

})
module.exports = router