function testeQuantidade(arraySenha) {
    if(arraySenha.length >= 6) {
        return true
    }
    return false
}

function testeNumeroLetra(arraySenha) {
    if(arraySenha.some(valor => /[1234567890]/.test(valor)) && arraySenha.some(elemento => /[abcdefghijklmnopqrstuvwxyzç]/.test(elemento))) {
        return true
    }
    return false
}

function testeCaractereEspecial(arraySenha) {
    if(arraySenha.some(elemento => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(elemento))) {
        return true
    }
    return false
}

function testeTodos(senha) {
    let arraySenha = senha.split('')
    if(!testeCaractereEspecial(arraySenha) || !testeNumeroLetra(arraySenha) || !testeQuantidade(arraySenha)) {
        return false
    }
    return true
}

module.exports = testeTodos