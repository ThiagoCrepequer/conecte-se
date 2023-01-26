async function consultarEmail(User, email) {
    return new Promise((resolve, reject) => {
        User.findOne({ email: email }, function(err, resultado) {
            if(err) {
                console.error(err)
            } else {
                resolve(resultado)
            }
        })
    })
}

module.exports = consultarEmail