import { playFxSound, characterFxSound } from "./soundManager.js";
import { gameState } from './gameState.js';
import { getHero } from "./hero.js"
import { getEnemy } from './enemy.js';
import { waitForEvent } from "./utilsFunc.js";




// Animaciones careo para el héroe y el enemigo.
export function enemyHeroCareoAnimation(duracion = 1000) {
  return new Promise((resolve) => {
    //console.log(`⚙️ [enemyHeroCareoAnimation()] %cin%c [animations.js]`, "color:cyan;", "");
    //Hace una pantalla en negro con las caras de los personajes como en Street Fighter
    setTimeout(() => {
      resolve('🏁 enemyHeroCareoAnimation() completado');
    }, duracion);
  });
}

export function enemyIdleAnimation() {
  const enemyImg = document.querySelector('.enemyArena');
  enemyImg.classList.add('enemy-idle');
}

export function enemyTalkAnimation() {
  console.log(`Enemy talk animation triggered`);
  // Ejemplo: document.querySelector('.enemyArena').classList.add('enemy-talk');
}

export async function enemyTakeDamageAnimation(charactersObj) {
  // Asigna a variable el elemento enemy
  const enemyElement = charactersObj.enemy.element;

  // Asigna a variable la instancia del enemigo
  const enemy = charactersObj.enemy.instance;
  
  // Destructura variables css de la instancia
  const { forward, impact, comeback, idle, damage } = enemy.cssClasses;

  if (!enemyElement) {
    console.error('❌ Elemento .enemyArena no encontrado');
    return;
  }
  
  // Limpiar cualquier estilo o animación conflictiva
  enemyElement.style.animation = '';
  enemyElement.style.transform = '';
  enemyElement.classList.remove(idle, damage, forward, comeback, impact);
  
  
  enemyElement.offsetWidth;                                    // Forzar reflow    
  enemyElement.classList.add(damage);                           // Aplicar animación de daño
  await new Promise(resolve => {                                    // Espera a que termine movimiento  
    enemyElement.addEventListener('animationend', resolve, { once: true });
  });
  enemyElement.classList.remove(damage);                        // Eliminar clase de daño
  enemyElement.classList.add(idle);                             // Añadir clase idle

  charactersObj.enemy.instance.takeDamage(charactersObj.hero.instance.attackPower); // Ejecuta metodo
}

export async function enemyDeathAnimation() {
  const enemyElement = gameState.characters.enemy.element;
  const enemyDeathAnimation = gameState.characters.enemy.instance.animations.death;
  setImage(enemyElement, enemyDeathAnimation.step1);
  await new Promise(resolve => setTimeout(resolve, 1000));
  characterFxSound('death', gameState.characters.enemy.instance);
  setImage(enemyElement, enemyDeathAnimation.step2);
  await new Promise(resolve => setTimeout(resolve, 1000));
  setImage(enemyElement, enemyDeathAnimation.step3);
  await new Promise(resolve => setTimeout(resolve, 1000));
  setImage(enemyElement, enemyDeathAnimation.step4);
  await new Promise(resolve => setTimeout(resolve, 1000));
  setImage(enemyElement, enemyDeathAnimation.step5);
  characterFxSound('impact', gameState.characters.enemy.instance);
  await new Promise(resolve => setTimeout(resolve, 1000));
  setImage(enemyElement, enemyDeathAnimation.step6);
  await new Promise(resolve => setTimeout(resolve, 1000));
  characterFxSound('deathb', gameState.characters.enemy.instance);
  setImage(enemyElement, enemyDeathAnimation.step7);
  await new Promise(resolve => setTimeout(resolve, 1000));
  enemyElement.className = 'enemyArena';
  console.log(`Enemy death animation triggered`);
}

export function enemyVictoryAnimation() {
  console.log(`Enemy victory animation triggered`);
  // Ejemplo: document.querySelector('.enemyArena').classList.add('enemy-victory');
}

export function heroIdleAnimation() {
  const heroImg = document.querySelector('.heroArena');
  heroImg.classList.add('hero-idle');
}

export async function heroTakeDamageAnimation(charactersObj) {
  // Asigna a variable el elemento heroe
  const heroElement = charactersObj.hero.element;

  // Asigna a variable la instancia del heroe
  const hero = charactersObj.hero.instance;

  // Destructura variables css de la instancia
  const { forward, impact, comeback, idle, damage } = hero.cssClasses;
  
  if (!heroElement) {
    console.error('❌ Elemento .heroArena no encontrado');
    return;
  }
  
  // Limpiar cualquier estilo o animación conflictiva
  heroElement.style.animation = '';
  heroElement.style.transform = '';
  heroElement.classList.remove(idle, damage, forward, comeback, impact);
  
  heroElement.offsetWidth;                                     // Forzar reflow    
  heroElement.classList.add(damage);                            // Aplicar animación de daño
  await new Promise(resolve => {                                    // Espera a que termine movimiento  
    heroElement.addEventListener('animationend', resolve, { once: true });
  });
  heroElement.classList.remove(damage);                         // Eliminar clase de daño
  heroElement.classList.add(idle);                              // Añadir clase idle
  
  charactersObj.hero.instance.takeDamage(charactersObj.enemy.instance.attackPower); // Ejecuta metodo de heroe
}

