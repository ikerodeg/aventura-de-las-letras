import { heroesConfig } from './heroesConfig.js';
import { performAttackAnimation } from './animations.js';
import { gameState } from './gameState.js';
import { updateHealthBar } from './ui.js';

export function getHero() {
  //esto a cambiar en el futuro, usar localStorage para la seleccion del heroe por ejemplo heroesConfig[nameInLocalStorageSelection]
  const heroConfig = heroesConfig[gameState.currentLevel];
  return {
    type: heroConfig.type,
    name: heroConfig.name,
    maxHealth: heroConfig.maxHealth,
    health: heroConfig.health,
    attackPower: heroConfig.attackPower,
    images: heroConfig.images,
    sounds: heroConfig.sounds,
    cssClasses: heroConfig.cssClasses,

    async attack() {
      try {
        await performAttackAnimation('hero', gameState.characters);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('❌ Error en: gameState.hero.instance.attack()', error);
        throw error;
      }
    },

    takeDamage(damage) {
      const currentHealth = gameState.characters.hero.instance.health;
      const newHealth = Math.max(0, currentHealth - damage);
      gameState.characters.hero.instance.health = newHealth;
      console.log(`❤️ Héroe: ${newHealth}`);
      const healthPercentage = (newHealth / gameState.characters.hero.instance.maxHealth) * 100;
      updateHealthBar('.heroBarFill', healthPercentage);
    }
  };
};