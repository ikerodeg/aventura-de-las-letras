import { showRings, hideRings, updateCounter } from "./ui.js";
import { gameState } from "./gameState.js";
import { playSound } from "./soundManager.js";
import { ringClickAnimation, createRingParticles } from "./animations.js";
import * as timers from "./timers.js";
import { enemy } from "./enemy.js";
import { hero } from "./player.js";

// Función para manejar el turno del enemigo
async function enemyTurn() {
  try {
    console.log("⚙️ enemyTurn() en turnManager.js");
    gameState.currentSoundSyllable = gameState.soundSequence[gameState.currentSoundIndex];
    gameState.correctAnswer = gameState.currentSoundSyllable;
    
    const resultadoPlaySound = await playSound(gameState.currentSoundSyllable.toLowerCase());
    console.log(resultadoPlaySound);
    return "🏁 enemyTurn() completado";
  } catch (error) {
    console.error("Error en enemyTurn:", error);
    throw error;
  }
}

// Función para evaluar la respuesta del jugador y actualizar el estado
async function processPlayerResponse(result) {
  if (result.type === "player") {
    gameState.playerAnswer = result.answer;
    if (gameState.playerAnswer === gameState.correctAnswer) {
      console.log("✅ Correcto!");
      await hideRings();
      gameState.correctAnswers++;
      gameState.currentSoundIndex++;
      playSound("correct");
      setTimeout(() => hero.attack(), 500);
    } else {
      console.log("❌ Incorrecto!");
      gameState.incorrectAnswers++;
      gameState.currentSoundIndex++;
      playSound("incorrect");
      setTimeout(() => enemy.attack(), 500);
    }
  } else {
    console.log("⌛ Se agotó el tiempo");
    gameState.incorrectAnswers++;
    gameState.currentSoundIndex++;
    playSound("incorrect");
    setTimeout(() => enemy.attack(), 500);
  }
  await new Promise(res => setTimeout(res, 2500));
}

// Función para verificar condiciones de GameOver
async function checkTurn() {
  if (gameState.enemyHealth <= 0 || gameState.heroHealth <= 0) {
    console.log("☠️ " + (gameState.enemyHealth <= 0 ? "Enemy" : "Hero") + " defeated!");
    gameState.isGameOver = true;
    console.log("💀 GAME OVER!");
    return false;
  }
  return true;
}

// Función que inicia el turno del combate (CORE ACTUALIZADO)
export async function startTurn() {
  console.log(`currentSoundIndex: ${gameState.currentSoundIndex}`);

  if (gameState.currentSoundIndex >= gameState.soundSequence.length) {
    console.log(`---------- Fin Ronda ${gameState.currentRound} -----------`);
    gameState.currentSoundIndex = 0;
    if (++gameState.currentRound === 4) {
      console.log("Fin de las rondas");
      gameState.currentRound = 1;
      return;
    }
  }

  try {
    // Fase 1: Turno del enemigo
    const resultadoEnemyTurn = await enemyTurn();
    console.log(resultadoEnemyTurn);

    // Fase 2: Mostrar anillos
    await showRings(".ringsContainer");
    
    // Fase 3: Temporizador integrado con detección de clics
    const result = await new Promise((resolve) => {
      let answered = false;
      const container = document.querySelector(".ringsContainer");
      let stopTimer = null; // <--- Variable para controlar el timer

      const cleanup = () => {
        container.removeEventListener("click", clickHandler);
        if (stopTimer) stopTimer(); // <--- Detener timer solo si existe
      };

      const clickHandler = (event) => {
        const ring = event.target.closest(".ring");
        if (ring && !answered) {
          answered = true;
          playSound("ringFx");
          ringClickAnimation(ring);
          const rect = ring.getBoundingClientRect();
          createRingParticles(
            rect.left + rect.width/2,
            rect.top + rect.height/2
          );
          resolve({ type: "player", answer: ring.dataset.syllable });
          cleanup(); // <--- Limpiar DESPUÉS de resolver
        }
      };

      stopTimer = timers.startCountdown( // <--- Asignar el timer aquí
        10,
        remaining => updateCounter(".mainCounter", remaining),
        () => {
          if (!answered) {
            answered = true;
            resolve({ type: "timeout" });
            cleanup(); // <--- Limpiar DESPUÉS de resolver
          }
        }
      );

      container.addEventListener("click", clickHandler);
    });
    

    console.log("Resultado de la respuesta: ", result);
    
    // Fase 4: Procesar respuesta
    await processPlayerResponse(result);

    // Fase 5: Verificar continuación
    if (await checkTurn() && !gameState.isGameOver) {
      setTimeout(() => startTurn(), 1500);
    }
  } catch (error) {
    console.error("Error en startTurn:", error);
  }
}