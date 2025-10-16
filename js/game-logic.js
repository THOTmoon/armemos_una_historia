/**
 * game-logic.js
 * 
 * Módulo adaptado del código de referencia - Solo imágenes verticales, centrado correcto
 */

class GameLogic {
    constructor(eventEmitter, assetManager) {
        this.eventEmitter = eventEmitter;
        this.assetManager = assetManager;
        
        // Estado del juego
        this.nivelActual = 1;
        this.intentos = 0;
        this.posiciones = [];
        this.opciones = [];
        this.secuenciaCorrecta = [];
        this.nivelData = null;
        
        // Datos completos de niveles (SOLO imágenes verticales)
        this.nivelesCompletos = {
    "titulo": "Juego de Secuenciación Lógica - Sirenas y Unicornios",
    "descripcion": "Colección de secuencias lógicas para terapia cognitiva",
    "version": "1.0",
    "niveles": [
        {
            "id": 1,
            "titulo": "Ciclo de una Planta",
            "descripcion": "Ordena los pasos para que la semilla crezca",
            "tema": "naturaleza",
            "pasos": [
                {
                    "id": "semilla1",
                    "imagen": "pictogramas/secuencias-base/semilla1.png",
                    "descripcion": "Semilla"
                },
                {
                    "id": "semilla2",
                    "imagen": "pictogramas/secuencias-base/semilla2.png",
                    "descripcion": "Brota"
                },
                {
                    "id": "semilla3",
                    "imagen": "pictogramas/secuencias-base/semilla3.png",
                    "descripcion": "Planta crece"
                }
            ]
        },
        {
            "id": 2,
            "titulo": "Proceso de la Miel",
            "descripcion": "Ordena los pasos para obtener miel",
            "tema": "naturaleza",
            "pasos": [
                {
                    "id": "miel1",
                    "imagen": "pictogramas/secuencias-base/miel1.png",
                    "descripcion": "Flor"
                },
                {
                    "id": "miel2",
                    "imagen": "pictogramas/secuencias-base/miel2.png",
                    "descripcion": "Abeja"
                },
                {
                    "id": "miel3",
                    "imagen": "pictogramas/secuencias-base/miel3.png",
                    "descripcion": "Miel"
                }
            ]
        },
        {
            "id": 3,
            "titulo": "Ciclo del Agua",
            "descripcion": "Ordena los pasos del ciclo del agua",
            "tema": "naturaleza",
            "pasos": [
                {
                    "id": "agua1",
                    "imagen": "pictogramas/secuencias-base/agua1.png",
                    "descripcion": "Lluvia"
                },
                {
                    "id": "agua2",
                    "imagen": "pictogramas/secuencias-base/agua2.png",
                    "descripcion": "Río"
                },
                {
                    "id": "agua3",
                    "imagen": "pictogramas/secuencias-base/agua3.png",
                    "descripcion": "Nube"
                }
            ]
        },
        {
            "id": 4,
            "titulo": "Proceso de la Leche",
            "descripcion": "Ordena los pasos para obtener leche",
            "tema": "animales",
            "pasos": [
                {
                    "id": "leche1",
                    "imagen": "pictogramas/secuencias-base/leche1.png",
                    "descripcion": "Vaca"
                },
                {
                    "id": "leche2",
                    "imagen": "pictogramas/secuencias-base/leche2.png",
                    "descripcion": "Ordeño"
                },
                {
                    "id": "leche3",
                    "imagen": "pictogramas/secuencias-base/leche3.png",
                    "descripcion": "Vaso de leche"
                }
            ]
        },
        {
            "id": 5,
            "titulo": "Hacer una Ensalada",
            "descripcion": "Ordena los pasos para preparar una ensalada",
            "tema": "cocina",
            "pasos": [
                {
                    "id": "ensalada1",
                    "imagen": "pictogramas/secuencias-base/ensalada1.png",
                    "descripcion": "Tomate"
                },
                {
                    "id": "ensalada2",
                    "imagen": "pictogramas/secuencias-base/ensalada2.png",
                    "descripcion": "Lechuga"
                },
                {
                    "id": "ensalada3",
                    "imagen": "pictogramas/secuencias-base/ensalada3.png",
                    "descripcion": "Ensalada lista"
                }
            ]
        },
        {
            "id": 6,
            "titulo": "Proceso de la Gallina",
            "descripcion": "Ordena los pasos del proceso de la gallina",
            "tema": "animales",
            "pasos": [
                {
                    "id": "gallina1",
                    "imagen": "pictogramas/secuencias-base/gallina1.png",
                    "descripcion": "Gallina"
                },
                {
                    "id": "gallina2",
                    "imagen": "pictogramas/secuencias-base/gallina2.png",
                    "descripcion": "Huevo"
                },
                {
                    "id": "gallina3",
                    "imagen": "pictogramas/secuencias-base/gallina3.png",
                    "descripcion": "Pollito"
                }
            ]
        },
        {
            "id": 7,
            "titulo": "Proceso del Fuego",
            "descripcion": "Ordena los pasos para hacer fuego",
            "tema": "naturaleza",
            "pasos": [
                {
                    "id": "fuego1",
                    "imagen": "pictogramas/secuencias-base/fuego1.png",
                    "descripcion": "Madera"
                },
                {
                    "id": "fuego2",
                    "imagen": "pictogramas/secuencias-base/fuego2.png",
                    "descripcion": "Fósforo"
                },
                {
                    "id": "fuego3",
                    "imagen": "pictogramas/secuencias-base/fuego3.png",
                    "descripcion": "Fuego encendido"
                }
            ]
        },
        {
            "id": 8,
            "titulo": "Hacer Jugo de Naranja",
            "descripcion": "Ordena los pasos para preparar jugo de naranja",
            "tema": "cocina",
            "pasos": [
                {
                    "id": "jugo_naranja1",
                    "imagen": "pictogramas/secuencias-base/jugo_naranja1.png",
                    "descripcion": "Naranja"
                },
                {
                    "id": "jugo_naranja2",
                    "imagen": "pictogramas/secuencias-base/jugo_naranja2.png",
                    "descripcion": "Exprimir"
                },
                {
                    "id": "jugo_naranja3",
                    "imagen": "pictogramas/secuencias-base/jugo_naranja3.png",
                    "descripcion": "Vaso de jugo"
                }
            ]
        },
        {
            "id": 9,
            "titulo": "Lavarse las Manos",
            "descripcion": "Ordena los pasos para lavarse las manos correctamente",
            "tema": "higiene",
            "pasos": [
                {
                    "id": "manos_sucias1",
                    "imagen": "pictogramas/secuencias-base/manos_sucias1.png",
                    "descripcion": "Manos sucias"
                },
                {
                    "id": "manos_sucias2",
                    "imagen": "pictogramas/secuencias-base/manos_sucias2.png",
                    "descripcion": "Aplicar jabón"
                },
                {
                    "id": "manos_sucias3",
                    "imagen": "pictogramas/secuencias-base/manos_sucias3.png",
                    "descripcion": "Manos limpias"
                }
            ]
        },
        {
            "id": 10,
            "titulo": "Lavar los Platos",
            "descripcion": "Ordena los pasos para lavar los platos",
            "tema": "hogar",
            "pasos": [
                {
                    "id": "platos1",
                    "imagen": "pictogramas/secuencias-base/platos1.png",
                    "descripcion": "Platos sucios"
                },
                {
                    "id": "platos2",
                    "imagen": "pictogramas/secuencias-base/platos2.png",
                    "descripcion": "Aplicar detergente"
                },
                {
                    "id": "platos3",
                    "imagen": "pictogramas/secuencias-base/platos3.png",
                    "descripcion": "Platos limpios"
                }
            ]
        },
        {
            "id": 11,
            "titulo": "Ciclo de una Mariposa",
            "descripcion": "Ordena los pasos del ciclo de vida de una mariposa",
            "tema": "naturaleza",
            "pasos": [
                {
                    "id": "mariposa1",
                    "imagen": "pictogramas/secuencias-base/mariposa1.png",
                    "descripcion": "Huevo"
                },
                {
                    "id": "mariposa2",
                    "imagen": "pictogramas/secuencias-base/mariposa2.png",
                    "descripcion": "Oruga"
                },
                {
                    "id": "mariposa3",
                    "imagen": "pictogramas/secuencias-base/mariposa3.png",
                    "descripcion": "Mariposa adulta"
                }
            ]
        },
        {
            "id": 12,
            "titulo": "Crecimiento de una Semilla (Alternativo)",
            "descripcion": "Ordena los pasos para que la semilla crezca (alternativo)",
            "tema": "naturaleza",
            "pasos": [
                {
                    "id": "semilla1_alt",
                    "imagen": "pictogramas/secuencias-base/semilla1.png",
                    "descripcion": "Semilla"
                },
                {
                    "id": "semilla2_alt",
                    "imagen": "pictogramas/secuencias-base/semilla2.png",
                    "descripcion": "Riego"
                },
                {
                    "id": "semilla3_alt",
                    "imagen": "pictogramas/secuencias-base/semilla3.png",
                    "descripcion": "Planta florece"
                }
            ]
        },
        {
            "id": 13,
            "titulo": "Proceso de la Madera",
            "descripcion": "Ordena los pasos para obtener madera útil",
            "tema": "naturaleza",
            "pasos": [
                {
                    "id": "madera1",
                    "imagen": "pictogramas/secuencias-base/madera1.png",
                    "descripcion": "Árbol"
                },
                {
                    "id": "madera2",
                    "imagen": "pictogramas/secuencias-base/madera2.png",
                    "descripcion": "Talar"
                },
                {
                    "id": "madera3",
                    "imagen": "pictogramas/secuencias-base/madera3.png",
                    "descripcion": "Tronco cortado"
                }
            ]
        },
        {
            "id": 14,
            "titulo": "Hacer una Tortilla",
            "descripcion": "Ordena los pasos para preparar una tortilla",
            "tema": "cocina",
            "pasos": [
                {
                    "id": "tortilla1",
                    "imagen": "pictogramas/secuencias-base/tortilla1.png",
                    "descripcion": "Huevos"
                },
                {
                    "id": "tortilla2",
                    "imagen": "pictogramas/secuencias-base/tortilla2.png",
                    "descripcion": "Batir huevos"
                },
                {
                    "id": "tortilla3",
                    "imagen": "pictogramas/secuencias-base/tortilla3.png",
                    "descripcion": "Tortilla cocida"
                }
            ]
        },
        {
            "id": 15,
            "titulo": "Cuidado de las Uñas",
            "descripcion": "Ordena los pasos para cuidar las uñas",
            "tema": "higiene",
            "pasos": [
                {
                    "id": "uñas1",
                    "imagen": "pictogramas/secuencias-base/uñas1.png",
                    "descripcion": "Uñas largas"
                },
                {
                    "id": "uñas2",
                    "imagen": "pictogramas/secuencias-base/uñas2.png",
                    "descripcion": "Cortar uñas"
                },
                {
                    "id": "uñas3",
                    "imagen": "pictogramas/secuencias-base/uñas3.png",
                    "descripcion": "Uñas cortas"
                }
            ]
        }
    ],
    "configuracion": {
        "tiempoInactividadMs": 60000,
        "maxIntentos": 10
    }
};

        this.totalNiveles = this.nivelesCompletos.niveles.length;
        
        // Referencias al DOM
        this.contenedorSecuencia = document.getElementById('contenedor-secuencia');
        this.nivelDisplay = document.getElementById('nivel-actual');
        this.intentosDisplay = document.getElementById('intentos');
        this.descripcionDisplay = document.getElementById('descripcion-nivel');
        this.mensajeDisplay = document.getElementById('mensaje');
        this.botonSiguiente = document.getElementById('boton-siguiente');
        this.botonReiniciar = document.getElementById('reiniciar');
        this.tituloNivelDisplay = document.getElementById('titulo-nivel');
        
        // Configuración
        this.timerInactividad = null;
        this.tiempoInactividad = this.nivelesCompletos.configuracion.tiempoInactividadMs;
        this.maxIntentos = this.nivelesCompletos.configuracion.maxIntentos;

        // Nuevas propiedades para soporte táctil
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.currentTouchItem = null;
        this.isTouchDragging = false;
        
        this.initEventListeners();
    }

