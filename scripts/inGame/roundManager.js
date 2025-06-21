import { gameState } from "./gameState.js";
import { startTurn } from "./turnManager.js";

/**
 * Ejecuta todos los turnos definidos en la fase.
 */
export async function runRound(phaseConfig) {
  //console.log(`⚙️ [runRound()] %cin%c [roundManager.js]`, "color:cyan;", "");

  //Verificar que sea al final el incremento de ronda y no al final
  //Incrementa el contador de rondas global
  //gameState.currentRound++;
  //console.log(`🗣️ Ronda ${gameState.currentRound}`);
  

  //Inicializa índice de turno para la nueva ronda
  //console.log('🔧 Reset de gameState.currentTurn a 0 para la nueva ronda.');
  gameState.currentTurn = 0;

  //Asumimos perfección hasta que se demuestre lo contrario
  let allTurnsInRoundCorrect = true; 

  //Recorre cada configuración de turno
  for (const turnConfig of phaseConfig.turns) {
    if (gameState.isGameOver) {
      allTurnsInRoundCorrect = false; // Si el juego termina a mitad de ronda, no se considera perfecta
      console.log('💀 Salida anticipada de turnos porque el juego terminó.');
      break;
    }

    //Delegamos todo el flujo de un turno a turnManager.js
    //console.log(`☎️ [startTurn()] %cfrom%c [roundManager.js]`, "color:tomato;", "");
    const turnResultIsCorrect = await startTurn(turnConfig, phaseConfig); // startTurn ahora devuelve true/false
    
    if (!turnResultIsCorrect) {
      allTurnsInRoundCorrect = false; //Si un turno es incorrecto, la ronda no es perfecta
      //No rompemos el bucle, permitimos que el jugador complete todos los turnos de la ronda.
    }
    //gameState.currentTurn se incrementa dentro de startTurn.
  }
  console.log(`🏁 Ronda finalizada. Todos los turnos correctos: ${allTurnsInRoundCorrect}`);
  return allTurnsInRoundCorrect; //Devolver si la ronda fue perfecta
}