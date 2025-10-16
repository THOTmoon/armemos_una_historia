/**
 * main.js
 * 
 * Punto de entrada principal del juego.
 * - Inicializa todos los módulos (Audio, Lógica, Recompensas, etc.)
 * - Coordina la comunicación entre módulos
 * - Maneja el flujo general del juego (inicio, juego, victoria)
 * - Gestiona la pantalla de inicio y splash
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Main.js: DOM Cargado - Inicializando módulos...');

    // 1. Inicializar Event Emitter global
    const eventEmitter = new EventEmitter();

    // 2. Inicializar Asset Manager
    const assetManager = new AssetManager();

    // 3. Inicializar Audio Manager
    const audioManager = new AudioManager(eventEmitter);

    // 4. Inicializar Rewards System
    const rewardsSystem = new RewardsSystem(eventEmitter);

    // 5. Inicializar Game Logic
    const gameLogic = new GameLogic(eventEmitter, assetManager);

    // Referencias a elementos del DOM
    const pantallaInicio = document.getElementById('pantalla-inicio');
    const botonJugar = document.getElementById('boton-jugar');
    const juegoPrincipal = document.getElementById('juego-principal');
    const pantallaVictoria = document.getElementById('pantalla-victoria');
    const mensajeVictoria = document.getElementById('mensaje-victoria');

    // Estados del juego
    let juegoIniciado = false;

    // 6. Listeners de DOM
    botonJugar.addEventListener('click', iniciarJuego);

    // 7. Listeners de eventos globales
    eventEmitter.on('play-sound', (soundName) => {
        audioManager.playSound(soundName);
    });

    eventEmitter.on('nivel-completado', (nivel) => {
    console.log(`📩 [Main] Evento recibido: nivel-completado → Nivel ${nivel}`);
    if (rewardsSystem && typeof rewardsSystem.registrarVictoriaNivel === "function") {
        rewardsSystem.registrarVictoriaNivel(nivel);
    } else {
        console.warn("⚠️ [Main] rewardsSystem.registrarVictoriaNivel no está definido");
    }
});


    eventEmitter.on('juego-completado', () => {
    console.log("📩 [Main] Evento recibido: juego-completado");
    mostrarPantallaVictoria();
});


    eventEmitter.on('mute-changed', (isMuted) => {
        console.log(`Evento recibido: mute-changed - Muted: ${isMuted}`);
    });

    // -------------------------
    // FUNCIONES PRINCIPALES
    // -------------------------

    function iniciarJuego() {
        if (juegoIniciado) return;

        console.log('Main.js: Iniciando juego...');

        // 1. Sonido de inicio
        audioManager.playSound('inicio');

        // 2. Cambiar pantallas
        pantallaInicio.classList.add('hidden');
        juegoPrincipal.classList.remove('hidden');

        // 3. Música de fondo
        audioManager.toggleMusic(true);

        // 4. Arrancar lógica del juego
        gameLogic.iniciarJuego();

        juegoIniciado = true;
    }

    function mostrarPantallaVictoria() {
        console.log('Main.js: Mostrando pantalla de victoria...');

        // ✅ Usamos el sonido correcto de victoria de nivel
        audioManager.playSound('victoria-nivel');

        // Mensaje final
        mensajeVictoria.textContent = '🎉 ¡Felicidades! Has completado todos los niveles. 🌟';

        // Cambiar pantallas
        juegoPrincipal.classList.add('hidden');
        pantallaVictoria.classList.remove('hidden');

        // Reinicio automático después de unos segundos
        setTimeout(() => {
            pantallaVictoria.classList.add('hidden');
            pantallaInicio.classList.remove('hidden');
            juegoIniciado = false;
        }, 8000);
    }

    function reiniciarJuegoCompleto() {
        console.log('Main.js: Reiniciando juego completo...');
        
        gameLogic.destroy();
        
        juegoPrincipal.classList.add('hidden');
        pantallaVictoria.classList.add('hidden');
        pantallaInicio.classList.remove('hidden');
        
        juegoIniciado = false;
    }

    // Exponer para debug
    window.gameApp = {
        eventEmitter,
        audioManager,
        gameLogic,
        reiniciarJuegoCompleto
    };

    console.log('Main.js: Inicialización completa - Módulos listos');
});
