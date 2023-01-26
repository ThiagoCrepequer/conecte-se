async function atualizarInformacoes(User, id, dados) {
    User.findOneAndUpdate({ _id: id}, { desc: dados}, { new: false }, (err, user) => {
        if(err) {
            console.error(err)
        } else {
            console.log('Atualizado informações de: ' + user.email)
        }
    })
}

module.exports = atualizarInformacoes