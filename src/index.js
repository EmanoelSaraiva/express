import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'

const app = express()

app.use(cors())
app.use(express.json())

// CRUD de Filmes - Cadastro de usuário/ Cadastro de Filme/ Login/ Listar filmes por genero/ Listar todos os filmes / Atualizar Filmes / Deletar filmes

let users = []
let idAutomatico = 1

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
        id: idAutomatico,
        nome,
        senha: senhaIncriptada,
        email
    }

    idAutomatico++

    users.push(newUser)

    return res.status(201).json({ ok: true, message: 'Usuário cadastrado', data: newUser})
})

app.listen(3333, () => console.log('Server runnig port 3333'))
