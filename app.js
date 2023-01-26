const addUsuario = require('./src/addUsuario.js')
const testeSenha = require('./src/testeSenha.js')
const consultarEmail = require('./src/consultaEmail.js')
const consultarID = require('./src/consultaID.js')
const testeSegurancaSenha = require('./src/testeSegurancaSenha.js')
const atualizarInformacoes = require('./src/atualizarInfo.js')
const findDocs = require('./src/findDocsPaginaInicial.js')
const session = require('express-session')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config({debug: true})
const mongoose = require('mongoose')
const url = process.env.URL_MONGO
const secret = require('crypto').randomBytes(64).toString('hex')
const path = require('path');

// Estabelece a variavel User para a conexão com o banco de dados
const usuarioSchema = new mongoose.Schema({
    nome: String,
    email: {type: String, unique: true},
    senha: String,
    desc: JSON
})
const User = mongoose.model('usuarios', usuarioSchema)

mongoose.set('strictQuery', true)
mongoose.connect(url, { useNewUrlParser: true })

// Configura a sessão
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

// !! Páginas do site pelo Express !! 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public/'))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/'))

app.use(express.static(__dirname + '/public/inicial'))
app.get('/', (req, res) => {
    findDocs(User).then((response) => {
        let data = {}
        let docs = response
        if(req.session.Autenticado) {
            let id = req.session.Autenticado.split('"')[0]
            consultarID(User, id).then((resp) => {
                data = {
                    nome: resp.nome
                } 
                res.render('inicial/index', {docs: docs, nome: data})   
            })
        } else {
            res.render('inicial/index', {docs: docs, nome: data})
        }       
    })   
})

// Página principal de cadastro
app.get('/cadastro', (req, res) => {
    res.sendFile(__dirname + '/public/cadastro.html')
})

// Página que recebe as informções do cadastro e as processa
app.post('/cadastro/add', (req, res) => {
    const {nome, senha, confirmaSenha, email} = req.body

    if(senha !== confirmaSenha) return res.status(400).json({ code: 400, error: "senhas não conferem, tente novamente" })
    if(!testeSegurancaSenha(senha)) return res.status(400).json({ code: 400, error: "a senha não cumpre os requisitos minimos" })

    consultarEmail(User, email).then((response) => {
        if(response) {
            return res.status(400).json({ code: 400, error: "email ja cadastrado" })
        } else {
            addUsuario(nome, email, senha, User).then((response) => {
                if(response) {
                    res.status(200).json({ code: 200 })
                }
            })
        }
    })
})

// Página principal de login
app.get('/login', (req, res) => {
    if(req.session.Autenticado) {
        res.redirect('/dashboard')
    }
    res.sendFile(__dirname + '/public/login.html')
})

// Página que processa as informações recebidas do login
app.post('/login/autenticacao', (req, res) => {
    const { email, senha } = req.body

    consultarEmail(User, email).then((response) => {
        if(!response) return res.status(400).json({ error: "email ou senha errados" })

        testeSenha(User, email, senha).then((resp) => {
            if(resp) {
                req.session.Autenticado = response._id
                console.log('Autenticado: ' + email)
                res.status(302).redirect('/dashboard')
            } else {
                res.status(401).json({ error: "email o senha errados" })
            }
        })
    })
})

// Página acessada após a confirmação da identidade de login
app.use(express.static(__dirname + '/public/dashboard'))
app.get('/dashboard', (req, res) => {
    if(req.session.Autenticado) {
        let id = req.session.Autenticado.split('"')[0]

        consultarID(User, id).then((response) => {
            let data = {
                nome: response.nome,
                email: response.email
            }
            let desc = {}
            if(response.desc) {
                for(i=0; Object.keys(response.desc).length > i; i++) {
                    if(Object.entries(response.desc)[i][1]) {
                        desc[Object.keys(response.desc)[i]] = Object.entries(response.desc)[i][1]
                    }
                }
            }
            
            res.render('dashboard/index', { data: data, desc: desc })
        })    
    } else {
        res.send('Você precisa fazer login para acessar essa pagina')
    }
})

app.post('/dashboard/atualizar', (req, res) => {
    if(req.session.Autenticado) {
        let id = req.session.Autenticado.split('"')[0]

        let dados = {
            descricao: req.body.descricao,
            idade: req.body.idade,
            estado: req.body.estado
        }
        atualizarInformacoes(User, id, dados).then(() => {
            res.status(200).json({ status: 'atualizado' })
        })
    } else {
        res.send('Erro inesperado')
    }
})

app.listen(3000, () => {
    console.log('Servidor online na porta 3000')
})