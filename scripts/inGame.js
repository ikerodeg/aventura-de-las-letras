// inGame.js
import { enemies } from "./enemy.js";
import { player } from "./player.js";
import { gameState } from "./gameState.js";

// Iniciar el juego (ahora solo se ejecuta cuando se llama explícitamente)
function startGame() {
  console.log("🟢 Iniciando el juego...");

  // Reiniciar estado global
  gameState.currentRound = 1;
  gameState.currentSoundIndex = 0;
  gameState.timeLimit = 10;

  // Seleccionar el enemigo según el nivel actual
  gameState.currentEnemy = enemies[gameState.currentRound - 1];

  console.log("🔹 Enemigo seleccionado:", gameState.currentEnemy);

  // Iniciar la primera ronda
  startRound();
}

// Función para iniciar una ronda (placeholder)
function startRound() {
  console.log(`⚔️ Ronda ${gameState.currentRound} - Pelea contra ${gameState.currentEnemy.name}`);
  gameState.currentEnemy.playSound("BA"); 
}

// Exportar startGame() para poder llamarlo desde otros archivos
export { startGame };
