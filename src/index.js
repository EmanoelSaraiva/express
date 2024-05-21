import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import 'dotenv/config'
import {v4 as uuid} from 'uuid'


const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT


// CRUD de Filmes - Cadastro de usuário/ Cadastro de Filme/ Login/ Listar filmes por genero/ Listar todos os filmes / Atualizar Filmes / Deletar filmes

let users = []
let filmes = []

// Cadastro de usuário
app.post('/users', async (req, res) => {
    const { nome, senha, email } = req.body
    //nome = Paulo
    //senha = 123
    //email = paulo@paulo.com

    if (!nome){
       res.status(400).send(JSON.stringify({Message: 'Nome inválido'}))
       return 
    }
    if (!senha){
       res.status(400).send(JSON.stringify({Message: 'Senha inválido'}))
       return 
    }
    if (!email){
       res.status(400).send(JSON.stringify({Message: 'E-mail inválido'}))
       return 
    }

    const validEmail = users.find(user => user.email === email)

    if(validEmail){
        return res.status(401).json({ok: false, message: 'E-mail já cadastrado'})
    }

    const senhaIncriptada = await bcrypt.hash(senha, 10)

    const newUser = {
        id: uuid(),
        nome,
        senha: senhaIncriptada,
        email
    }

    users.push(newUser)

    return res.status(201).json({ ok: true, message: 'Usuário cadastrado', data: newUser})
})

app.post('/filmes',(req, res) => {
    try {

        const tomatoes = Number(req.body.tomatoes)

        const { titulo, genero, duracao, sinopse, dtLanca } = req.body

        if(!titulo || !genero || !duracao || !sinopse || !dtLanca || !tomatoes){
            return res.status(401).json({ok: false, message: 'Campo não pode estar em branco'})
        }
        
        const newFilme = {
            id: uuid(),
            titulo,
            genero,
            duracao,
            sinopse,
            dtLanca,
            tomatoes 
        }

        filmes.push(newFilme)

        return res.status(201).json({ok: true, message: 'Filme cadastrado', data: newFilme})
    } catch (error) {
        return res.status(500).json({ok:false, message: 'Internal error'})
    }
})

app.listen(port, () => console.log(`Server runnig port ${port}`))
