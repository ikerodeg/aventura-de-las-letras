import { levelsConfig } from "./levelsConfig.js";
import { gameState } from "./gameState.js";
import { playSound } from "./soundManager.js";

/**
 * Devuelve el porcentaje de daño al enemigo en el nivel actual.
 */
export function enemyDamagedPercent() {
  console.log(`⚙️ [enemyDamagedPercent()] %cin%c [gameUtils.js]`, "color:cyan;", "");
  const level = levelsConfig[gameState.currentLevel];
  console.log('------------------------------------------------------------------');
  console.log(level);
  const currentEnemyHealth = gameState.characters.enemy.instance.health;
  const maxEnemyHealth = gameState.characters.enemy.instance.maxHealth;
  if (maxEnemyHealth === 0) return 0; // Evitar división por cero si maxHealth es 0
  return ((maxEnemyHealth - currentEnemyHealth) / maxEnemyHealth) * 100;
}

/**
 * Muestra la introducción hablada por el enemigo.
 */

export async function playEnemyIntro(audio) {
  //console.log(`⚙️ [playEnemyIntro()] %cin%c [gameUtils.js]`, "color:cyan;", "");
  // reproduce animación + texto + voz
  console.log(`🎵 Intro enemigo`);
  await playSound(audio); // Reproduce el audio recibido
  // await animación o temporizador (puedes agregar animación aquí si lo deseas)
}

/**
 * Aplica recompensas al héroe tras victoria de nivel.
 */
export function applyHeroRewards(levelNumber) {
  console.log(`⚙️ [applyHeroRewards()] %cin%c [gameUtils.js]`, "color:cyan;", "");
  const rewards = levelsConfig[levelNumber].heroRewards.onVictory;
  gameState.heroHealth = Math.min(
    gameState.heroHealth + rewards.healthBonus,
    levelsConfig[levelNumber].enemy.initialHealth
  );
  // añadir nuevo ataque: por implementar
}

/**
 * Muestra la pantalla de Game Over.
 */
export function showGameOverScreen(winner) {
  console.log(`Game Over. Ganador: ${winner}`);
  // lógica de UI final
}
