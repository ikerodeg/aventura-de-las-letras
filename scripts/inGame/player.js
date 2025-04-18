import { playSound } from "./soundManager.js";
import * as animations from "./animations.js";
import { gameState } from "./gameState.js";
import { enemy } from "./enemy.js"
import { updateHealthBar } from "./ui.js";

export const hero = {
  name: "SHADOW",
  level: 1,
  health: 100,
  attackPower: 10,

  // Método que ataca al enemigo
  async attack() {
    try {
      // Ejecuta sonido de ataque del heroe
      const resultadoPlaySound = await playSound("heroAttack");
      console.log(resultadoPlaySound);

      // EJecutar animación de ataque
      const resultadoEnemyAttackAnimation = await animations.heroAttackAnimation();
      console.log(resultadoEnemyAttackAnimation);
      
      // Ejecutar método takeDamage en Enemy
      enemy.takeDamage(this.attackPower);
      
      // Pequeña pausa para feedback visual
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Async function resuelve automáticamente la promesa al retornar
      return '🏁 hero.attack() completado';

    } catch (error) {
      console.error("Error en hero.attack:", error);
      throw error;
    }
  },

  // Método de recibir daño
  takeDamage(damage) {
    // Reproducir sonido y animación
    playSound("heroTakeDamage");
    animations.heroTakeDamageAnimation();

    // Calculo que actualiza la vida despues del daño
    const currentHealth = gameState.heroHealth;
    const newHealth = Math.max(0, currentHealth - damage);
    gameState.heroHealth = newHealth;
    console.log(`❤️ ${newHealth}`);

    // Calculo de porcentaje de vida restante
    const maxHealth = gameState.heroMaxHealth;
    const healthPercentage = (newHealth / maxHealth) * 100;
    console.log(healthPercentage);
    
    // Actualizar la barra de vida en la UI
    updateHealthBar('.heroBarFill', healthPercentage);
  }
};
