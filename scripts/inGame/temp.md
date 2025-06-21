//gameArena.js
import { runGame } from './inGame/gameFlow.js';
import { gameState } from './inGame/gameState.js';
import { getHero } from './inGame/hero.js';
import { getEnemy } from './inGame/enemy.js';
import { preloadAllImages, captCharElem } from './inGame/utilsFunc.js';

//Presentacion de la pantalla de juego
document.addEventListener('DOMContentLoaded', async () => {
  console.log('✅ DOM Cargado!');

  // Pre-cargar todas las imágenes
  await preloadAllImages();
  console.log('📸 Precarga de imágenes completada');
  
  // Crea instancias de héroe y enemigo
  gameState.characters.hero.instance = getHero();                 // Crea instancia héroe
  gameState.characters.enemy.instance = getEnemy();               // Crea instancia enemigo
  console.log('🦸‍♂️ 🦹🏼‍♂️ Instancias Héroe/Enemigo inicializadas');

  const hero = gameState.characters.hero;                         // Variables acortadas héroe
  const enemy = gameState.characters.enemy;                       // Variables acortadas enemigo  

  hero.element = captCharElem('.heroArena');                      // Captura elemento héroe
  enemy.element = captCharElem('.enemyArena');                    // Captura elemento enemigo
  console.log('🦸‍♂️ 🦹🏼‍♂️ Elementos Héroe/Enemigo capturados');

  // Inicia el flujo del juego
  console.log('🚀 Iniciando el juego...');
  runGame();
});

//gameState.js
import { levelsConfig } from './levelsConfig.js';

export const gameState = {
  currentLevel: 1,
  currentPhase: 0,
  currentRound: 0,
  currentTurn: 0,

  // Salud
  heroHealth: levelsConfig[1].enemy.initialHealth,
  enemyHealth: levelsConfig[1].enemy.initialHealth,

  // Contadores
  countdowns: { getReady: 3, answer: 15 },

  // Estadísticas de respuestas
  answers: {
    correct: 0,
    incorrect: 0
  },

  isGameOver: false,
  isGameActive: false,
  isAnimating: false,

  config: levelsConfig,

  characters: {
    hero: { instance: null, element: null },
    enemy: { instance: null, element: null }
  }
};

//levelsConfig.js
export const levelsConfig = {
  1: {
    enemy: {
      name: 'Dr. Eggman',
      consonant: 'B',
      maxHealth: 100,
      initialHealth: 100,
      attackPower: 10,
      animations: {
        death: [
          '/assets/img/enemyDeath01.webp',
          '/assets/img/enemyDeath02.webp',
          '/assets/img/enemyDeath03.webp',
          '/assets/img/enemyDeath04.webp',
          '/assets/img/enemyDeath05.webp',
          '/assets/img/enemyDeath06.webp',
          '/assets/img/enemyDeath07.webp'
        ],
      }
    },
    phases: [
      {
        type: 'letter',           // Fase 1: Reconocer consonante + vocal
        intro: 'Tienes que elegir las letras que yo digo',
        roundsRequired: 1,
        minDamagePercent: 30,
        turns: [
          { prompt: ['B', 'A'], expected: 'BA' },
          { prompt: ['B', 'E'], expected: 'BE' },
          { prompt: ['B', 'I'], expected: 'BI' },
          { prompt: ['B', 'O'], expected: 'BO' },
          { prompt: ['B', 'U'], expected: 'BU' }
        ]
      },
      {
        type: 'syllable',         // Fase 2: Reconocer la sílaba que dice
        intro: 'Tienes que elegir la sílaba que yo digo',
        roundsRequired: 1,
        minDamagePercent: 60,
        turns: [
          { prompt: 'BA', expected: 'BA' },
          { prompt: 'BE', expected: 'BE' },
          { prompt: 'BI', expected: 'BI' },
          { prompt: 'BO', expected: 'BO' },
          { prompt: 'BU', expected: 'BU' }
        ]
      },
      {
        type: 'semantic',         // Fase 3: Animal/cosa que empieza con la sílaba
        intro: 'Tienes que elegir la sílaba por la que empieza el animal/cosa que yo digo',
        roundsRequired: Infinity,
        minDamagePercent: 100,
        turns: [
          { word: 'Ballena', image: '/assets/img/ballena.png', expected: 'BA' },
          { word: 'Beso',   image: '/assets/img/beso.png',   expected: 'BE' },
          { word: 'Bicicleta', image: '/assets/img/bicicleta.png', expected: 'BI' },
          { word: 'Bota',    image: '/assets/img/bota.png',    expected: 'BO' },
          { word: 'Burro',   image: '/assets/img/burro.png',   expected: 'BU' }
        ]
      }
    ],
    heroRewards: {
      onVictory: {
        healthBonus: 20,
        newAttack: 'spinKick'
      }
    }
  }
};

