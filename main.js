const iniciar = document.getElementById('btn-iniciar');
const pausar = document.getElementById('btn-pausar');
const parar = document.getElementById('btn-parar');
let tempo = document.querySelector('[data-tempo]');

let seg = 0;
let min = 0;
let hora = 0;

let intervalo;

iniciar.addEventListener('click', () => {

    relogio();
    intervalo = setInterval(relogio, 1000);
});

pausar.addEventListener('click', () => {
    clearInterval(intervalo);
})

parar.addEventListener('click', () => {
    clearInterval(intervalo);
    tempo.innerText = '00:00:00';

    seg = 0;
    min = 0;

})

function doisDigitos(digito) {
    if (digito < 10) {
        digito = '0' + digito;
    }

    return digito;
}

function relogio() {
    ++seg;

    if (seg == 60) {
        seg = 0;
        ++min;
    }

    if (min == 60) {
        ++hora;
        min = 0
    }

    tempo.innerText = doisDigitos(hora) + ':' + doisDigitos(min) + ':' + doisDigitos(seg);
}
