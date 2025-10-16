/**
 * js/core/event-emitter.js
 *
 * Módulo base para la emisión y escucha de eventos personalizados.
 * Permite la comunicación desacoplada entre diferentes módulos del juego.
 */
class EventEmitter {
    constructor() {
        // Un objeto para almacenar los listeners de cada evento
        this.events = {};
    }

    /**
     * Suscribe un callback a un evento específico.
     * @param {string} event - El nombre del evento.
     * @param {Function} callback - La función a ejecutar cuando se emita el evento.
     */
    on(event, callback) {
        if (!this.events[event]) {
            // Si es la primera vez que se escucha este evento, crea un array vacío
            this.events[event] = [];
        }
        // Añade el callback al array de listeners para este evento
        this.events[event].push(callback);
    }

    /**
     * Emite un evento específico, ejecutando todos los callbacks suscritos.
     * @param {string} event - El nombre del evento a emitir.
     * @param {*} [data] - Datos opcionales para pasar al callback.
     */
    emit(event, data = null) {
        // Verifica si hay listeners para este evento
        if (this.events[event]) {
            // Ejecuta cada callback asociado al evento, pasándole los datos
            this.events[event].forEach(callback => callback(data));
        }
        // Opcional: Si se quiere emitir un evento genérico para cualquier listener
        // if (this.events['*']) {
        //     this.events['*'].forEach(callback => callback(event, data));
        // }
    }

    /**
     * Elimina un callback específico de un evento.
     * @param {string} event - El nombre del evento.
     * @param {Function} callback - La función callback a eliminar.
     */
    off(event, callback) {
        if (this.events[event]) {
            // Filtra el array para dejar solo los callbacks que no coinciden con el que se quiere remover
            this.events[event] = this.events[event].filter(listener => listener !== callback);
        }
    }
}

// Opcional: Exponer la clase globalmente si no se usa módulos ES6
// De esta forma, otros scripts pueden acceder a 'EventEmitter'
window.EventEmitter = EventEmitter;