export function heroVictoryAnimation() {
  console.log(`Hero victory animation triggered`);
  // Ejemplo: document.querySelector('.heroArena').classList.add('hero-victory');
}

export async function heroDeathAnimation() {
  console.log(`Hero death animation triggered`);
  
  // Ejemplo: document.querySelector('.heroArena').classList.add('hero-death');
}

// Animacion al pulsar en un anillo
export function ringClickAnimation(ringElement) {
  ringElement.classList.add('ring-clicked');
  setTimeout(() => {
    ringElement.classList.remove('ring-clicked');
  }, 150);
}

// Funcion que crea efecto particulas
export function createRingParticles(x, y) {
  const particles = document.createElement('div');
  particles.className = 'ring-particles';
  particles.style.left = `${x}px`;
  particles.style.top = `${y}px`;
  document.body.appendChild(particles);
  
  setTimeout(() => particles.remove(), 1000);
}

// Precarga las imagenes del heroe
export const preloadEnemyImages = () => {
  const images = [
    '/assets/img/eggman.webp',
    '/assets/img/eggman2.webp',
    '/assets/img/eggman4.webp',
    '/assets/img/explosion.webp'
  ];
  
  return Promise.all(
    images.map(src => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve; // No bloquear si hay error
      });
    })
  );
};

export async function performAttackAnimation(attackerType, charactersObj) {
  console.log(`⚙️ [performAttackAnimation()] %cin%c [animations.js]`, "color:cyan;", "");
  const attackerObj = charactersObj[attackerType];
  const defenderObj = attackerType === 'hero' ? charactersObj.enemy : charactersObj.hero;
  const attackerInstance = attackerObj.instance;
  const attackerElement = attackerObj.element;
  const defenderInstance = defenderObj.instance;

  // Calculo dinamico de la distancia entre los personajes
  const attackerRect = attackerElement.getBoundingClientRect();
  const defenderRect = defenderObj.element.getBoundingClientRect();
  const deltaX = attackerType === 'hero'
      ? (defenderRect.left - attackerRect.left) - 100
      : (defenderRect.left - attackerRect.left) + 150;
  attackerElement.style.setProperty('--deltaX', `${deltaX}px`);
  
  // 1. Movimiento hacia el contrario
  attackerElement.classList.remove(attackerInstance.cssClasses.idle);
  attackerElement.style.transform = '';
  attackerElement.offsetWidth; // Forzar reflow
  setImage(attackerElement, attackerInstance.images.forward);
  characterFxSound('movement', attackerInstance);
  attackerElement.classList.add(attackerInstance.cssClasses.forward);
  await waitForEvent(attackerElement, 'animationend');

  // 2. Impacto
  setImage(attackerElement, attackerInstance.images.impact);
  attackerElement.classList.add(attackerInstance.cssClasses.impact);
  const defenderTakeDamage = attackerType === 'hero'
    ? enemyTakeDamageAnimation
    : heroTakeDamageAnimation;
  defenderTakeDamage(charactersObj);
  characterFxSound('impact', attackerInstance);
  characterFxSound('pain', defenderInstance);
  await waitForEvent(attackerElement, 'transitionend');

  // 3. Regreso
  setImage(attackerElement, attackerInstance.images.comeback);
  attackerElement.classList.remove(attackerInstance.cssClasses.impact);
  attackerElement.classList.add(attackerInstance.cssClasses.comeback);
  characterFxSound('movement', attackerInstance);
  await waitForEvent(attackerElement, 'animationend');

  // 4. Reestablecer estado inicial
  attackerElement.classList.remove(attackerInstance.cssClasses.comeback, attackerInstance.cssClasses.forward);
  setImage(attackerElement, attackerInstance.images.original);
  attackerElement.style.transform = '';
  attackerElement.classList.add(attackerInstance.cssClasses.idle);
  await new Promise(resolve => setTimeout(resolve, 1000));
}

// Animación para cuando se completa una fase
export async function phaseCompletedAnimation(duration = 2000) {
  console.log(`⚙️ [phaseCompletedAnimation()] %cin%c [animations.js]`, "color:cyan;", "");
  return new Promise((resolve) => {
    // Aquí iría la lógica de la animación visual
    console.log('🎉 Animación de Fase Completada Iniciada...');
    setTimeout(() => {
      console.log('🏁 Animación de Fase Completada Finalizada.');
      resolve('Phase animation completed');
    }, duration);
  });
}

function setImage(element, src) {
  element.src = src;
}