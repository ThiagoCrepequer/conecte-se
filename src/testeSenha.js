const { rejects } = require('assert')
const bcrypt = require('bcrypt')

function testeSenha(User, email, senhaInformada) {
    return new Promise((resolve, reject) => {
        User.findOne({ email: email }, function(err, user) {
            if(err) {
                console.error(err)
            } else {
                bcrypt.compare(senhaInformada, user.senha, function(err, resultado) {
                    resolve(resultado)
                })
            }
        })
    })   
}

module.exports = testeSenha