    initEventListeners() {
        if (this.botonSiguiente) {
            this.botonSiguiente.addEventListener('click', () => {
                this.cargarSiguienteNivel();
            });
        }

        if (this.botonReiniciar) {
            this.botonReiniciar.addEventListener('click', () => {
                this.reiniciarNivel();
            });
        }

        this.eventEmitter.on('nivel-completado', (nivel) => {
            console.log(`Nivel ${nivel} completado`);
        });
    }

    async cargarNivel(nivel = 1) {
        try {
            this.nivelData = this.nivelesCompletos.niveles.find(n => n.id === nivel);
            if (!this.nivelData) throw new Error(`Nivel ${nivel} no encontrado`);

            this.nivelActual = nivel;
            
            if (this.nivelDisplay) this.nivelDisplay.textContent = nivel;
            if (this.descripcionDisplay) this.descripcionDisplay.textContent = this.nivelData.descripcion;
            if (this.tituloNivelDisplay) this.tituloNivelDisplay.textContent = this.nivelData.titulo;
            
            this.secuenciaCorrecta = [...this.nivelData.pasos];
            
            // ADAPTACIÓN: Usar solo imágenes verticales para todo
            this.opciones = this.secuenciaCorrecta.map(paso => ({
                ...paso
            }));
            
            this.opciones.sort(() => Math.random() - 0.5);

            this.posiciones = Array(3).fill(null).map(() => ({ 
                item: null, 
                isCorrect: false 
            }));
            
            this.intentos = 0;
            this.actualizarIntentos();
            
            this.renderizarTablero();
            this.reiniciarTimerInactividad();

        } catch (error) {
            console.error('Error cargando nivel:', error);
            this.mostrarMensaje(`Error: ${error.message}`, 'error');
        }
    }

