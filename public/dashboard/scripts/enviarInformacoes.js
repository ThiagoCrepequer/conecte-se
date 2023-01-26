form = document.getElementById('formulario-informacoes')

form.addEventListener('submit', function(event) {
    event.preventDefault()

    desc = document.getElementById('input-descricao').value
    idade = document.getElementById('input-idade').value
    estado = document.getElementById('estado').value
    dados = { descricao: desc, idade: idade, estado: estado }

    fetch('http://127.0.0.1:3000/dashboard/atualizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data)
    }) 
    .catch(function(error) {
        console.error('Erro:' + error)
    })
})