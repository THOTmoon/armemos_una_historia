/**
 * js/core/asset-manager.js
 *
 * Módulo encargado de la carga y gestión de recursos (imágenes, audio, etc.).
 * Incluye manejo de errores y estrategias de fallback.
 */
class AssetManager {
    /**
     * Carga un recurso.
     * @param {string} path - Ruta del recurso a cargar.
     * @param {string|null} fallbackPath - Ruta del recurso de fallback (opcional).
     * @param {'image'|'audio'|'json'} type - Tipo de recurso.
     * @returns {Promise<Object>} - Una promesa que resuelve al objeto del recurso cargado o null si falla.
     */
    static async loadAsset(path, fallbackPath = null, type = 'image') {
        try {
            let asset;
            switch (type) {
                case 'image':
                    asset = new Image();
                    asset.src = path;
                    await asset.decode(); // Espera a que la imagen esté completamente cargada y decodificada
                    console.log(`✅ Asset cargado: ${path}`);
                    return asset;
                case 'audio':
                    asset = new Audio(path);
                    // Opcional: Cargar metadatos para asegurar la carga inicial
                    // await new Promise((resolve, reject) => {
                    //     asset.onloadedmetadata = resolve;
                    //     asset.onerror = reject;
                    //     asset.load();
                    // });
                    // Para efectos de sonido, a veces es suficiente asignar src y reproducir
                    // pero para música de fondo, puede ser útil el preloading completo.
                    // Simplemente asignamos la fuente aquí y el play lo maneja el AudioManager
                    console.log(`✅ Asset cargado: ${path}`);
                    return asset;
                case 'json':
                    const response = await fetch(path);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    console.log(`✅ Asset cargado: ${path}`);
                    return data;
                default:
                    console.error(`Tipo de asset no soportado: ${type}`);
                    return null;
            }
        } catch (error) {
            console.warn(`❌ Error cargando asset ${type} "${path}":`, error);
            if (fallbackPath) {
                console.log(`Intentando fallback: ${fallbackPath}`);
                return this.loadAsset(fallbackPath, null, type); // No usar fallback del fallback
            } else {
                console.error(`❌ No hay fallback disponible para ${path}. Asset fallido.`);
                return null; // O podrías retornar un asset por defecto
            }
        }
    }

    /**
     * Carga múltiples recursos simultáneamente.
     * @param {Array<{path: string, type: string, fallbackPath?: string}>} assetsList - Lista de objetos con path, type y opcionalmente fallbackPath.
     * @returns {Promise<Array>} - Una promesa que resuelve a un array con los resultados de la carga (puede incluir nulls si fallan).
     */
    static async loadAssets(assetsList) {
        const promises = assetsList.map(item => this.loadAsset(item.path, item.fallbackPath, item.type));
        return Promise.all(promises);
    }
}

// Opcional: Exponer la clase globalmente si no se usa módulos ES6
window.AssetManager = AssetManager;