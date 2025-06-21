import { runRound } from "./roundManager.js";
import { enemyDamagedPercent, playEnemyIntro } from "./gameUtils.js";
import { phaseCompletedAnimation } from "./animations.js";
import { gameState } from "./gameState.js";
import { renderLetterRings, renderSyllableRings } from "./ui.js";
import { levelsConfig } from "./levelsConfig.js";

// Ejecuta las rondas en una fase hasta cumplir condiciones.
export async function runPhase(phaseConfig) {
  //console.log(`⚙️ [runPhase()] %cin%c [phaseManager.js]`, "color:cyan;", "");

  // Primero mostramos la introducción de la fase
  //console.log(`☎️ [playEnemyIntro()] %cfrom%c [phaseManager.js]`, "color:tomato;", "");
  //await playEnemyIntro(phaseConfig.introAudio); <-------------------------------- Descomentar esto

  //Capturamos los characteres
  const heroElement = gameState.characters.hero.element;
  const enemyElement = gameState.characters.enemy.element;
  const heroInstance = gameState.characters.hero.instance;
  const enemyInstance = gameState.characters.enemy.instance;

  //Mostramos los characteres y les añadimos la clase idle
  heroElement.classList.remove('hidden');
  enemyElement.classList.remove('hidden');
  heroElement.classList.add(heroInstance.cssClasses.idle);
  enemyElement.classList.add(enemyInstance.cssClasses.idle);

  //Mostramos la fase en la que nos encontramos
  console.log(levelsConfig[gameState.currentLevel].phases[gameState.currentPhase]);

  // Renderizamos los anillos
  const ringRenderers = {
    letter: renderLetterRings,
    syllable: renderSyllableRings,
    //semantic: semanticRings,
  };

  //Obtenemos el tipo de fase
  const phaseType = levelsConfig[gameState.currentLevel].phases[gameState.currentPhase].type;

  //Renderizamos los anillos correspondientes al tipo de fase
  const renderer = ringRenderers[phaseType];
  if (renderer) {
    //console.log(`☎️ [${renderer.name}()] %cfrom%c [phaseManager.js]`, "color:tomato;", "");
    await renderer();
  }

  //Guardamos el numero de rondas completadas
  let phaseRoundsCompleted = 0;

  //Guardamos si la fase se ha completado correctamente
  let phaseSuccessfullyCompleted = false;

  do {
    //Incrementamos el contador de rondas locales
    phaseRoundsCompleted++;
    console.log(`➡️ Round ${phaseRoundsCompleted} (Min: ${phaseConfig.minRoundsToPlay}, Max: ${phaseConfig.maxRounds}) for phase '${phaseConfig.type}' starting.`);

    // Ejecuta una ronda completa y obtiene si fue perfecta
    //console.log(`☎️ [runRound()] %cfrom%c [phaseManager.js]`, "color:tomato;", "");
    const roundWasPerfect = await runRound(phaseConfig);
    
    console.log(`⬅️ Round ${phaseRoundsCompleted} for phase '${phaseConfig.type}' completed. Perfect: ${roundWasPerfect}`);

    // Condición para pasar de fase (éxito)
    if (phaseRoundsCompleted >= phaseConfig.minRoundsToPlay && roundWasPerfect) {
      console.log(`🎉 Phase '${phaseConfig.type}' completed successfully (min rounds met and round was perfect).`);
      phaseSuccessfullyCompleted = true;
      break; // Salir del bucle do...while
    }

    // Condición para continuar a la siguiente ronda (si no se ha superado el máximo)
    if (phaseRoundsCompleted >= phaseConfig.maxRounds) {
      console.log(`🚫 Phase '${phaseConfig.type}' ends (max rounds reached without perfect completion after min rounds).`);
      // phaseSuccessfullyCompleted sigue siendo false
      break; // Salir del bucle do...while
    }

    console.log(`🔄 Continuing to next round for phase '${phaseConfig.type}'.`);

  } while (!gameState.isGameOver);

  // Mostrar animación de fase completada si el juego no ha terminado
  if (!gameState.isGameOver) {
    console.log(`☎️ [phaseCompletedAnimation()] %cfrom%c [phaseManager.js]`, "color:tomato;", "");
    await phaseCompletedAnimation();
  }

  // Aquí se podría añadir lógica adicional si la fase no fue completada con éxito
  // Por ejemplo, aplicar alguna penalización o simplemente registrarlo.
  if (!phaseSuccessfullyCompleted && !gameState.isGameOver) {
    console.warn(`⚠️ Phase '${phaseConfig.type}' concluded without successful completion after ${phaseRoundsCompleted} rounds.`);
    // Dependiendo de las reglas del juego, esto podría ser una condición de derrota para el nivel o no.
    // Por ahora, el flujo de levelManager simplemente pasará a la siguiente fase o terminará el nivel.
  }

}
