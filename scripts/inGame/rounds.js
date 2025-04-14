import * as animations from "./animations.js";
import * as timers from "./timers.js";
import { playSound } from "./soundManager.js";
import { gameState } from "./gameState.js";
import * as turnManager from "./turnManager.js";


export async function currentRound(){
  //console.log("⚙️ currentRound() en rounds.js");
  
  try {
    // Llama a la animacion del careo entre enemigo y héroe
    //console.log("☎️ enemyHeroCareoAnimation() desde rounds.js");
    //const resultadoAnimation = await animations.enemyHeroCareoAnimation();
    //console.log(resultadoAnimation);
    
  // Llama la música de fondo del nivel
  //console.log("☎️ playSound(musicLevel1) desde phases.js");
  //playSound(`musicLevel${[gameState.currentLevel]}`);
  
  // Llama la animación de Idle del héroe y del enemigo
  //console.log("☎️ heroIdleAnimation() desde rounds.js");
  //animations.heroIdleAnimation();
  //console.log("☎️ enemyIdleAnimation() desde rounds.js");
  //animations.enemyIdleAnimation();
  
  // Llama al manager de turnos
  //console.log("☎️ startTurn() desde rounds.js");
    turnManager.startTurn();


  } catch (error) {
    //console.error("Error en currentRound:", error);
    
  }

}