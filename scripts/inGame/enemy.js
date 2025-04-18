import { hero } from "./player.js";
import { playSound } from "./soundManager.js";
import * as animations from "./animations.js";
import { gameState } from "./gameState.js";
import { updateHealthBar } from "./ui.js";

export const enemy = {
  name: "Dr. Eggman",
  level: 1,
  health: gameState.enemyHealth,
  attackPower: 10,

  // Método que ataca al heroe
  async attack() {
    try {
      // Ejecuta sonido de ataque del enemigo
      //const resultadoPlaySound = await playSound("enemyAttack");
      //console.log(resultadoPlaySound);

      // EJecutar animación de ataque
      const resultadoEnemyAttackAnimation = await animations.enemyAttackAnimation();
      console.log(resultadoEnemyAttackAnimation);

      // Ejecutar método takeDamage en Hero
      playSound("screamPain");
      hero.takeDamage(this.attackPower);

      // Pequeña pausa para feedback visual
      await new Promise(resolve => setTimeout(resolve, 200));

      // Async function resuelve automáticamente la promesa al retornar
      return '🏁 enemy.attack() completado';

    } catch (error) {
      console.error("❌ Error en enemy.attack:", error);
      throw error;
    }
  },

  // Método de recibir daño
  takeDamage(damage) {
    // Reproducir sonido y animación
    playSound("enemyTakeDamage");
    animations.enemyTakeDamageAnimation();

    // Calculo que actualiza la vida despues del daño
    const currentHealth = gameState.enemyHealth;
    const newHealth = Math.max(0, currentHealth - damage);
    gameState.enemyHealth = newHealth;
    console.log(`❤️ ${newHealth}`);
    
    // Calculo de porcentaje de vida restante
    const maxHealth = gameState.enemyMaxHealth;
    const healthPercentage = (newHealth / maxHealth) * 100;
    console.log(healthPercentage);
    
    // Actualizar la barra de vida en la UI
    updateHealthBar('.enemyBarFill', healthPercentage);
  }
}