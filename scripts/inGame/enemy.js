import { enemiesConfig } from './enemiesConfig.js';
import { performAttackAnimation } from './animations.js';
import { gameState } from './gameState.js';
import { updateHealthBar } from './ui.js';

export function getEnemy() {
  // Selecciona enemigo segun el nivel
  const enemyConfig = enemiesConfig[gameState.currentLevel];
  return {
    type: enemyConfig.type,
    name: enemyConfig.name,
    attackPower: enemyConfig.attackPower,
    maxHealth: enemyConfig.maxHealth,
    health: enemyConfig.health,
    images: enemyConfig.images,
    sounds: enemyConfig.sounds,
    cssClasses: enemyConfig.cssClasses,
    animations: enemyConfig.animations,

    async attack() {
      try {
        await performAttackAnimation('enemy', gameState.characters);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('❌ Error en: gameState.characters.enemy.instance.attack()', error);
        throw error;
      }
    },

    takeDamage(damage) {
      const currentHealth = gameState.characters.enemy.instance.health;
      const newHealth = Math.max(0, currentHealth - damage);
      gameState.characters.enemy.instance.health = newHealth;
      console.log(`❤️ Enemigo: ${newHealth}`);
      const healthPercentage = (newHealth / gameState.characters.enemy.instance.maxHealth) * 100;
      updateHealthBar('.enemyBarFill', healthPercentage);
    }
  };
};