//gameFlow.js
import { runLevel } from "./levelManager.js";
import { getReadyCountdown } from "./timers.js";
import { gameState } from "./gameState.js";
import { applyHeroRewards, showGameOverScreen } from "./gameUtils.js";

/**
 * Orquesta el flujo de niveles completo.
 */
export async function runGame() {
  gameState.isGameActive = true;
  await getReadyCountdown();

  while (!gameState.isGameOver) {
    await runLevel(gameState.currentLevel);
    if (!gameState.isGameOver) {
      applyHeroRewards(gameState.currentLevel);
      gameState.currentLevel++;
      await getReadyCountdown();
    }
  }

  showGameOverScreen(gameState.winner);
}

//levelManager.js
import { runPhase } from "./phaseManager.js";
import { levelsConfig } from "./levelsConfig.js";
import { gameState } from "./gameState.js";

/**
 * Ejecuta todas las fases de un nivel.
 */
export async function runLevel(levelNumber) {
  const level = levelsConfig[levelNumber];
  // Reiniciar estado de salud
  gameState.enemyHealth = level.enemy.initialHealth;
  gameState.heroHealth  = level.enemy.initialHealth;
  gameState.currentPhase = i;

  for (let i = 0; i < level.phases.length && !gameState.isGameOver; i++) {
    gameState.currentPhaseIndex = i;
    await runPhase(level.phases[i]);
  }

  // Determinar ganador de nivel
  if (gameState.enemyHealth <= 0) gameState.winner = 'hero';
  else if (gameState.heroHealth <= 0) gameState.winner = 'enemy';
}

//phaseManager.js
import { runRound } from "./roundManager.js";
import { enemyDamagedPercent, playEnemyIntro } from "./gameUtils.js";
import { gameState } from "./gameState.js";

/**
 * Ejecuta las rondas en una fase hasta cumplir condiciones.
 */
export async function runPhase(phaseConfig) {
  // Primero mostramos la introducción de la fase
  await playEnemyIntro(phaseConfig.intro);

  // Reinicia el contador de rondas locales
  gameState.currentRound = 0;

  do {
    // actualiza el estado global
    gameState.currentRound++;
    // ejecuta una ronda completa
    await runRound(phaseConfig);
  } while (
    !gameState.isGameOver &&
    enemyDamagedPercent() < phaseConfig.minDamagePercent &&
    gameState.currentRound < phaseConfig.roundsRequired
  );
}


//roundManager.js
import { gameState } from "./gameState.js";
import { startTurn } from "./turnManager.js";

/**
 * Ejecuta todos los turnos definidos en la fase.
 */
export async function runRound(phaseConfig) {
  // Inicializa índice de turno
  gameState.currentRound = 0;

  // Recorre cada configuración de turno
  for (const turnConfig of phaseConfig.turns) {
    if (gameState.isGameOver) break;

    gameState.currentRound++;
    // Delegamos todo el flujo de un turno a turnManager.js
    await startTurn(turnConfig, phaseConfig.type);
  }
}

//turnManager.js
import { gameState } from "./gameState.js";
import { playSound, playFxSound } from "./soundManager.js";
import { showRings, hideRings, updateCounter } from "./ui.js";
import { ringClickAnimation, createRingParticles } from "./animations.js";
import { startAnswerCountdown } from "./timers.js";
import { performAttackAnimation, enemyDeathAnimation, heroDeathAnimation } from "./animations.js";
import { updateHealthBar } from "./ui.js";

