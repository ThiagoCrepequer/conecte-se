const { rejects } = require('assert')
const bcrypt = require('bcrypt')

function addUsuario(nome, email, senha, User) {
    // Cria o hash da senha
    const saltRounds = 10

    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function(error, salt) {
            bcrypt.hash(senha, salt, function(err, hash) {
                let novoUsuario = new User({
                    nome: nome,
                    email: email,
                    senha: hash
                })
            
                // Adiciona um novo usuario caso esse email n esteja cadastro ainda
                novoUsuario.save(function(error) {
                    if(error) {
                        console.error(error)
                        resolve(false)
                    } 
                    console.log('Usuario adicionado')
                    resolve(true)
                })
            })
        })
    }) 
}  

module.exports = addUsuario