    /**
     * Función principal de renderizado
     */
    renderizarTablero() {
        this.renderizarSecuencia();
        this.renderizarCarrusel();
        
        if (this.botonSiguiente) {
            this.botonSiguiente.classList.add('hidden');
        }
        this.mostrarMensaje('Arrastra las imágenes a la posición correcta', 'info');
    }

    /**
     * Renderiza el área de secuencia (3 posiciones arriba)
     */
    renderizarSecuencia() {
        if (!this.contenedorSecuencia) return;
        
        this.contenedorSecuencia.innerHTML = '';

        this.posiciones.forEach((posicionData, index) => {
            const posicion = document.createElement('div');
            posicion.className = 'posicion-secuencia';
            posicion.dataset.index = index;
            
                    if (posicionData.item) {
            const item = posicionData.item;
            const img = document.createElement('img');
            
            // ADAPTACIÓN: Solo imagen vertical
            img.src = `assets/img/${item.imagen}`;
            img.className = 'pictograma-secuencia';
            
            if (posicionData.isCorrect) {
                img.dataset.isCorrect = "true";
            }
            
            img.alt = item.descripcion;
            img.draggable = false;
            posicion.appendChild(img);
            
            // BOTÓN QUITAR CON SOPORTE TÁCTIL
            const botonQuitar = document.createElement('button');
            botonQuitar.textContent = '×';
            botonQuitar.className = 'boton-quitar';
        
            // Evento para mouse (desktop)
            botonQuitar.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.quitarPictograma(index);
            });
        
            // Evento para touch (móviles)
            botonQuitar.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.quitarPictograma(index);
            });
        