/**
 * Ejecuta la lógica completa de un turno:
 * 1) El enemigo presenta el prompt (sonido o imagen).
 * 2) Se muestran anillos y se inicia el temporizador.
 * 3) Se espera la respuesta del jugador.
 * 4) Se ejecutan las animaciones de ataque y daño.
 * 5) Se verifica y gestiona Game Over.
 */
export async function startTurn(turnConfig, phaseType) {
  // Incrementa contador de turnos global antes de comenzar
  gameState.currentTurn++;

  // 1) Enemigo dicta el prompt
  if (phaseType === 'semantic') {
    await playSound(turnConfig.word.toLowerCase());
  } else if (Array.isArray(turnConfig.prompt)) {
    for (const p of turnConfig.prompt) {
      await playSound(p.toLowerCase());
    }
  } else {
    await playSound(turnConfig.prompt.toLowerCase());
  }

  // 2) Mostrar anillos y arrancar temporizador
  await showRings('.ringsContainer');
  let answered = false;
  let stopTimer;

  const result = await new Promise(resolve => {
    const clickHandler = event => {
      if (answered) return;
      const ring = event.target.closest('.ring');
      if (!ring) return;
      answered = true;
      const answer = ring.dataset.syllable;
      playFxSound('ringFx');
      ringClickAnimation(ring);
      const rect = ring.getBoundingClientRect();
      createRingParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
      cleanup();
      resolve({ type: 'player', answer });
    };

    const cleanup = () => {
      document.querySelector('.ringsContainer').removeEventListener('click', clickHandler);
      if (stopTimer) stopTimer();
    };

    document.querySelector('.ringsContainer').addEventListener('click', clickHandler);

    stopTimer = startAnswerCountdown(
      gameState.countdowns.answer,
      remaining => updateCounter('.mainCounter', remaining),
      () => {
        if (!answered) {
          answered = true;
          cleanup();
          resolve({ type: 'timeout' });
        }
      }
    );
  });

  // 3) Ocultar anillos
  await hideRings();

  // 4) Animaciones de ataque y aplicar daño
  const isCorrect = result.type === 'player' && result.answer === turnConfig.expected;

  if (isCorrect) {
    gameState.answers.correct++;
    await performAttackAnimation('hero', gameState.characters);
    gameState.enemyHealth = Math.max(0, gameState.enemyHealth - gameState.characters.hero.instance.attackPower);
    updateHealthBar('.enemyBarFill',
      (gameState.enemyHealth / gameState.config[gameState.currentLevel].enemy.initialHealth) * 100
    );
  } else {
    gameState.answers.incorrect++;
    await performAttackAnimation('enemy', gameState.characters);
    gameState.heroHealth = Math.max(0, gameState.heroHealth - gameState.characters.enemy.instance.attackPower);
    updateHealthBar('.heroBarFill',
      (gameState.heroHealth / gameState.config[gameState.currentLevel].enemy.initialHealth) * 100
    );
  }

  // 5) Verificar Game Over
  if (gameState.enemyHealth <= 0) {
    await enemyDeathAnimation();
    gameState.isGameOver = true;
    gameState.winner = 'hero';
  } else if (gameState.heroHealth <= 0) {
    await heroDeathAnimation();
    gameState.isGameOver = true;
    gameState.winner = 'enemy';
  }
}

//gameUtils.js
import { levelsConfig } from "./levelsConfig.js";
import { gameState } from "./gameState.js";

/**
 * Devuelve el porcentaje de daño al enemigo en el nivel actual.
 */
export function enemyDamagedPercent() {
  const level = levelsConfig[gameState.currentLevel];
  const initial = level.enemy.initialHealth;
  return ((initial - gameState.enemyHealth) / initial) * 100;
}

/**
 * Muestra la introducción hablada por el enemigo.
 */
export async function playEnemyIntro(text) {
  // reproduce animación + texto + voz
  console.log(`Intro enemigo: ${text}`);
  // await animación o temporizador
}

/**
 * Aplica recompensas al héroe tras victoria de nivel.
 */
