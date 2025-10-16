/**
 * rewards-system.js
 * 
 * Maneja:
 * - Progreso de niveles
 * - Monedas como recompensa
 * - Guardado en LocalStorage
 */

class RewardsSystem {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.storageKey = "rewardsData";
        this.data = this.cargarDatos();

        // Referencia al contador en pantalla
        this.monedasDisplay = document.getElementById("contador-monedas");

        // Inicializar contador en UI
        this.actualizarMonedasUI();

        console.log("RewardsSystem inicializado:", this.data);
    }

    // Cargar progreso desde LocalStorage
    cargarDatos() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("RewardsSystem: Error al parsear datos guardados", e);
                return { nivelesCompletados: [], monedas: 0 };
            }
        }
        return { nivelesCompletados: [], monedas: 0 };
    }

    // Guardar progreso en LocalStorage
    guardarDatos() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    // Método genérico para registrar victoria
    registrarVictoria(nivel) {
        if (!this.data.nivelesCompletados.includes(nivel)) {
            this.data.nivelesCompletados.push(nivel);
            this.guardarDatos();
            console.log(`RewardsSystem: Registrando victoria en nivel ${nivel}`);
        } else {
            console.log(`RewardsSystem: El nivel ${nivel} ya estaba completado`);
        }
    }

    // 🔧 Alias compatible con main.js
    registrarVictoriaNivel(nivel) {
        console.log("💎 [RewardsSystem] Registrando victoria de nivel", nivel);
        this.registrarVictoria(nivel);

        // Otorgar monedas fijas por nivel
        this.agregarMonedas(5);

        // Emitir evento opcional
        this.eventEmitter.emit("reward-otorgado", {
            nivel,
            recompensa: "gema",
            monedas: this.data.monedas
        });
    }

    // Manejo de monedas
    agregarMonedas(cantidad) {
        this.data.monedas += cantidad;
        this.guardarDatos();
        this.actualizarMonedasUI();
        console.log(`💰 [RewardsSystem] +${cantidad} monedas (total: ${this.data.monedas})`);
    }

    gastarMonedas(cantidad) {
        if (this.data.monedas >= cantidad) {
            this.data.monedas -= cantidad;
            this.guardarDatos();
            this.actualizarMonedasUI();
            return true;
        }
        return false;
    }

    obtenerMonedas() {
        return this.data.monedas;
    }

    actualizarMonedasUI() {
        if (this.monedasDisplay) {
            this.monedasDisplay.textContent = this.data.monedas;
        }
    }
}

window.RewardsSystem = RewardsSystem;
