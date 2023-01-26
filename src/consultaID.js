async function consultarID(User, id) {   
    return new Promise((resolve, reject) => {
        User.findOne({ _id: id}, function(err, resultado) {
            if(err) {
                console.error(err)
            } else {
                resolve(resultado)
            }
        })
    })
}

module.exports = consultarID