export function applyHeroRewards(levelNumber) {
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

//timers.js
let countdownTimerId = null;

// Cuenta regresiva de 3 segundos antes de iniciar la ronda
export function getReadyCountdown() {
  return new Promise((resolve) => {
    let count = 3;
    const interval = setInterval(() => {
      console.log(count > 0 ? count : "GO!");
      if (count <= 0) {
        clearInterval(interval);
        resolve();
      }
      count--;
    }, 1000);
  });
}

// Tiempo de respuesta para el jugador
export function startCountdown(duration, onTick, onComplete) {
  let current = duration;
  let countdownTimerId = null;

  const stop = () => {
    if (countdownTimerId) {
      clearInterval(countdownTimerId);
      countdownTimerId = null;
    }
  };

  onTick(current); // Primer tick inmediato
  
  countdownTimerId = setInterval(() => {
    current--;
    onTick(current);
    
    if (current <= 0) {
      stop();
      onComplete?.();
    }
  }, 1000);

  return stop;
}

//Detiene la cuenta regresiva actual.
export function stopCountdown() {}

//utilsFunc.js
// Funcion toma posicion del personaje
export function getCharacterPosition(characterElement) {
  characterElement.offsetWidth; // Forzar reflow (solo necesario en casos específicos)
  return characterElement.getBoundingClientRect(); // Retorna el rect
}

// Funcion para capturar el elemento del héroe o enemigo
export function captCharElem(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    console.error(`Elemento no encontrado: ${selector}`);
    return;
  }
  return element;
}

