import { gameState } from "./gameState.js";
import { playSound, playFxSound } from "./soundManager.js";
import { showRings, hideRings, updateCounter } from "./ui.js";
import { ringClickAnimation, createRingParticles } from "./animations.js";
import { startAnswerCountdown } from "./timers.js";
import { performAttackAnimation, enemyDeathAnimation, heroDeathAnimation } from "./animations.js";
import { updateHealthBar } from "./ui.js";
import { letterPhaseHandler, syllablePhaseHandler } from "./utilsFunc.js"

/**
 * Ejecuta la lógica completa de un turno:
 * 1) El enemigo presenta el prompt (sonido o imagen).
 * 2) Se muestran anillos y se inicia el temporizador.
 * 3) Se espera la respuesta del jugador.
 * 4) Se ejecutan las animaciones de ataque y daño.
 * 5) Se verifica y gestiona Game Over.
 */
export async function startTurn(turnConfig, phaseConfig) {
  //console.log(`⚙️ [startTurn()] %cin%c [turnManager.js]`, "color:cyan;", "");

  // Añadimos a variable el tipo de fase
  const phaseType = phaseConfig.type;

  // Incrementa contador de turnos global antes de comenzar
  gameState.currentTurn++;
  console.log(`🗣️ Turno ${gameState.currentTurn}`);

  // 1) Enemigo dicta el prompt
  const phaseTypeActions = {
    letter: async () => {
      //console.log(`☎️ [letterPhaseHandler()] %cfrom%c [turnManager.js]`, "color:tomato;", "");
      return await letterPhaseHandler(turnConfig);
    },
    syllable: async () => {
      console.log('Fase de sílaba');
      // Asegúrate de que esto también devuelva una promesa cuando implementes esta fase
      return await syllablePhaseHandler(turnConfig);
    },
    semantic: async () => {
      console.log('Fase semántica');
      // Asegúrate de que esto también devuelva una promesa cuando implementes esta fase
      return Promise.resolve();
    }
  }

  // 2) Mostrar anillos
  //console.log(`☎️ [showRings()] %cfrom%c [turnManager.js]`, "color:tomato;", "");
  await showRings();

  // 3) Ejecutar la accion de la fase
  await phaseTypeActions[phaseType]();

  //Variables locales
  let answered = false;
  let stopTimer;

  //Manejo de la respuesta del jugador
  const result = await new Promise(resolve => {
    const clickHandler = event => {
      console.log(`⚙️ [clickHandler()] %cin%c [turnManager.js]`, "color:cyan;", "");
      if (answered) return;
      const ring = event.target.closest('.ring');
      if (!ring) return;
      answered = true;
      const answer = ring.dataset.syllable;
      playFxSound('fx.ringFx');
      ringClickAnimation(ring);
      const rect = ring.getBoundingClientRect();
      createRingParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
      cleanup();
      resolve({ type: 'player', answer });
    };

    const cleanup = () => {
      document.querySelector('.ringsContainer').removeEventListener('click', clickHandler);
      if (stopTimer) stopTimer();
    };

    //console.log('Añadiendo event listener a .ringsContainer');
    document.querySelector('.ringsContainer').addEventListener('click', clickHandler);

    stopTimer = startAnswerCountdown(
      gameState.countdowns.answer,
      remaining => updateCounter('.mainCounter', remaining),
      () => {
        if (!answered) {
          answered = true;
          cleanup();
          resolve({ type: 'timeout' });
        }
      }
    );
  });

  // 3) Ocultar anillos
  await hideRings();

  console.log(`Respuesta del jugador: ${result.answer}`);
  console.log(`Respuesta esperada: ${turnConfig.expected}`);
  console.log(`Respuesta correcta: ${result.answer === turnConfig.expected}`);
  console.log(turnConfig);
  
  
  

  // 4) Animaciones de ataque y aplicar daño
  const isCorrect = result.type === 'player' && result.answer === turnConfig.expected;
  console.warn(`Respuesta correcta: ${isCorrect}`);

  if (isCorrect) {
    //Sumamos respuesta correcta
    gameState.answers.correct++;
    //Reproducimos sonido correcto
    playFxSound('answers.correct');
    //Animacion de ataque del héroe
    await performAttackAnimation('hero', gameState.characters);
  } else {
    //Sumamos respuesta incorrecta
    gameState.answers.incorrect++;
    //Reproducimos sonido incorrecto
    playFxSound('answers.incorrect');
    //Animacion de ataque del enemigo
    await performAttackAnimation('enemy', gameState.characters);
  }

  // 5) Verificar Game Over
  if (gameState.characters.enemy.instance.health <= 0) {
    await enemyDeathAnimation();
    gameState.isGameOver = true;
    gameState.winner = 'hero';
  } else if (gameState.characters.hero.instance.health <= 0) {
    await heroDeathAnimation();
    gameState.isGameOver = true;
    gameState.winner = 'enemy';
  }

  return isCorrect; // Devolver si el turno fue correcto
}
