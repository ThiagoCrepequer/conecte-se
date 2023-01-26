const senha = document.getElementById('senha')
const lista = document.getElementById('lista-condicoes-senha')

senha.addEventListener('focus', function() {
    lista.hidden = false
})

function testeQuantidade(arraySenha) {
    if(arraySenha.length >= 6) {
        document.getElementById('quantidade-caractere').style.color = 'green'
        return true
    }
    document.getElementById('quantidade-caractere').style.color = 'red'
    return false
}


function testeNumeroLetra(arraySenha) {
    if(arraySenha.some(valor => /[1234567890]/.test(valor)) && arraySenha.some(elemento => /[abcdefghijklmnopqrstuvwxyzç]/.test(elemento))) {
        document.getElementById('minimo-numero-letra').style.color = 'green'
        return true
    }
    document.getElementById('minimo-numero-letra').style.color = 'red'
    return false
}

function testeCaractereEspecial(arraySenha) {
    if(arraySenha.some(elemento => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(elemento))) {
        document.getElementById('caractere-especial').style.color = 'green'
        return true
    }
    document.getElementById('caractere-especial').style.color = 'red'
    return false
}

senha.addEventListener('input', function() {
    const arraySenha = senha.value.split('')

    // A multiplicação de 3 fatores true terá resultado 1, caso qualquer um desses seja false o resultado sempre será 0
    const resultado = testeQuantidade(arraySenha) * testeNumeroLetra(arraySenha) * testeCaractereEspecial(arraySenha)

    if(resultado == 1) {
        lista.hidden = true
    } else {
        lista.hidden = false
    }
})