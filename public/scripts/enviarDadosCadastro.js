form = document.getElementById('formulario-cadastro')

form.addEventListener('submit', function(event) {
    event.preventDefault()

    // Verifica se as senhas coincidem e retorna um alerta caso não
    const senhaID = document.getElementById('senha')
    const senha = senhaID.value
    const confirmaSenha = document.getElementById('confirmaSenha').value
    if(senha !== confirmaSenha) {
        senhaID.setCustomValidity('As senhas informadas não coincidem')
        return 
    }

    // Verifica se a senha tem os requisitos minimos de segurança
    let arraySenha = senha.split('')
    if(!testeQuantidade(arraySenha) || !testeNumeroLetra(arraySenha) || !testeCaractereEspecial(arraySenha)) {
        senhaID.setCustomValidity('A senha não cumpre os requisitos mínimos')
        return
    }

    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const dados = { nome: nome, email: email, senha: senha, confirmaSenha: confirmaSenha }

    // Envia os dados e espera uma resposta do servidor
    fetch('/cadastro/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        if(data.code == 400) alert(data.error)
        if(data.code == 200) {
            window.location.replace('/login')
        }
    }) 
    .catch(function(error) {
        console.error('Erro:' + error)
    })
})