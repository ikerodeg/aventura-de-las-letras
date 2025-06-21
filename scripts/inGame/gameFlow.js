import { runLevel } from "./levelManager.js";
import { gameState } from "./gameState.js";
import { applyHeroRewards, showGameOverScreen } from "./gameUtils.js";

/**
 * Orquesta el flujo de niveles completo.
 */
export async function runGame() {
  //console.log(`⚙️ [runGame()] %cin%c [gameFlow.js]`, "color: cyan;", "");
  
  //Se ajusta el estado del juego a activo
  gameState.isGameActive = true;
  //console.log(`🔧 isGameActive = true`);
  
  while (!gameState.isGameOver) {
    //Se inicial el nivel
    //console.log(`☎️ [runLevel()] %cfrom%c [gameFlow.js]`, "color:tomato;", "");
    await runLevel(gameState.currentLevel);
    
    //Si se ha terminado el nivel y no está el juego acabado
    if (!gameState.isGameOver) {
      //Se aplica recompensa al héroe
      applyHeroRewards(gameState.currentLevel);
      //Se pasa al siguiente nivel
      gameState.currentLevel++;
      
    }
  }

  //Se muestra la pantalla de Game Over
  showGameOverScreen(gameState.winner);
}