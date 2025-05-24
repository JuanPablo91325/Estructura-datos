document.addEventListener('DOMContentLoaded', () => {
    const saldoEl = document.getElementById('saldo-jugador');
    const saldoJuegoEl = document.getElementById('saldo-jugador-juego');
    const apuestaActualEl = document.getElementById('apuesta-actual');
    const apuestaJuegoEl = document.getElementById('apuesta-actual-juego');
    const rondaActualEl = document.getElementById('ronda-actual'); // Elemento de la ronda
    const aumentarApuestaBtn = document.getElementById('aumentar-apuesta');
    const disminuirApuestaBtn = document.getElementById('disminuir-apuesta');
    const iniciarJuegoBtn = document.getElementById('iniciar-juego');
    const resultadoEl = document.getElementById('resultado');
    const pantallaApuesta = document.getElementById('pantalla-apuesta');
    const pantallaJuego = document.getElementById('pantalla-juego');
    const cartasJugadorEl = document.getElementById('cartas-jugador');
    const cartasMaquinaEl = document.getElementById('cartas-maquina');
    const mesaEl = document.querySelector('.mesa');
    const apuestaDiv = document.querySelector('.apuesta');

    let manoJugador = [];
    let manoMaquina = [];
    let juegoTerminado = false;
    let puntosJugador = 100; // Puntos iniciales
    let apuesta = 0;
    let ronda = 1; // Nivel inicial

    function actualizarSaldo() {
        saldoEl.textContent = puntosJugador;
        saldoJuegoEl.textContent = puntosJugador;
        apuestaActualEl.textContent = apuesta;
        apuestaJuegoEl.textContent = apuesta;
        rondaActualEl.textContent = ronda; // Actualizar la ronda en la interfaz
    }

    function calcularPuntaje(mano) {
        return mano.reduce((total, carta) => total + carta, 0);
    }

    function repartirCarta(jugador) {
        const carta = Math.floor(Math.random() * 10) + 1; // Número aleatorio entre 1 y 10
        const contenedor = jugador === 'jugador' ? cartasJugadorEl : cartasMaquinaEl;
        const cartaEl = document.createElement('div');
        cartaEl.classList.add('carta');
        cartaEl.textContent = carta;
        contenedor.appendChild(cartaEl);

        if (jugador === 'jugador') {
            manoJugador.push(carta);
            verificarEstado();
        } else {
            manoMaquina.push(carta);
        }
    }

    function turnoMaquina() {
        const limite = 17 + (ronda - 1) * 2; // Aumenta el límite de la máquina con cada ronda
        while (calcularPuntaje(manoMaquina) < limite) {
            repartirCarta('maquina');
        }
        determinarGanador();
    }

    function verificarEstado() {
        const puntajeJugador = calcularPuntaje(manoJugador);

        if (puntajeJugador > 21) {
            resultadoEl.textContent = '¡Te pasaste de 21! La máquina gana.';
            juegoTerminado = true;
        }
    }

    function determinarGanador() {
        const puntajeJugador = calcularPuntaje(manoJugador);
        const puntajeMaquina = calcularPuntaje(manoMaquina);

        if (puntajeJugador > 21) {
            resultadoEl.textContent = '¡Te pasaste de 21! La máquina gana.';
        } else if (puntajeMaquina > 21 || puntajeJugador > puntajeMaquina) {
            puntosJugador += apuesta * 2; // Gana el doble de la apuesta
            resultadoEl.textContent = `¡Ganaste! Ahora tienes ${puntosJugador} puntos.`;
            ronda++; // Incrementar la ronda al ganar
        } else if (puntajeJugador < puntajeMaquina) {
            resultadoEl.textContent = `La máquina gana. Te quedan ${puntosJugador} puntos.`;
        } else {
            resultadoEl.textContent = 'Es un empate.';
        }

        juegoTerminado = true;

        // Mostrar pantalla de apuesta si el jugador tiene saldo
        if (puntosJugador > 0) {
            setTimeout(() => {
                reiniciarJuego();
            }, 2000);
        } else {
            resultadoEl.textContent = 'Te has quedado sin puntos. ¡Perdiste! Reinicia el juego para volver a jugar.';
            document.getElementById('pedir').disabled = true;
            document.getElementById('plantarse').disabled = true;
        }
    }

    function reiniciarJuego() {
        if (puntosJugador <= 0) {
            // Reiniciar el saldo si el jugador perdió
            puntosJugador = 100;
            ronda = 1; // Reiniciar la ronda al perder
            resultadoEl.textContent = 'Se reinició el juego. Tienes 100 puntos para apostar.';
        }

        // Reiniciar las variables del juego
        manoJugador = [];
        manoMaquina = [];
        juegoTerminado = false;
        cartasJugadorEl.innerHTML = '';
        cartasMaquinaEl.innerHTML = '';
        pantallaJuego.style.display = 'none';
        pantallaApuesta.style.display = 'block';
        apuesta = 0; // Reiniciar la apuesta
        actualizarSaldo(); // Actualizar el saldo en la interfaz

        // Habilitar los botones nuevamente
        document.getElementById('pedir').disabled = false;
        document.getElementById('plantarse').disabled = false;
    }

    // Eventos
    aumentarApuestaBtn.addEventListener('click', () => {
        if (apuesta + 10 <= puntosJugador) {
            apuesta += 10;
            actualizarSaldo();
        }
    });

    disminuirApuestaBtn.addEventListener('click', () => {
        if (apuesta - 10 >= 0) {
            apuesta -= 10;
            actualizarSaldo();
        }
    });

    iniciarJuegoBtn.addEventListener('click', () => {
        if (apuesta > 0) {
            puntosJugador -= apuesta;
            actualizarSaldo();
            pantallaApuesta.style.display = 'none';
            pantallaJuego.style.display = 'block';
        } else {
            resultadoEl.textContent = 'Debes realizar una apuesta antes de iniciar.';
        }
    });

    document.getElementById('pedir').addEventListener('click', () => {
        if (!juegoTerminado) {
            repartirCarta('jugador');
        }
    });

    document.getElementById('plantarse').addEventListener('click', () => {
        if (!juegoTerminado) {
            turnoMaquina();
        }
    });

    document.getElementById('reiniciar').addEventListener('click', () => {
        reiniciarJuego();
    });
});
