// Clase Enemy con métodos comunes para todos los enemigos
export class Enemy {
  constructor(name, health, level) {
    this.name = name;
    this.health = health;
    this.level = level;
    this.state = "idle"; // Estados posibles: 'idle', 'charging', 'attacking'
  }

  // Reproducir sonido del enemigo
  playSound(sound) {
    console.log(`${this.name} reproduce el sonido: ${sound}`);
  
    // Verificar si estamos en el navegador antes de usar Audio
    if (typeof window !== "undefined") {
      const audio = new Audio(`/sounds/${sound}.mp4`);
      audio.play().catch((err) => console.error("Error al reproducir sonido:", err));
    } else {
      console.warn("❌ Audio no disponible en este entorno.");
    }
  }
  

  // Recibir daño y verificar si ha sido derrotado
  takeDamage(damage) {
    this.health -= damage;
    console.log(`${this.name} recibe ${damage} de daño. Vida restante: ${this.health}`);

    if (this.health <= 0) {
      console.log(`${this.name} ha sido derrotado.`);
      gameOver("enemy");
    }
  }

  // Atacar al jugador
  attack(target) {
    const damage = this.calculateDamage();
    console.log(`${this.name} ataca causando ${damage} de daño.`);
    target.takeDamage(damage);
  }

  // Calcular el daño del enemigo según su nivel
  calculateDamage() {
    return this.level * 10; // Aumenta el daño según el nivel
  }
}

// Lista de enemigos predefinidos por nivel
export const enemies = [
  new Enemy("Dr. EggMan", 100, 1), // Nivel 1
  new Enemy("Silver", 120, 2),     // Nivel 2
  // Agrega más enemigos aquí según sea necesario...
];
