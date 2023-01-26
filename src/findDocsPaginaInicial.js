async function findDocs(User) {
    return new Promise((resolve, reject) => {
        User.find({ "desc.idade": {$exists: true}, "desc.estado": {$exists: true}, "desc.descricao": {$exists: true}}, function(err, docs) {
            if(err) {
                console.error(err)
            } else {
                resolve(docs)
            }
        })
    })
}

module.exports = findDocs