// Precarga las imagenes del heroe
export const preloadHeroImages = () => {
  const images = [
    '/assets/img/shadow2.webp',
    '/assets/img/shadow3.webp',
    '/assets/img/shadow4.webp',
    '/assets/img/shadow5.webp'
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

// Espera a que termine una animación o transición en un elemento.
export function waitForEvent(element, eventName) {
  return new Promise(resolve => {
    element.addEventListener(eventName, () => resolve(), { once: true });
  });
}

//animations.js
import { characterFxSound } from "./soundManager.js";
import { heroesConfig } from './heroesConfig.js';
import { enemiesConfig } from './enemiesConfig.js';
import { gameState } from './gameState.js';
import { waitForEvent } from "./utilsFunc.js";


// Pre-cargar todas las imágenes ANTES de cualquier operación
export async function preloadAllImages() {
  const currentLevel = gameState.currentLevel;
  const heroImages = Object.values(heroesConfig[currentLevel].images);
  const enemyImages = Object.values(enemiesConfig[currentLevel].images);
  const allImages = [...new Set([...heroImages, ...enemyImages])];

  return Promise.all(
    allImages.map(src => {
      return new Promise(resolve => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = () => {
          console.warn(`No se pudo cargar la imagen: ${src}`);
          resolve();
        };
      });
    })
  );
}

export function enemyIdleAnimation() {
  const enemyImg = document.querySelector('.enemyArena');
  enemyImg.classList.add('enemy-idle');
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
  const attackerObj = charactersObj[attackerType];
  const defenderObj = attackerType === 'hero' ? charactersObj.enemy : charactersObj.hero;
  const attackerInstance = attackerObj.instance;
  const attackerElement = attackerObj.element;

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
  await waitForEvent(attackerElement, 'transitionend');

  // 3. Regreso
  setImage(attackerElement, attackerInstance.images.return);
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

function setImage(element, src) {
  element.src = src;
}

//ui.js
// Renderiza los anillos en el contenedor especificado
export function renderRings(containerSelector, rings) {
  return new Promise((resolve, reject) => {
    //console.log('⚙️ renderRings() en ui.js');
    try {
      const container = document.querySelector(containerSelector);
      container.classList.remove('visible');
      container.classList.add('hidden');

      // Limpia el contenedor antes de renderizar
      container.innerHTML = "";

      // Renderiza los anillos
      rings.forEach(ring => {
        const ringDiv = document.createElement("div");
        ringDiv.classList.add("ring");
        ringDiv.dataset.syllable = ring;
        const img = document.createElement("img");
        img.src = `/assets/img/ring${ring}.webp`;
        img.alt = `Ring ${ring}`;
        ringDiv.append(img);
        container.append(ringDiv);
      });

      resolve('🖌️ Rings renderizados!');
    } catch (error) {
      reject(error);
    }
  }
  );
}

// Muestra el contenedor de anillos
export function showRings() {
  return new Promise((resolve, reject) => {
    //console.log('⚙️ showRings() en ui.js');
    try {
      const container = document.querySelector('.ringsContainer');
      container.classList.remove('hidden');
      container.classList.add('visible');
      resolve('✅ showRings() completado');
    } catch (error) {
      reject(error);
    }
  }
  );

}

// Oculta el contenedor de anillos
export function hideRings() {
  return new Promise((resolve, reject) => {
    try {
      const container = document.querySelector('.ringsContainer');
      container.classList.remove('visible');
      container.classList.add('hidden');
      resolve('✅ hideRings() completado');
    } catch (error) {
      reject(error);
    }
  })

}

// Añade Listener a los anillos
export function addRingListeners(containerSelector, callback) {
  const container = document.querySelector(containerSelector);
  container.addEventListener("click", event => {

    const ringDiv = event.target.closest(".ring");
    if (ringDiv) {
      const syllable = ringDiv.dataset.syllable;
      console.log(`Ring clicked: ${syllable}`);
      if (typeof callback === "function") {
        callback(syllable);
      }
    }
  });
}

// Actualiza el contador de la UI
export function updateCounter(counterSelector, timeLeft) {
  const counterElement = document.querySelector(counterSelector);
  
  if (counterElement) {
    const clampedTime = Math.max(0, timeLeft);
    counterElement.textContent = clampedTime;
    // Opcional: agregar una transición o efecto para resaltar el cambio
    counterElement.style.transition = "all 0.5s ease";
    counterElement.style.opacity = "0.8";
    setTimeout(() => {
      counterElement.style.opacity = "1";
    }, 100);
    console.log(`Counter updated: ${clampedTime}`);
  } else {
    console.error(`No se encontró el elemento con el selector ${counterSelector}`);
  }
}

// Actualiza una barra de vida (o cualquier barra) cambiando su ancho.
export function updateHealthBar(selector, percentage) {
  const barElement = document.querySelector(selector);
  barElement.style.width = `${percentage}%`;
  console.log(`Health bar updated: ${percentage}%`);
}

// Muestra un mensaje temporal en pantalla
export function displayMessage(message, duration = 2000) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.textContent = message;
  document.body.append(messageDiv);
  setTimeout(() => {
    messageDiv.remove();
  }, duration);
  console.log(`Message displayed: ${message}`);
}

//soundManager.js
// Diccionario que asocia el nombre de cada sonido con su ruta.
const soundPaths = {
  musicLevel1: '/assets/sounds/musicLevel1.mp3',
  countdown: '/assets/sounds/countdown.mp3',
  ringFx: '/assets/sounds/ringFx.mp3',
  ba: '/assets/sounds/ba.mp3',
  be: '/assets/sounds/be.mp3',
  bi: '/assets/sounds/bi.mp3',
  bo: '/assets/sounds/bo.mp3',
  bu: '/assets/sounds/bu.mp3',
  correct: '/assets/sounds/correct.mp3',
  enemyPain: '/assets/sounds/enemyPain.mp3',
  crash: '/assets/sounds/crash.mp3',
  slide: '/assets/sounds/slide.mp3',
  engine: '/assets/sounds/engine.mp3',
  explosion: '/assets/sounds/explosion.mp3',
  screamPain: '/assets/sounds/screamPain.mp3',
  incorrect: '/assets/sounds/incorrect.mp3',
  enemyAttack: '/assets/sounds/enemyAttack.mp3',
  heroAttack: '/assets/sounds/heroAttack.mp3',
  enemyDeath: '/assets/sounds/enemyDeath1.mp3',
  heroDeath: '/assets/sounds/heroDeath.mp3',
  heroVictory: '/assets/sounds/heroVictory.mp3',
  enemyVictory: '/assets/sounds/enemyVictory.mp3',
  heroTakeDamage: '/assets/sounds/heroTakeDamage.mp3',
  enemyTakeDamage: '/assets/sounds/enemyTakeDamage.mp3',
  heroMovement1: '/assets/sounds/heroMovement1.mp3',
  heroImpact1: '/assets/sounds/heroImpact1.mp3',
  heroPain1: '/assets/sounds/heroPain1.mp3',
  enemyMovement1: '/assets/sounds/enemyMovement1.mp3',
  enemyImpact1: '/assets/sounds/enemyImpact1.mp3',
  enemyPain1: '/assets/sounds/enemyPain1.mp3'
};

// Reproduce el sonido especificado
export function playSound(soundName) {
  return new Promise((resolve, reject) => {
    const soundPath = soundPaths[soundName];
    if (!soundPath) {
      console.error(`❌ Sonido no encontrado: ${soundName}`);
      reject(new Error(`Sonido no encontrado: ${soundName}`));
      return;
    }

    const audio = new Audio(soundPath);
    audio.play()
      .then(() => {
        console.log(`🎵 Reproduciendo: ${soundName}`);
        resolve(`🏁 playSound(${soundName}) completado`);
      })
      .catch(error => {
        console.error(`❌ Error al reproducir el sonido: ${error}`);
        reject(error);
      });
  });
}

// Reproduce el sonido especificado sin esperar
export function playFxSound(soundName) {
  const soundPath = soundPaths[soundName];
  if (!soundPath) {
    console.error(`❌ Sonido no encontrado: ${soundName}`);
    return; // Simplemente retorna sin intentar reproducir
  }

  const audio = new Audio(soundPath);
  audio.play().catch(error => {
    console.error(`❌ Error al reproducir el sonido: ${soundName}`, error);
  });
  console.log(`🎵 Reproduciendo: ${soundName}`);
}

export function characterFxSound(sound, characterInstance) {
  const fxPath = characterInstance.sounds[sound];
  const audio = new Audio(fxPath);
  audio.play();
  console.log(`🎵 Character Fx: ${sound}`);
}

//heroesConfig.js
export const heroesConfig = {
  1: {
    type: 'hero',
    name: 'Shadow',
    attackPower: 10,
    maxHealth: 100,
    health: 100,
    images: {
      original: '/assets/img/heroOrigin1.webp',
      forward: '/assets/img/heroForward1.webp',
      impact: '/assets/img/heroImpact1.webp',
      comeback: '/assets/img/heroReturn1.webp'
    },
    sounds: {
      movement: '/assets/sounds/heroMovement1.mp3',
      impact: '/assets/sounds/heroImpact1.mp3',
      pain: '/assets/sounds/heroPain1.mp3'
    },
    cssClasses: {
      forward: 'hero-attack-move',
      impact: 'hero-impact-frame',
      comeback: 'hero-attack-return',
      idle: 'hero-idle',
      damage: 'hero-take-damage'
    }
  }
};

//hero.js
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

//enemiesConfig.js
export const enemiesConfig = {
  1: {
    type: 'enemy',
    name: 'Dr. Eggman',
    attackPower: 10,
    maxHealth: 100,
    health: 100,
    images: {
      original: '/assets/img/enemyOrigin1.webp',
      forward: '/assets/img/enemyForward1.webp',
      impact: '/assets/img/enemyImpact1.webp',
      return: '/assets/img/enemyReturn1.webp'
    },
    sounds: {
      movement: '/assets/sounds/enemyMovement1.mp3',
      impact: '/assets/sounds/enemyImpact1.mp3',
      pain: '/assets/sounds/enemyPain1.mp3',
      death: '/assets/sounds/enemyDeath1.mp3',
      deathb: '/assets/sounds/enemyDeath1b.mp3',
    },
    cssClasses: {
      forward: 'enemy-attack-move',
      impact: 'enemy-impact-frame',
      comeback: 'enemy-attack-return',
      idle: 'enemy-idle',
      damage: 'enemy-take-damage'
    },
    animations: {
      death: {
        step1: '/assets/img/enemyDeath01.webp',
        step2: '/assets/img/enemyDeath02.webp',
        step3: '/assets/img/enemyDeath03.webp',
        step4: '/assets/img/enemyDeath04.webp',
        step5: '/assets/img/enemyDeath05.webp',
        step6: '/assets/img/enemyDeath06.webp',
        step7: '/assets/img/enemyDeath07.webp',
      }
    }
  }
};

//enemy.js
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
    maxHealth: enemyConfig.maxHealth,
    health: enemyConfig.health,
    attackPower: enemyConfig.attackPower,
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