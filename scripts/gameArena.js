import { runGame } from './inGame/gameFlow.js';

//Presentacion de la pantalla de juego
document.addEventListener('DOMContentLoaded', async () => {
  //console.log('✅ DOM Cargado!');

  // Inicia el flujo del juego
  //console.log(`☎️ [runGame()] %cfrom%c [gameArena.js]`, "color:tomato;", "");
  runGame();
});