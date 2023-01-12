const router = require('express').Router()
const Tarefas = require('../models/tarefas')

//criar tarefa
router.post('/create', async(req, res) =>{
    const{user, nomeTarefa, prioridade} = req.body

    if ((!nomeTarefa) || (!prioridade)){
        res.status(422).send(JSON.stringify('422'));
        return
    }
    const tarefa = {user, nomeTarefa, prioridade}
    try {
        let response = await Tarefas.create(tarefa)
        res.status(200).send(JSON.stringify('202'));
        //res.send(response);
        
    } catch (error) {
        res.status(500).json({error: error})
    }

})

//read - leitura de todas as tarefas
router.post('/listarTodas', async(req, res) => {
    
    const{user} = req.body
    try {
        let response = await Tarefas.find({user: user})
        res.send(response);
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//read - leitura das tarefas por prioridade
router.post('/listarPrioridade', async(req, res) => {
    
    const{user, prioridade} = req.body
    try {
        let response = await Tarefas.find(({user: user}, {prioridade: prioridade}), {nomeTarefa: 1})
        res.send(response);
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// deletar todas as tarefas
router.delete('/deletarTudo', async (req,res) => {
    
    const{user} = req.body
    try {
        await Tarefas.deleteMany({user: user})
        res.status(200).json({message: 'Tarefas apagadas!'})
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// deletar todas as tarefas por prioridade especifica
router.delete('/deletarTudoPrioridade', async (req,res) => {
    
    const{user, prioridade} = req.body
    try {
        await Tarefas.deleteMany(({user: user}, {prioridade: prioridade}))
        res.status(200).json({message: 'Tarefas apagadas!'})
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})
 
module.exports = router