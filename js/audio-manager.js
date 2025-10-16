/**
 * audio-manager.js (versión con prevención de superposición)
 */

class AudioManager {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.sounds = new Map();
        this.music = null;
        this.isMuted = false;
        this.volume = 1.0;

        // Grupos de variantes - nombres lógicos
        this.soundVariants = {
            'victoria': ['victoria1', 'victoria2', 'victoria3'],
            'error': ['error1', 'error2', 'error3']
        };

        // Control de sonidos en reproducción
        this.sonidosEnReproduccion = new Map();

        this.initSounds();
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (!this.eventEmitter) return;

        this.eventEmitter.on('toggle-mute', () => this.toggleMute());
        this.eventEmitter.on('set-volume', (v) => this.setVolume(v));
        
        this.eventEmitter.on('play-sound', (name) => {
            try {
                this.playSound(name);
            } catch (err) {
                console.warn('AudioManager: Error en play-sound:', name, err);
            }
        });
    }

    initSounds() {
        const allSoundNames = [
            // Sonidos básicos
            'inicio', 'acierto', 'voltear', 'victoria-nivel',
            // Variantes de victoria
            'victoria1', 'victoria2', 'victoria3',
            // Variantes de error
            'error1', 'error2', 'error3'
        ];

        console.log('AudioManager: Inicializando sonidos...');

        for (const name of allSoundNames) {
            const elementId = `sonido-${name}`;
            const audioElement = document.getElementById(elementId);
            
            if (audioElement instanceof HTMLAudioElement) {
                this.sounds.set(name, audioElement);
                this.applyGlobalSettings(audioElement);
                
                // Agregar evento para limpiar cuando termine la reproducción
                audioElement.addEventListener('ended', () => {
                    this.sonidosEnReproduccion.delete(name);
                });
                
                console.log(`✓ Audio registrado: ${name}`);
            } else {
                console.warn(`✗ Audio no encontrado: ${elementId}`);
            }
        }

        // Música de fondo
        const musicEl = document.getElementById('musica-fondo');
        if (musicEl instanceof HTMLAudioElement) {
            this.music = musicEl;
            this.applyGlobalSettings(this.music);
            this.music.volume = 0.2;
            console.log('✓ Música de fondo registrada');
        }

        console.log('AudioManager: Sonidos disponibles:', [...this.sounds.keys()]);
    }

    applyGlobalSettings(audioEl) {
        if (!audioEl) return;
        audioEl.volume = this.volume;
        audioEl.muted = this.isMuted;
    }

    /**
     * Reproduce un sonido por nombre lógico - EVITA SUPERPOSICIÓN
     */
    playSound(name) {
        if (this.isMuted) {
            console.debug('AudioManager: Silenciado, omitiendo:', name);
            return;
        }

        if (!name) {
            console.warn('AudioManager: Nombre de sonido vacío');
            return;
        }

        console.log(`AudioManager: Solicitado sonido: "${name}"`);

        // 1. Detener sonidos del mismo grupo que estén reproduciéndose
        this._detenerSonidosConflictivos(name);

        let sonidoAEjecutar = null;
        let nombreSonidoReal = name;

        // 2. Si es un sonido con variantes, elegir una aleatoria
        if (this.soundVariants[name]) {
            const variants = this.soundVariants[name];
            const availableVariants = variants.filter(v => this.sounds.has(v));
            
            if (availableVariants.length > 0) {
                const chosenVariant = availableVariants[Math.floor(Math.random() * availableVariants.length)];
                nombreSonidoReal = chosenVariant;
                sonidoAEjecutar = this.sounds.get(chosenVariant);
                console.log(`AudioManager: Usando variante: "${chosenVariant}"`);
            } else {
                console.warn(`AudioManager: No hay variantes disponibles para: "${name}"`);
            }
        }

        // 3. Si no se encontró variante, intentar sonido directo
        if (!sonidoAEjecutar) {
            sonidoAEjecutar = this.sounds.get(name);
            if (sonidoAEjecutar) {
                console.log(`AudioManager: Reproduciendo sonido directo: "${name}"`);
            }
        }

        // 4. Reproducir si se encontró un sonido válido
        if (sonidoAEjecutar) {
            this._playSafe(sonidoAEjecutar, nombreSonidoReal);
        } else {
            console.warn(`AudioManager: Sonido no encontrado: "${name}"`);
        }
    }

    /**
     * Detiene sonidos que podrían superponerse con el nuevo
     */
    _detenerSonidosConflictivos(nuevoSonido) {
        // Grupos de sonidos que no deberían superponerse
        const gruposConflictivos = {
            'victoria': ['victoria1', 'victoria2', 'victoria3', 'victoria-nivel'],
            'error': ['error1', 'error2', 'error3'],
            'acierto': ['acierto'],
            'victoria-nivel': ['victoria1', 'victoria2', 'victoria3', 'victoria-nivel']
        };

        const sonidosADetener = gruposConflictivos[nuevoSonido] || [nuevoSonido];

        sonidosADetener.forEach(sonidoNombre => {
            if (this.sonidosEnReproduccion.has(sonidoNombre)) {
                const audioElement = this.sounds.get(sonidoNombre);
                if (audioElement) {
                    audioElement.pause();
                    audioElement.currentTime = 0;
                    this.sonidosEnReproduccion.delete(sonidoNombre);
                    console.log(`AudioManager: Detenido sonido conflictivo: "${sonidoNombre}"`);
                }
            }
        });
    }

    /**
     * Reproducción segura con control de estado
     */
    _playSafe(audioEl, debugName) {
        if (!audioEl) return;

        try {
            // Detener y reiniciar antes de reproducir
            audioEl.pause();
            audioEl.currentTime = 0;
            
            // Registrar que este sonido está en reproducción
            this.sonidosEnReproduccion.set(debugName, audioEl);
            
            const promise = audioEl.play();
            
            if (promise !== undefined) {
                promise.catch(error => {
                    console.warn(`AudioManager: Error al reproducir "${debugName}":`, error.message);
                    this.sonidosEnReproduccion.delete(debugName);
                });
            }
            
            console.log(`AudioManager: ✓ Reproduciendo: "${debugName}"`);
            
        } catch (error) {
            console.warn(`AudioManager: Excepción con "${debugName}":`, error);
            this.sonidosEnReproduccion.delete(debugName);
        }
    }

    /**
     * Detener todos los sonidos inmediatamente
     */
    stopAllSounds() {
        console.log('AudioManager: Deteniendo todos los sonidos...');
        
        for (const [nombre, audioEl] of this.sonidosEnReproduccion) {
            if (audioEl) {
                audioEl.pause();
                audioEl.currentTime = 0;
            }
        }
        
        this.sonidosEnReproduccion.clear();
    }

    /**
     * Detener un sonido específico
     */
    stopSound(name) {
        if (this.sonidosEnReproduccion.has(name)) {
            const audioEl = this.sonidosEnReproduccion.get(name);
            if (audioEl) {
                audioEl.pause();
                audioEl.currentTime = 0;
            }
            this.sonidosEnReproduccion.delete(name);
            console.log(`AudioManager: Sonido detenido: "${name}"`);
        }
    }

    // Métodos restantes iguales...
    toggleMusic(play = true) {
        if (!this.music) return;
        if (play) {
            this.music.currentTime = 0;
            void this.music.play().catch(err => console.warn('Error música:', err));
        } else {
            this.music.pause();
            this.music.currentTime = 0;
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        for (const audioEl of this.sounds.values()) {
            if (audioEl) audioEl.muted = this.isMuted;
        }
        if (this.music) this.music.muted = this.isMuted;
        this.eventEmitter?.emit('mute-changed', this.isMuted);
        console.log(`AudioManager: Mute = ${this.isMuted}`);
    }

    setVolume(v) {
        const nv = Math.max(0, Math.min(1, Number(v) || 0));
        this.volume = nv;
        for (const audioEl of this.sounds.values()) {
            if (audioEl) audioEl.volume = nv;
        }
        if (this.music) this.music.volume = 0.2 * nv;
        console.log(`AudioManager: Volumen = ${this.volume}`);
    }

    getMuteStatus() { return this.isMuted; }
    getVolume() { return this.volume; }
}

window.AudioManager = AudioManager;