import { gameState } from "./gameState.js";
import * as phases from "./phases.js";
import * as timers from "./timers.js"

//Inicia el flujo general del juego
export async function startGameFlow() {
  gameState.isGameActive = true;
  // Añadir getReadyCountdown aquí
  await timers.getReadyCountdown();
  phases.currentPhase();
}