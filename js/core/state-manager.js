/**
 * state-manager.js
 *
 * Módulo base para la gestión de estado global del juego.
 * Actualmente puede integrar o interactuar con Local Storage a través de RewardsSystem.
 * (Puede evolucionar para manejar más estado global si es necesario).
 */
class StateManager {
    constructor(rewardsSystem) {
        this.rewardsSystem = rewardsSystem; // Recibe el sistema de recompensas para interactuar con el estado
        // Aquí podrías inicializar otros estados globales si es necesario
        console.log('StateManager: Inicializado');
    }

    // Método para obtener el estado general del jugador (delega a RewardsSystem)
    getEstadoJugador() {
        return this.rewardsSystem.getEstadoJugador();
    }

    // Método para actualizar un valor en el estado global (ej. configuración)
    actualizarConfiguracion(nuevaConfig) {
        // Lógica para actualizar configuración, puede interactuar con RewardsSystem
        // Por ejemplo, actualizar volumen en rewardsSystem.configuracion
        if (this.rewardsSystem.estadoJugador.configuracion) {
            Object.assign(this.rewardsSystem.estadoJugador.configuracion, nuevaConfig);
            this.rewardsSystem.guardarEstado(); // Asegura que se guarde
        }
    }
}

// Se exporta la clase para su uso en main.js
window.StateManager = StateManager;
