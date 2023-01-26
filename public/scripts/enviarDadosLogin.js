form = document.getElementById('formulario-login')

form.addEventListener('submit', function(event) {
    event.preventDefault()

    const email = document.getElementById('email-login').value
    const senhaID = document.getElementById('senha-login')
    const senha = senhaID.value
    const dados = { email: email, senha: senha }

    fetch('http://127.0.0.1:3000/login/autenticacao', {
        method: 'POST',
        headers: {  'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(function(response) {
        if(response.status == 200) {
            window.location.href = '/dashboard'
        } else {
            senhaID.setCustomValidity('Senha ou email errados')
        } 
        return response
    })
    .catch(function(error) {
        console.error(error)
    })
})