            // Prevenir arrastre accidental del botón
            botonQuitar.addEventListener('touchstart', (e) => {
                e.stopPropagation();
            });
        
            botonQuitar.addEventListener('touchmove', (e) => {
                e.stopPropagation();
            });
        
            if (posicionData.isCorrect) {
                botonQuitar.style.display = 'none';
            }
            posicion.appendChild(botonQuitar);
        
        } else {
            posicion.classList.add('posicion-vacia');
            posicion.textContent = `Paso ${index + 1}`;
        }
            
            posicion.addEventListener('dragover', this.onDragOver);
            posicion.addEventListener('drop', (e) => this.onDrop(e, index));
            // Evento táctil para las posiciones de secuencia
            posicion.addEventListener('touchend', (e) => this.handleTouchEnd(e, index));
            
            this.contenedorSecuencia.appendChild(posicion);
        });
    }

    /**
     * Renderiza el carrusel de opciones - ADAPTADO del código de referencia
     */
        renderizarCarrusel() {
            const carruselInner = document.querySelector('.carrusel-inner');
            const indicadores = document.querySelector('.indicadores-carrusel');
            
            if (!carruselInner) return;
    
            carruselInner.innerHTML = '';
            if (indicadores) indicadores.innerHTML = '';
    
            const opcionesDisponibles = this.opciones.filter(opcion => !this.estaEnSecuencia(opcion.id));
            
            if (opcionesDisponibles.length === 0) {
                carruselInner.innerHTML = '<p class="mensaje-carrusel">¡Secuencia completa!</p>';
                if (indicadores) indicadores.innerHTML = '';
                this.actualizarNavegacionCarrusel(true);
                return;
            }
    
            opcionesDisponibles.forEach((opcion, index) => {
                const opcionElement = document.createElement('div');
                // La clase 'activa' se establece inicialmente en el índice 0, pero `activarOpcion(0)` lo recalculará
                opcionElement.className = `opcion-carrusel ${index === 0 ? 'activa' : ''}`;
                opcionElement.dataset.id = opcion.id;
                opcionElement.draggable = true; // Se mantendrá true o false según `activarOpcion`
    
                const img = document.createElement('img');
                img.src = `assets/img/${opcion.imagen}`;
                img.alt = opcion.descripcion;
                img.className = 'pictograma-opcion';
                opcionElement.appendChild(img);
    
                // APLICAR TODOS LOS EVENTOS A TODAS LAS OPCIONES
                // La función `activarOpcion` se encargará de habilitar/deshabilitar la interactividad
                
                // Eventos para mouse (Arrastre)
                opcionElement.addEventListener('dragstart', (e) => this.onDragStart(e, opcion));
                
                // Eventos para tactil (Arrastre y Toque/Tap)
                opcionElement.addEventListener('touchstart', (e) => this.handleTouchStart(e, opcion));
                opcionElement.addEventListener('touchmove', (e) => this.handleTouchMove(e));
                opcionElement.addEventListener('touchend', (e) => this.handleTap(e, opcion));
                opcionElement.addEventListener('touchcancel', () => this.resetTouchState());
                
                // Evento para centrarla al hacer click
                opcionElement.addEventListener('click', () => this.activarOpcion(index));
    
                carruselInner.appendChild(opcionElement);
            
                if (indicadores) {
                    const indicador = document.createElement('div');
                    indicador.className = `indicador ${index === 0 ? 'activo' : ''}`;
                    indicador.addEventListener('click', () => this.activarOpcion(index));
                    indicadores.appendChild(indicador);
                }
            });
    
            this.actualizarNavegacionCarrusel();
            // Llamar a activarOpcion(0) para establecer el estado de interactividad correcto (pointerEvents, draggable)
            // para la primera imagen y desactivar las demás.
            this.activarOpcion(0);
        }

    /**
     * MÉTODO DE CENTRADO DEL CÓDIGO DE REFERENCIA - FUNCIONA CORRECTAMENTE
     */
        activarOpcion(index) {
        const opciones = document.querySelectorAll('.opcion-carrusel');
        const indicadores = document.querySelectorAll('.indicador');
        
        opciones.forEach((op, i) => {
            const isActive = i === index;
            op.classList.toggle('activa', isActive);
            
            // Actualizar interactividad
            if (isActive) {
                op.style.pointerEvents = 'auto';
                op.style.opacity = '1';
                op.draggable = true;
            } else {
                op.style.pointerEvents = 'none';
                op.style.opacity = '0.6';
                op.draggable = false;
            }
        });

        // 2. Centrar la opción activa en el contenedor visible del carrusel
        const carruselInner = document.querySelector('.carrusel-inner');
        const opcionActiva = opciones[index];
        if (carruselInner && opcionActiva) {
            const contenedorCarrusel = document.querySelector('.carrusel');
            if (!contenedorCarrusel) return;

            const rectActiva = opcionActiva.getBoundingClientRect();
            const rectContenedor = contenedorCarrusel.getBoundingClientRect();

            // Calcular la posición del centro del elemento activo relativo al contenedor
            const centroActiva = rectActiva.left - rectContenedor.left + rectActiva.width / 2;
            // Calcular el centro del contenedor
            const centroContenedor = rectContenedor.width / 2;

            // Calcular cuánto necesitamos desplazar para centrar
            const desplazamientoNecesario = centroContenedor - centroActiva;

            // Obtener el transform actual del carrusel-inner
            const transformActual = window.getComputedStyle(carruselInner).transform;
            let translateXActual = 0;
            if (transformActual !== 'none') {
                // Extraer el valor de translateX del transform
                const matrix = transformActual.replace(/[^0-9\-.,]/g, '').split(',');
                translateXActual = parseFloat(matrix[4]) || 0;
            }

            // Calcular el nuevo valor de translateX
            const nuevoTranslateX = translateXActual + desplazamientoNecesario;

            // Aplicar el nuevo transform
            carruselInner.style.transform = `translateX(${nuevoTranslateX}px)`;
        }
    }

    /**
     * Navegación del carrusel - DEL CÓDIGO DE REFERENCIA
     */
    actualizarNavegacionCarrusel(desactivar = false) {
        const btnAnterior = document.querySelector('.carrusel-btn.anterior');
        const btnSiguiente = document.querySelector('.carrusel-btn.siguiente');
        
        if (desactivar) {
            if (btnAnterior) btnAnterior.onclick = null;
            if (btnSiguiente) btnSiguiente.onclick = null;
            return;
        }

        if (btnAnterior) {
            btnAnterior.onclick = () => this.navegarCarrusel(-1);
        }
        if (btnSiguiente) {
            btnSiguiente.onclick = () => this.navegarCarrusel(1);
        }
    }

    /**
     * Navegación del carrusel - DEL CÓDIGO DE REFERENCIA
     */
    navegarCarrusel(direccion) {
        const opciones = document.querySelectorAll('.opcion-carrusel');
        let indexActivo = Array.from(opciones).findIndex(op => op.classList.contains('activa'));
        
        indexActivo += direccion;
        
        if (indexActivo < 0) {
            indexActivo = opciones.length - 1;
        } else if (indexActivo >= opciones.length) {
            indexActivo = 0;
        }

        this.activarOpcion(indexActivo);
    }

    estaEnSecuencia(id) {
        return this.posiciones.some(posData => posData.item && posData.item.id === id);
    }

    onDragStart(event, item) {
        event.dataTransfer.setData('text/plain', item.id);
        event.dataTransfer.setData('application/json', JSON.stringify(item));
        this.reiniciarTimerInactividad();
    }

    onDragOver(event) {
        event.preventDefault();
    }

    onDrop(event, posicionIndex) {
        event.preventDefault();
        const itemId = event.dataTransfer.getData('text/plain');
        const item = JSON.parse(event.dataTransfer.getData('application/json'));
        
        if (this.estaEnSecuencia(itemId)) {
            this.mostrarMensaje('Esta imagen ya está en la secuencia', 'advertencia');
            return;
        }

        this.posiciones[posicionIndex].item = item;

        this.intentos++;
        this.actualizarIntentos();

        const esParteCorrecta = this.secuenciaCorrecta.some(paso => paso.id === itemId);
        if (esParteCorrecta) {
            this.eventEmitter.emit('play-sound', 'acierto');
        } else {
            this.eventEmitter.emit('play-sound', 'error');
        }
        
        this.renderizarTablero();

        if (this.posiciones.every(posData => posData.item !== null)) {
            this.verificarSecuencia();
        }
    }

    /**
     * MÉTODOS PARA SOPORTE TÁCTIL EN MÓVILES
     */

    // Manejar inicio de toque
    handleTouchStart(event, item) {
        event.preventDefault();
        const touch = event.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
        this.currentTouchItem = item;
        this.isTouchDragging = false;
        
        // Feedback visual
        if (event.currentTarget) {
            event.currentTarget.style.opacity = '0.7';
        }
    }

    // Manejar movimiento táctil
    handleTouchMove(event) {
        if (!this.currentTouchItem) return;
        
        const touch = event.touches[0];
        const deltaX = Math.abs(touch.clientX - this.touchStartX);
        const deltaY = Math.abs(touch.clientY - this.touchStartY);
        
        // Si se movió lo suficiente, considerar como arrastre
        if (deltaX > 10 || deltaY > 10) {
            this.isTouchDragging = true;
        }
    }

    // Manejar fin de toque
    handleTouchEnd(event, posicionIndex) {
        event.preventDefault();
        
        if (!this.currentTouchItem || !this.isTouchDragging) {
            this.resetTouchState();
            return;
        }
        
        // Verificar si el elemento ya está en la secuencia
        if (this.estaEnSecuencia(this.currentTouchItem.id)) {
            this.mostrarMensaje('Esta imagen ya está en la secuencia', 'advertencia');
            this.resetTouchState();
            return;
        }
        
        // Colocar el ítem en la posición
        this.posiciones[posicionIndex].item = this.currentTouchItem;
        
        this.intentos++;
        this.actualizarIntentos();
        
        const esParteCorrecta = this.secuenciaCorrecta.some(paso => paso.id === this.currentTouchItem.id);
        if (esParteCorrecta) {
            this.eventEmitter.emit('play-sound', 'acierto');
        } else {
            this.eventEmitter.emit('play-sound', 'error');
        }
        
        this.renderizarTablero();
        
        if (this.posiciones.every(posData => posData.item !== null)) {
            this.verificarSecuencia();
        }
        
        this.resetTouchState();
    }

    // Resetear estado táctil
    resetTouchState() {
        this.currentTouchItem = null;
        this.isTouchDragging = false;
        this.touchStartX = 0;
        this.touchStartY = 0;
        
        // Restaurar opacidad de todos los elementos
        document.querySelectorAll('.opcion-carrusel').forEach(el => {
            el.style.opacity = '1';
        });
    }

    // Método para toque simple (alternativa al arrastre)
    handleTap(event, item) {
        event.preventDefault();
        
        // Buscar primera posición vacía
        const emptyIndex = this.posiciones.findIndex(pos => pos.item === null);
        if (emptyIndex === -1) return;
        
        // Verificar si el elemento ya está en la secuencia
        if (this.estaEnSecuencia(item.id)) {
            this.mostrarMensaje('Esta imagen ya está en la secuencia', 'advertencia');
            return;
        }
        
        // Colocar el ítem en la posición
        this.posiciones[emptyIndex].item = item;
        
        this.intentos++;
        this.actualizarIntentos();
        
        const esParteCorrecta = this.secuenciaCorrecta.some(paso => paso.id === item.id);
        if (esParteCorrecta) {
            this.eventEmitter.emit('play-sound', 'acierto');
        } else {
            this.eventEmitter.emit('play-sound', 'error');
        }
        
        this.renderizarTablero();
        
        if (this.posiciones.every(posData => posData.item !== null)) {
            this.verificarSecuencia();
        }
    }

    quitarPictograma(index) {
        this.posiciones[index].item = null;
        this.posiciones[index].isCorrect = false;
        this.renderizarTablero();
    }

    verificarSecuencia() {
        const secuenciaActual = this.posiciones.map(posData => posData.item ? posData.item.id : null);
        const secuenciaCorrecta = this.secuenciaCorrecta.map(item => item.id);

        const esCorrecta = secuenciaActual.every((id, index) => {
            return id && secuenciaCorrecta[index] && id.toLowerCase() === secuenciaCorrecta[index].toLowerCase();
        });

        if (esCorrecta) {
            this.manejarVictoria();
        } else {
            this.manejarError();
        }
    }

    /**
     * CORREGIDO: Manejo mejorado de la victoria
     */
    manejarVictoria() {
        this.posiciones.forEach(posData => {
            posData.isCorrect = true;
        });
        
        this.renderizarTablero();
        
        this.eventEmitter.emit('nivel-completado', this.nivelActual);
        this.eventEmitter.emit('play-sound', 'victoria'); // ← USA 'victoria' para las variantes aleatorias
        
        
        // Mensaje diferente si es el último nivel
        if (this.nivelActual < this.totalNiveles) {
            this.mostrarMensaje('🎉 ¡Secuencia correcta! Nivel completado', 'exito');
            setTimeout(() => {
            this.cargarSiguienteNivel();
        }, 4000);

            if (this.botonSiguiente) {
                this.botonSiguiente.classList.remove('hidden');
                this.botonSiguiente.style.display = 'none';
            }
        } else {
            this.mostrarMensaje('🎊 ¡Felicidades! Has completado todos los niveles', 'exito');
            this.mostrarPantallaFinal();
        }
    }

    /**
     * NUEVO: Mostrar pantalla de finalización mejorada
     */
    mostrarPantallaFinal() {
        console.log("Mostrando pantalla final...");
        
        // Ocultar elementos del juego
        if (this.contenedorSecuencia) this.contenedorSecuencia.style.display = 'none';
        if (this.mensajeDisplay) this.mensajeDisplay.style.display = 'none';
        if (this.botonSiguiente) this.botonSiguiente.style.display = 'none';
        
        // Mostrar pantalla de finalización
        const pantallaFinal = document.getElementById('pantalla-final');
        if (pantallaFinal) {
            pantallaFinal.classList.remove('hidden');
            
            // Crear efectos DENTRO del contenedor
            this.crearContenedorEfectos();
            
            // Actualizar estadísticas finales con mensaje mejorado para niña de 6 años
            const estadisticasFinal = document.getElementById('estadisticas-final');
            if (estadisticasFinal) {
                estadisticasFinal.innerHTML = `
                    <div class="decoracion-estrellas">⭐</div>
                    <h3>¡Lo Lograste, Campeona! 🎀</h3>
                    <p>Completaste todos los juegos de secuencias</p>
                    
                    <div class="estadistica-destacada">
                        <span class="numero">${this.totalNiveles}</span>
                        <span class="texto">Juegos completados</span>
                    </div>
                    
                    <div class="estadistica-destacada">
                        <span class="numero">${this.intentos}</span>
                        <span class="texto">Veces que intentaste</span>
                    </div>
                    
                    <div class="mensaje-motivador">
                        ¡Eres muy inteligente y divertida!<br>
                        Aprendiste mucho jugando
                    </div>
                    
                    <p style="color: #8a6fa3; font-size: 1.1rem; margin-top: 1rem;">
                        Cada secuencia que ordenaste<br>
                        te hizo pensar y aprender<br>
                        ¡Eres una gran pensadora!
                    </p>
                `;
            }
            
            // Configurar botón de reinicio - MÉTODO MEJORADO
            const botonReiniciarJuego = document.getElementById('reiniciar-juego');
            if (botonReiniciarJuego) {
                // Remover event listeners anteriores para evitar duplicados
                botonReiniciarJuego.replaceWith(botonReiniciarJuego.cloneNode(true));
                const nuevoBoton = document.getElementById('reiniciar-juego');
                
                nuevoBoton.onclick = () => {
                    console.log("Botón de reinicio clickeado");
                    this.reiniciarJuegoCompleto();
                };
                nuevoBoton.innerHTML = '✨ Jugar Otra Vez ✨';
            } else {
                console.error("No se encontró el botón de reinicio");
            }
        } else {
            console.error("No se encontró la pantalla final");
            // Si no existe la pantalla final, crear una básica
            this.crearPantallaFinalEmergencia();
        }
    }

    /**
     * NUEVO: Crear contenedores para efectos (confeti y corazones)
     */
    crearContenedorEfectos() {
        const pantallaFinalContenido = document.querySelector('.pantalla-final-contenido');
        if (!pantallaFinalContenido) return;
        
        // Limpiar efectos anteriores
        const contenedorConfeti = pantallaFinalContenido.querySelector('.contenedor-confeti');
        const contenedorCorazones = pantallaFinalContenido.querySelector('.contenedor-corazones');
        if (contenedorConfeti) contenedorConfeti.remove();
        if (contenedorCorazones) contenedorCorazones.remove();
        
        // Crear contenedor de confeti
        const confetiContainer = document.createElement('div');
        confetiContainer.className = 'contenedor-confeti';
        pantallaFinalContenido.appendChild(confetiContainer);
        
        // Crear contenedor de corazones
        const corazonesContainer = document.createElement('div');
        corazonesContainer.className = 'contenedor-corazones';
        pantallaFinalContenido.appendChild(corazonesContainer);
        
        // Crear efectos
        this.crearConfeti(confetiContainer);
        this.crearCorazones(corazonesContainer);
    }

    /**
     * NUEVO: Crear efecto de confeti MEJORADO (dentro del contenedor)
     */
    crearConfeti(contenedor) {
        if (!contenedor) return;
        
        for (let i = 0; i < 25; i++) {
            const confeti = document.createElement('div');
            confeti.className = 'confeti';
            confeti.style.left = Math.random() * 100 + '%';
            confeti.style.animationDelay = Math.random() * 5 + 's';
            confeti.style.animationDuration = (3 + Math.random() * 3) + 's';
            contenedor.appendChild(confeti);
        }
    }

    /**
     * NUEVO: Crear corazones MEJORADO (dentro del contenedor)
     */
    crearCorazones(contenedor) {
        if (!contenedor) return;

        const coloresCorazones = ['#ff69b4', '#ff97c2', '#d6a2e8', '#a5d8ff'];
        const emojisCorazones = ['💖', '💕', '🌸', '🌟', '🎀', '🦄'];
        
        for (let i = 0; i < 6; i++) {
            const corazon = document.createElement('div');
            corazon.className = 'corazon-flotante';
            corazon.innerHTML = emojisCorazones[i % emojisCorazones.length];
            // Posicionar dentro del contenedor
            corazon.style.left = (10 + Math.random() * 80) + '%';
            corazon.style.top = (10 + Math.random() * 80) + '%';
            corazon.style.animationDelay = (i * 0.8) + 's';
            corazon.style.color = coloresCorazones[i % coloresCorazones.length];
            corazon.style.fontSize = (1.2 + Math.random() * 0.8) + 'rem';
            contenedor.appendChild(corazon);
        }
    }

    /**
     * CORREGIDO: Reiniciar juego completo - MÁS ROBUSTO
     */
    reiniciarJuegoCompleto() {
        console.log("Reiniciando juego completo...");
        
        // Ocultar pantalla final
        const pantallaFinal = document.getElementById('pantalla-final');
        if (pantallaFinal) {
            pantallaFinal.classList.add('hidden');
        }
        
        // Mostrar elementos del juego
        if (this.contenedorSecuencia) {
            this.contenedorSecuencia.style.display = 'flex';
        }
        if (this.mensajeDisplay) {
            this.mensajeDisplay.style.display = 'block';
            this.mensajeDisplay.textContent = 'Arrastra las imágenes a la posición correcta';
        }
        if (this.botonSiguiente) {
            this.botonSiguiente.style.display = 'block';
            this.botonSiguiente.classList.add('hidden');
        }
        
        // Reiniciar variables del juego
        this.nivelActual = 1;
        this.intentos = 0;
        this.actualizarIntentos();
        
        // Cargar primer nivel
        setTimeout(() => {
            this.cargarNivel(1);
        }, 100);
    }

    /**
     * NUEVO: Pantalla de emergencia si no existe el HTML
     */
    crearPantallaFinalEmergencia() {
        const pantallaFinal = document.createElement('div');
        pantallaFinal.id = 'pantalla-final';
        pantallaFinal.innerHTML = `
            <div class="pantalla-final-contenido">
                <div id="estadisticas-final">
                    <h3>¡Lo Lograste, Campeona! 🎀</h3>
                    <p>Completaste todos los juegos de secuencias</p>
                    <div class="estadistica-destacada">
                        <span class="numero">${this.totalNiveles}</span>
                        <span class="texto">Juegos completados</span>
                    </div>
                    <div class="mensaje-motivador">
                        ¡Eres muy inteligente y divertida!<br>
                        Aprendiste mucho jugando
                    </div>
                    <button id="reiniciar-juego" class="boton-principal">✨ Jugar Otra Vez ✨</button>
                </div>
            </div>
        `;
    
        document.body.appendChild(pantallaFinal);
        
        // Configurar botón
        const botonReiniciarJuego = document.getElementById('reiniciar-juego');
        if (botonReiniciarJuego) {
            botonReiniciarJuego.onclick = () => {
                document.body.removeChild(pantallaFinal);
                this.reiniciarJuegoCompleto();
            };
        }
        
        this.crearContenedorEfectos();
    }

    /**
     * CORREGIDO: Cargar siguiente nivel con verificación
     */
    cargarSiguienteNivel() {
        if (this.nivelActual < this.totalNiveles) {
            this.cargarNivel(this.nivelActual + 1);
        } else {
            // Si es el último nivel, mostrar pantalla final
            this.manejarVictoria();
        }
    }

    manejarError() {
        this.eventEmitter.emit('play-sound', 'error');
        this.mostrarMensaje('❌ Secuencia incorrecta. Intenta de nuevo.', 'error');
        
        setTimeout(() => {
            this.mostrarMensaje('Arma la secuencia en el orden correcto', 'info');
        }, 2000);
    }

    mostrarMensaje(mensaje, tipo = 'info') {
        if (!this.mensajeDisplay) return;
        
        this.mensajeDisplay.textContent = mensaje;
        
        const colores = {
            'exito': '#4CAF50',
            'error': '#F44336',
            'advertencia': '#FFC107',
            'info': '#2196F3'
        };
        
        this.mensajeDisplay.style.color = colores[tipo] || '#FFC107';
    }

    actualizarIntentos() {
        if (this.intentosDisplay) {
            this.intentosDisplay.textContent = this.intentos;
        }
    }

    reiniciarNivel() {
        this.eventEmitter.emit('play-sound', 'voltear');
        this.cargarNivel(this.nivelActual);
    }

    reiniciarTimerInactividad() {
        if (this.timerInactividad) clearTimeout(this.timerInactividad);
        
        this.timerInactividad = setTimeout(() => {
            this.manejarInactividad();
        }, this.tiempoInactividad);
    }

    manejarInactividad() {
        this.mostrarMensaje('¿Necesitas ayuda? Reiniciando nivel...', 'info');
        
        setTimeout(() => {
            this.reiniciarNivel();
        }, 2000);
    }

    iniciarJuego() {
        this.cargarNivel(1);
    }

    destroy() {
        if (this.timerInactividad) clearTimeout(this.timerInactividad);
    }
}


window.GameLogic = GameLogic;



