import { runPhase } from "./phaseManager.js";
import { levelsConfig } from "./levelsConfig.js";
import { gameState } from "./gameState.js";
import { getHero } from "./hero.js";
import { getEnemy } from "./enemy.js";
import { captCharElem } from "./utilsFunc.js";


// Ejecuta todas las fases de un nivel.
export async function runLevel(levelNumber) {
  //console.log(`⚙️ [runLevel()] %cin%c [levelManager.js]`, "color:cyan;", "");

  //Muestra animacion de careo
  //console.log(`☎️ [enemyHeroCareoAnimation()] %cfrom%c [animations.js]`, "color:tomato;", "");
  await levelsConfig[levelNumber].careoAnimation();
  
  gameState.characters.hero.instance = getHero();                 // Crea instancia héroe
  gameState.characters.enemy.instance = getEnemy();               // Crea instancia enemigo
  //console.log('🦸‍♂️ 🦹🏼‍♂️ Instancias Héroe/Enemigo inicializadas');

  const hero = gameState.characters.hero;                         // Variables acortadas héroe
  const enemy = gameState.characters.enemy;                       // Variables acortadas enemigo
  //console.log(hero);
  //console.log(enemy);

  hero.element = captCharElem('.heroArena');                      // Captura elemento héroe
  enemy.element = captCharElem('.enemyArena');                    // Captura elemento enemigo
  //console.log('🦸‍♂️ 🦹🏼‍♂️ Elementos Héroe/Enemigo capturados');

  const heroName = document.querySelector('.heroName');            // Captura elemento nombre héroe
  const enemyName = document.querySelector('.enemyName');           // Captura elemento nombre enemigo
  heroName.classList.remove('hidden');
  enemyName.classList.remove('hidden');
  heroName.classList.add('fade-in', 'block');
  enemyName.classList.add('fade-in', 'block');
  

  heroName.textContent = hero.instance.name;                       // Añade el nombre del héroe
  enemyName.textContent = enemy.instance.name;                     // Añade el nombre del enemigo

  hero.element.src = hero.instance.images.original;               // Añade la foto del héroe
  enemy.element.src = enemy.instance.images.original;             // Añade la foto del enemigo



  // Guarda el objeto de la configuración del nivel en una variable
  const levelObj = levelsConfig[levelNumber];
  //console.log(levelObj);
  
  gameState.enemyHealth = enemy.instance.health;       // Inicializa salud enemigo
  gameState.heroHealth  = hero.instance.health;        // Inicializa salud héroe

  console.log(`📯 Bienvenido al Nivel: ${levelNumber} Enemigo: ${enemy.instance.name} 📯`);
  
  // Recorre el array de fases del objeto nivel
  for (let i = 0; i < levelObj.phases.length; i++) {
    // Si en cualquier momento el juego terminó, salimos
    if (gameState.isGameOver) {
      console.log(`💀 Salida anticipada de fases porque juego terminó`);
      break;
    }

    // Actualiza el índice de fase en el estado (0 = primera fase)
    //console.log(`🔧 gameState.currentPhase = ${i + 1}`);
    gameState.currentPhase = i;

    // Ejecuta la fase actual
    //console.log(`☎️ [runPhase()] %cfrom%c [gameArena.js]`, "color:tomato;", "");
    await runPhase(levelObj.phases[i]);
  }

  // Tras recorrer todas las fases o terminar por Game Over, determinamos el ganador de nivel o terminar por Game Over, determinamos el ganador de nivel
  if (gameState.enemyHealth <= 0) {
    gameState.winner = 'hero';
    console.log(`🏆 Nivel ${levelNumber} completado por el héroe`);
  } else if (gameState.heroHealth <= 0) {
    gameState.winner = 'enemy';
    console.log(`☠️ Nivel ${levelNumber} perdido por el héroe`);
  }
}

