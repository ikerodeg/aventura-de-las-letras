import { startGameFlow } from "./inGame/gameFlow.js";
import { renderRings, hideRings } from './inGame/ui.js';
import { gameState } from './inGame/gameState.js';
import { preloadHeroImages } from './inGame/animations.js';

document.addEventListener('DOMContentLoaded', () => {
  // Usamos una función async auto-ejecutable para poder usar await
  (async () => {
    console.log("✅ DOM Cargado!");
    // Pre-cargar imágenes ANTES de cualquier operación
    await preloadHeroImages();

    // Llamada a la funcion que renderiza los anillos
    try {
      // Renderizado de anillos y ocultacion automatica
      const resultadoRenderRings = await renderRings('.ringsContainer', gameState.soundSequence);
      //console.log(resultadoRenderRings);

    } catch (error) {
      console.error("❌ Error fatal al renderizar anillos iniciales:", error);
      return;
    }

    // Inicia el flujo del juego DESPUÉS de renderizar los anillos
    console.log("🚀 Iniciando el juego...");
    startGameFlow();

  })();
});