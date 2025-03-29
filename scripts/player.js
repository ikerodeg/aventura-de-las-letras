// Exportación del objeto 'player'
export const player = {
  health: 100,  //vida base del jugador
  name: "",   //nombre del jugador
  
  attack(target) {    //Método de ataque con el enemigo como parámetro
    const damage = calculatePlayerDamage();   //Puntos de daño
    target.takeDamage(damage);                //Aplica el daño calculado al enemigo
    //Muestra en consola el resultado del ataque
    console.log(`${name} ataca y causa ${damage} puntos de daño.`);  
  },
  
  takeDamage(damage) {        //Método de daño recibido
    this.health -= damage;    //Se resta el daño recibido a 'health'
    //Muestra en consola la vida restante del jugador.
    console.log(`${name} recibe ${damage} puntos de daño. Vida restante: ${this.health}`);
    //Si health = 0 o es menor, se llama 'gameOver()'
    if (this.health <= 0) {
      //Se llamará desde el módulo principal
      gameOver("player");
    }
  }
};

// Función interna para calcular el daño del jugador.
// Por ahora, 10. Más adelante se podrá ampliar esta lógica.
function calculatePlayerDamage() {
  return 10;
}