let inputOculto = document.getElementById('id-estado')
let estadoSelect = inputOculto.getAttribute('value')
let optionSelectec = document.getElementById(estadoSelect)

optionSelectec.setAttribute("selected", "true")