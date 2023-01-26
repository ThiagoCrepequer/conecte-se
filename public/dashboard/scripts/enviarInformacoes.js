form = document.getElementById('formulario-informacoes')

form.addEventListener('submit', function(event) {
    event.preventDefault()

    desc = document.getElementById('text-descricao').value
    idade = document.getElementById('input-idade').value
    estado = document.getElementById('estado').value
    
    dados = { descricao: desc, idade: idade, estado: estado }

    fetch('/dashboard/atualizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        alert(data.status)
    }) 
    .catch(function(error) {
        console.error('Erro:' + error)
    })
})