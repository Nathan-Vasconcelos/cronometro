const iniciar = document.getElementById('btn-iniciar');
const pausar = document.getElementById('btn-pausar');
const parar = document.getElementById('btn-parar');
let tempo = document.querySelector('[data-tempo]');

let seg = 0;
let min = 0;
let hora = 0;

let intervalo;
let alarmeTocando;
let alarmeProgramado;

const programar = document.querySelector('[data-alarme]');
const alarme = document.querySelector('.inut-alarme');
const confirmar = document.querySelector('#confirmar');
const pararAlarme = document.querySelector('#parar-alarme');
const somAlarme = document.getElementById('somAlarme');

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
    hora = 0;

})

programar.addEventListener('click', () => {
    tempo.style.display = 'none';
    iniciar.style.display = 'none';
    pausar.style.display = 'none';
    parar.style.display = 'none';

    alarme.style.display = 'initial';
    confirmar.style.display = 'block';
    programar.style.display = 'none';
})

confirmar.addEventListener('click', () => {
    alarmeProgramado = alarme.value;
    tempo.innerText = '00:00:00';
    seg = 0;
    min = 0;
    hora = 0;

    tempo.style.display = 'block';
    iniciar.style.display = 'initial';
    pausar.style.display = 'initial';
    parar.style.display = 'initial';

    alarme.style.display = 'none';
    confirmar.style.display = 'none';
    programar.style.display = 'none';

    relogio();
    intervalo = setInterval(relogio, 1000);
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

    function tocarAlarme() {
        somAlarme.play();
    }

    tempo.innerText = doisDigitos(hora) + ':' + doisDigitos(min) + ':' + doisDigitos(seg);

    if (alarmeProgramado !== undefined && alarmeProgramado !== '' && alarmeProgramado !== '00:00:00') {

        if (alarmeProgramado == tempo.innerText) {

            clearInterval(intervalo);
            seg = 0;
            min = 0;
            hora = 0;

            somAlarme.play();
            pararAlarme.style.display = 'block';

            pararAlarme.addEventListener('click', () => {
                clearInterval(alarmeTocando);
                somAlarme.pause();
                somAlarme.currentTime = 0;
                pararAlarme.style.display = 'none';
                programar.style.display = 'block';
                tempo.innerText = '00:00:00';
                alarmeProgramado = '';
            })

            alarmeTocando = setInterval(tocarAlarme, 17000);
        }
    }
}
