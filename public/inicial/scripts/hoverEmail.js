document.querySelectorAll('.div-usuarios').forEach(function(element) {
    element.addEventListener('mouseover', function() {
        var nome = this.querySelector('.nome-usuario')
        var desc = this.querySelector('.desc-usuario')
        var overlay = this.querySelector('.overlay')

        overlay.style.opacity = '70%'

        nome.style.filter = 'blur(5px)'
        desc.style.filter = 'blur(5px)'
        
        contato = this.querySelector('.contato-usuario')

        contato.style.opacity = '100%'
    })
    element.addEventListener('mouseout', function() {
        var nome = this.querySelector('.nome-usuario')
        var desc = this.querySelector('.desc-usuario')
        var overlay = this.querySelector('.overlay')

        overlay.style.opacity = '0'

        nome.style.filter = 'blur(0)'
        desc.style.filter = 'blur(0)'

        contato = this.querySelector('.contato-usuario')
        contato.style.opacity = '0'
    })
})