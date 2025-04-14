Estoy desarrollando un juego para mi hijo de 4 años usando html, vanilla css y vanilla JavaScritp sin frameworks, usando buenas practicas y las ultimas funcionalidades añadidas de  javaScript y pensando sobre todo en la escalabilidad y modularidad.

//gameArenaL1.html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GAME ARENA</title>
  <link rel="stylesheet" href="/styles/gameArena.css">
  <link rel="icon" href="/favicon.ico" type="image/x-icon">
  <script type="module" src="/scripts/gameArena.js"></script>
</head>
<body class="fade-in">
  <header class="playersInfo">
		<section class="heroInfo">
			<div class="heroBar">
        <div class="heroBarFill"></div>
      </div>
			<p class="heroName">SHADOW</p>
    </section>
    <div class="mainCounter"></div>
		<section class="enemyInfo">
			<div class="enemyBar">
        <div class="enemyBarFill"></div>
      </div>
			<p class="enemyName">DR. EGGMAN</p>
    </sectio>
  </header>
  <div class="getReadyCounter"></div>
  <main class="mainContent">
		<section class="gameArena">
			<img class="heroArena" src="/assets/img/shadow2.webp"></img>
			<img class="enemyArena" src="/assets/img/eggman.webp"></img>
		</section>
	</main>
  <footer>
  	<section class="ringsContainer"></section>
  </footer>
</body>
</html>

//gameArena.css
/* ---------------------------------- VARIABLES GLOBALES -------------------------------------- */
:root {
  --background-color: hsl(0, 0%, 0%);         /* Negro */
  --footer-background: hsl(0, 0%, 10%);         /* Negro muy oscuro */
  --footer-text-color: hsl(0, 0%, 100%);        /* Blanco */
}
/* ----------------------------------------- HTML --------------------------------------------- */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: var(--background-color);
  color: white;
}
/* ----------------------------------------- BODY --------------------------------------------- */
body {
  background-image: url('/assets/img/woodLandscape.webp');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  
  display: flex;
  flex-direction: column;
}
/* ----------------------------------------- MAIN --------------------------------------------- */
.mainContent{
  block-size: 100%;
}
/* ---------------------------------------- HEADER -------------------------------------------- */
.playersInfo{
  display: flex;
  justify-content: space-between;

  .heroInfo{
    inline-size: 45%;
    padding: 0.8em;
    margin: 0;

    /* Barra de vida del Héroe */
    .heroBar {
      block-size: 1.5em;
      background-color: hsl(0, 0%, 0%);
      border-radius: 10px;
      overflow: hidden;
      border: 2px solid white;
      box-shadow: 1px 1px 3px black;
      margin-block-end: 1em;
    }
    /* Relleno barra vida del Héroe */
    .heroBarFill {
      inline-size: 100%;
      block-size: 100%;
      background-color: hsl(120, 100%, 50%);
      transition: inline-size 0.5s ease;
    }

    .heroName{
      padding: 0;
      margin: 0;
      font-size: 1.2rem;
      font-weight: 800;
      color: black;
      filter: drop-shadow(0 0 3px white);
    }
  }


  .enemyInfo{
    inline-size: 45%;
    padding: 0.8em;
    margin: 0;
  
    /* Barra de vida del Enemigo */
    .enemyBar {
      margin-block-end: 1em;
      block-size: 1.5em;
      background-color: hsl(0, 0%, 30%);
      border-radius: 10px;
      overflow: hidden;
      border: 2px solid white;
      box-shadow: 1px 1px 3px black;
    }
    /* Relleno barra vida del Enemigo */
    .enemyBarFill {
      inline-size: 100%;
      block-size: 100%;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      background: linear-gradient(to right, #ff0000 0%, #cc0000 100%);
    }

    .enemyName{
      padding: 0;
      margin: 0;
      text-align: end;
      font-size: 1.2rem;
      font-weight: 800;
      color: black;
      filter: drop-shadow(0 0 3px red);
    }
  }
}
.mainCounter{
  padding: 0;
  margin-block: 0;
  margin-inline: auto;
  font-size: 5rem;
  font-weight: 800;
  color: red;
  filter: drop-shadow(1px 1px 3px black);
}

/* ----------------------------------------- ARENA -------------------------------------------- */
.gameArena {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  block-size: 100%;
  padding-inline: 5%;
  z-index: 1;
}
.heroArena {
  position: absolute;
  left: 5%;
  bottom: 22%;
  /*animation: glowHero alternate 1s infinite;*/
  will-change: filter;
  transform: translateZ(0);
}
.enemyArena {
  position: absolute;
  right: 5%;
  bottom: 22%;
  /* animation: glowEnemy alternate 1s infinite; */
  will-change: filter;
  transform: translateZ(0);
}
.enamy-take-damage {
  animation: damage-flash-enemy 0.3s ease 2;
}
.hero-take-damage {
  animation: damage-flash-hero 0.3s ease 2;
}
/* --------------------------------------- FOOTER -------------------------------------------- */
footer {
  padding: 0.5em;
  block-size: 12vh;
  background-color: var(--footer-background);
  

  
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  
  padding: 1rem;
  text-align: center;
  z-index: 10;
  
  .ringsContainer{
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    img{
      max-inline-size: 100%;
      inline-size: 90%;
    }

    .ring{
      cursor: pointer;
    }
  }
}
.ringsContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease-in-out;
}
.ringsContainer.visible {
  opacity: 1;
  pointer-events: auto;
}
.ringsContainer.hidden {
  opacity: 0;
  pointer-events: none;
}
.ring-clicked {
  transform: scale(0.92);
  opacity: 0.8;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
.ring:hover {
  filter: brightness(1.1);
  transform: scale(1.02);
}
.ring-particles {
  position: fixed; /* Cambiado de absolute a fixed */
  transform: translate(-50%, -50%); /* Centrar perfectamente */
  width: 60px; /* Tamaño aumentado para mejor visibilidad */
  height: 60px;
  background: radial-gradient(circle, 
    rgba(255, 215, 0, 0.9) 20%, 
    rgba(255, 165, 0, 0.7) 50%,
    transparent 80%
  );
  animation: particle-fade 0.8s ease-out;
  pointer-events: none;
  z-index: 1000; /* Asegurar que aparezca sobre todo */
}
.ring-particles {
  background: radial-gradient(circle, 
  rgba(255, 215, 0, 0.9) 15%, 
  rgba(255, 165, 0, 0.3) 40%,
  transparent 65%
);
mix-blend-mode: screen; /* Mejor integración con el fondo */
}
/* -----------------------------------------TRANSITIONS ---------------------------------------- */
.fade-out {
  animation: fadeOut 1s ease-out both;
}
.fade-in {
  animation: fadeIn 1s ease-in both;
}
/* ------------------------------------ ANIMACIONES ------------------------------------------- */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
@keyframes glowHero {
  0% {
  }
  50% {
    filter: drop-shadow(0 0 0.5em white);
  }
  100% {
    filter: drop-shadow(0 0 1em white);
  }
  50% {
    filter: drop-shadow(0 0 0.5em white);
  }
  0% {
  }
}
@keyframes glowEnemy {
  0% {
  }
  50% {
    filter: drop-shadow(0 0 0.5em red);
  }
  100% {
    filter: drop-shadow(0 0 1em red);
  }
  50% {
    filter: drop-shadow(0 0 0.5em red);
  }
  0% {
  }
}
@keyframes damage-flash-enemy {
  0% { 
    filter: brightness(100%);
    transform: translate(0, 0) rotate(0deg);
  }
  30% {
    transform: translate(4px, -2px) rotate(2deg); 
    }
  50% {
    transform: translate(-3px, 1px) rotate(-1deg);
    filter: brightness(150%); 
    }
  75% {
    transform: translate(-2px, 0) rotate(0deg); 
    }
  100% {
    transform: translate(0, 0) rotate(0deg);
    filter: brightness(100%); 
    }
}
@keyframes damage-flash-hero {
  0% { 
    filter: brightness(100%);
    transform: translate(0, 0) rotate(0deg);
  }
  30% {
    transform: translate(-4px, 2px) rotate(-2deg); 
    }
  50% {
    transform: translate(3px, -1px) rotate(1deg);
    filter: brightness(150%); 
    }
  75% {
    transform: translate(2px, 0) rotate(0deg); 
    }
  100% {
    transform: translate(0, 0) rotate(0deg);
    filter: brightness(100%); 
    }
}
@keyframes particle-fade {
  0% { 
    transform: scale(0) translate(-50%, -50%);
    opacity: 1;
    filter: blur(0);
  }
  90% {
    opacity: 0.2;
    filter: blur(2px);
  }
  100% { 
    transform: scale(2) translate(-50%, -50%);
    opacity: 0;
    filter: blur(4px);
  }
}


//gameArena.js
import { startGameFlow } from "./inGame/gameFlow.js";
import { renderRings, hideRings } from './inGame/ui.js';
import { gameState } from './inGame/gameState.js';

document.addEventListener('DOMContentLoaded', () => {
  // Usamos una función async auto-ejecutable para poder usar await
  (async () => {
    //console.log("✅ DOM Cargado!");

    // Llamada a la funcion que renderiza los anillos
    try {
      // Renderizado de anillos y ocultacion automatica
      const resultadoRenderRings = await renderRings('.ringsContainer', gameState.soundSequence);
      //console.log(resultadoRenderRings);

    } catch (error) {
      console.error("❌ Error fatal al renderizar anillos iniciales:", error);
      return;
    }

    // Inicia el flujo del juego DESPUÉS de renderizar los anillos
    console.log("🚀 Iniciando el juego...");
    startGameFlow();

  })();
});

//gameFlow.js
import { gameState } from "./gameState.js";
import * as phases from "./phases.js";
import * as timers from "./timers.js"

//Inicia el flujo general del juego
export async function startGameFlow() {
  gameState.isGameActive = true;
  // Añadir getReadyCountdown aquí
  await timers.getReadyCountdown();
  phases.currentPhase();
}

//phases.js
import * as rounds from "./rounds.js";

export function currentPhase() {
  // Inicio de ejecucion de la fase
  //console.log("⚙️ currentPahse() en phases.js");

  // Llama a la función de inicio de ronda
  //console.log("☎️ currentRound() desde phases.js");
  rounds.currentRound();
}


//rounds.js
import * as animations from "./animations.js";
import * as timers from "./timers.js";
import { playSound } from "./soundManager.js";
import { gameState } from "./gameState.js";
import * as turnManager from "./turnManager.js";


export async function currentRound(){
  //console.log("⚙️ currentRound() en rounds.js");
  
  try {
    // Llama a la animacion del careo entre enemigo y héroe
    //console.log("☎️ enemyHeroCareoAnimation() desde rounds.js");
    //const resultadoAnimation = await animations.enemyHeroCareoAnimation();
    //console.log(resultadoAnimation);
    
  // Llama la música de fondo del nivel
  //console.log("☎️ playSound(musicLevel1) desde phases.js");
  playSound(`musicLevel${[gameState.currentLevel]}`);
  
  // Llama la animación de Idle del héroe y del enemigo
  //console.log("☎️ heroIdleAnimation() desde rounds.js");
  //animations.heroIdleAnimation();
  //console.log("☎️ enemyIdleAnimation() desde rounds.js");
  //animations.enemyIdleAnimation();
  
  // Llama al manager de turnos
  //console.log("☎️ startTurn() desde rounds.js");
    turnManager.startTurn();


  } catch (error) {
    //console.error("Error en currentRound:", error);
    
  }

}


//turnManager.js
import { showRings, hideRings, updateCounter } from "./ui.js";
import { gameState } from "./gameState.js";
import { playSound } from "./soundManager.js";
import { ringClickAnimation, createRingParticles } from "./animations.js";
import * as timers from "./timers.js";
import { enemy } from "./enemy.js";
import { hero } from "./player.js";

// Función para manejar el turno del enemigo
async function enemyTurn() {
  try {
    console.log("⚙️ enemyTurn() en turnManager.js");
    gameState.currentSoundSyllable = gameState.soundSequence[gameState.currentSoundIndex];
    gameState.correctAnswer = gameState.currentSoundSyllable;
    
    const resultadoPlaySound = await playSound(gameState.currentSoundSyllable.toLowerCase());
    console.log(resultadoPlaySound);
    return "✅ enemyTurn() completado";
  } catch (error) {
    console.error("Error en enemyTurn:", error);
    throw error;
  }
}

// Función para evaluar la respuesta del jugador y actualizar el estado
async function processPlayerResponse(result) {
  if (result.type === "player") {
    gameState.playerAnswer = result.answer;
    if (gameState.playerAnswer === gameState.correctAnswer) {
      console.log("✅ Correcto!");
      await hideRings();
      gameState.correctAnswers++;
      gameState.currentSoundIndex++;
      playSound("correct");
      setTimeout(() => hero.attack(), 500);
    } else {
      console.log("❌ Incorrecto!");
      gameState.incorrectAnswers++;
      gameState.currentSoundIndex++;
      playSound("incorrect");
      setTimeout(() => enemy.attack(), 500);
    }
  } else {
    console.log("⌛ Se agotó el tiempo");
    gameState.incorrectAnswers++;
    gameState.currentSoundIndex++;
    playSound("incorrect");
    setTimeout(() => enemy.attack(), 500);
  }
  await new Promise(res => setTimeout(res, 2500));
}

// Función para verificar condiciones de GameOver
async function checkTurn() {
  if (gameState.enemyHealth <= 0 || gameState.heroHealth <= 0) {
    console.log("☠️ " + (gameState.enemyHealth <= 0 ? "Enemy" : "Hero") + " defeated!");
    gameState.isGameOver = true;
    console.log("💀 GAME OVER!");
    return false;
  }
  return true;
}

// Función que inicia el turno del combate (CORE ACTUALIZADO)
export async function startTurn() {
  console.log(`currentSoundIndex: ${gameState.currentSoundIndex}`);

  if (gameState.currentSoundIndex >= gameState.soundSequence.length) {
    console.log(`---------- Fin Ronda ${gameState.currentRound} -----------`);
    gameState.currentSoundIndex = 0;
    if (++gameState.currentRound === 4) {
      console.log("Fin de las rondas");
      gameState.currentRound = 1;
      return;
    }
  }

  try {
    // Fase 1: Turno del enemigo
    const resultadoEnemyTurn = await enemyTurn();
    console.log(resultadoEnemyTurn);

    // Fase 2: Mostrar anillos
    await showRings(".ringsContainer");
    
    // Fase 3: Temporizador integrado con detección de clics
    const result = await new Promise((resolve) => {
      let answered = false;
      const container = document.querySelector(".ringsContainer");
      let stopTimer = null; // <--- Variable para controlar el timer

      const cleanup = () => {
        container.removeEventListener("click", clickHandler);
        if (stopTimer) stopTimer(); // <--- Detener timer solo si existe
      };

      const clickHandler = (event) => {
        const ring = event.target.closest(".ring");
        if (ring && !answered) {
          answered = true;
          playSound("ringFx");
          ringClickAnimation(ring);
          const rect = ring.getBoundingClientRect();
          createRingParticles(
            rect.left + rect.width/2,
            rect.top + rect.height/2
          );
          resolve({ type: "player", answer: ring.dataset.syllable });
          cleanup(); // <--- Limpiar DESPUÉS de resolver
        }
      };

      stopTimer = timers.startCountdown( // <--- Asignar el timer aquí
        10,
        remaining => updateCounter(".mainCounter", remaining),
        () => {
          if (!answered) {
            answered = true;
            resolve({ type: "timeout" });
            cleanup(); // <--- Limpiar DESPUÉS de resolver
          }
        }
      );

      container.addEventListener("click", clickHandler);
    });
    

    console.log("Resultado de la respuesta: ", result);
    
    // Fase 4: Procesar respuesta
    await processPlayerResponse(result);

    // Fase 5: Verificar continuación
    if (await checkTurn() && !gameState.isGameOver) {
      setTimeout(() => startTurn(), 1500);
    }
  } catch (error) {
    console.error("Error en startTurn:", error);
  }
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

      resolve('✅ renderRings() completado');
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


//gameState.js
export const gameState = {
  currentLevel: 1,
  currentPhase: 1,
  currentRound: 1,
  currentTurn: 0,

  firstCounter: 15,
  secondCounter: 10,

  getReadyCounter: 3,
  
  heroMaxHealth: 100,
  heroHealth: 100,

  enemyMaxHealth: 100,
  enemyHealth: 100,
  
  musicLevel: ["level1", "level2", "level3", "level4", "level5"],
  soundSequence: ["BA", "BE", "BI", "BO", "BU"],
  currentSoundIndex: 0,
  currentSoundSyllable: "",

  correctAnswer: null,
  playerAnswer: null,
  
  correctAnswers: 0,
  incorrectAnswers: 0,
  allCorrectAnswersInRound: false,
  
  isGameOver: false,
  isGamePaused: false,
  isPlayerTurnActive: false,
};


//soundManager.js
// Diccionario que asocia el nombre de cada sonido con su ruta.
const soundPaths = {
  musicLevel1: "/assets/sounds/musicLevel1.mp3",
  countdown: "/assets/sounds/countdown.mp3",
  ringFx: "/assets/sounds/ringFx.mp3",
  ba: "/assets/sounds/ba.mp3",
  be: "/assets/sounds/be.mp3",
  bi: "/assets/sounds/bi.mp3",
  bo: "/assets/sounds/bo.mp3",
  bu: "/assets/sounds/bu.mp3",
  correct: "/assets/sounds/correct.mp3",
  incorrect: "/assets/sounds/incorrect.mp3",
  enemyAttack: "/assets/sounds/enemyAttack.mp3",
  heroAttack: "/assets/sounds/heroAttack.mp3",
  enemyDeath: "/assets/sounds/enemyDeath.mp3",
  heroDeath: "/assets/sounds/heroDeath.mp3",
  heroVictory: "/assets/sounds/heroVictory.mp3",
  enemyVictory: "/assets/sounds/enemyVictory.mp3",
  heroTakeDamage: "/assets/sounds/heroTakeDamage.mp3",
  enemyTakeDamage: "/assets/sounds/enemyTakeDamage.mp3",
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
        resolve(`✅ playSound(${soundName}) completado`);
      })
      .catch((error) => {
        console.error(`❌ Error al reproducir el sonido: ${error}`);
        reject(error);
      });
  });

}


//animations.js

// Animaciones careo para el héroe y el enemigo.
export function enemyHeroCareoAnimation(duracion = 5000) {
  return new Promise((resolve) => {
    //console.log("⚙️ enemyHeroCareoAnimation() en animations.js");
    setTimeout(() => {
      resolve('✅ enemyHeroCareoAnimation() completado');
    }, duracion);
  });
}

export function enemyIdleAnimation() {
  console.log("⚙️ enemyIdleAnimation() en animations.js");
}

export function enemyTalkAnimation() {
  console.log(`Enemy talk animation triggered`);
  // Ejemplo: document.querySelector('.enemyArena').classList.add('enemy-talk');
}

export function enemyAttackAnimation() {
  //console.log(`⚙️ enemyAttackAnimation() en animations.js`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('✅ enemyAttackAnimation() completado');
    }, 1000);
  });
}

export function enemyTakeDamageAnimation() {
  const enemy = document.querySelector('.enemyArena');
  enemy.classList.add('enamy-take-damage');
  setTimeout(() => enemy.classList.remove('enamy-take-damage'), 300);
  console.log('✅ enemyTakeDamageAnimation() completado');
}

export function enemyDeathAnimation() {
  console.log(`Enemy death animation triggered`);
  // Ejemplo: document.querySelector('.enemyArena').classList.add('enemy-death');
}

export function enemyVictoryAnimation() {
  console.log(`Enemy victory animation triggered`);
  // Ejemplo: document.querySelector('.enemyArena').classList.add('enemy-victory');
}

export function heroIdleAnimation() {
  console.log("⚙️ heroIdleAnimation() en animations.js");
}

export function heroAttackAnimation() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('✅ heroAttackAnimation() completado');
    }, 1000);
  });
}

export function heroTakeDamageAnimation() {
  return new Promise((resolve) => {
    const hero = document.querySelector('.heroArena');
    hero.classList.add('hero-take-damage');
    setTimeout(() => hero.classList.remove('hero-take-damage'), 300);
    resolve('✅ heroTakeDamageAnimation() completado');
  })
}

export function heroVictoryAnimation() {
  console.log(`Hero victory animation triggered`);
  // Ejemplo: document.querySelector('.heroArena').classList.add('hero-victory');
}

export function heroDeathAnimation() {
  console.log(`Hero death animation triggered`);
  // Ejemplo: document.querySelector('.heroArena').classList.add('hero-death');
}


export function ringClickAnimation(ringElement) {
  ringElement.classList.add('ring-clicked');
  setTimeout(() => {
    ringElement.classList.remove('ring-clicked');
  }, 150);
}

export function createRingParticles(x, y) {
  const particles = document.createElement('div');
  particles.className = 'ring-particles';
  particles.style.left = `${x}px`;
  particles.style.top = `${y}px`;
  document.body.appendChild(particles);
  
  setTimeout(() => particles.remove(), 1000);
}


//timers.js
import { enemy } from "./enemy.js";
import { updateCounter } from "./ui.js";

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


//enemy.js
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

  // Funcion que ejecuta el ataque del enemigo
  async attack() {
    console.log(`⚙️ enemy.attack(${this.attackPower})`);
    try {
      //console.log(`☎️ playSound(enemyAttack) desde enemy.js`);
      const resultadoPlaySound = await playSound("enemyAttack");
      console.log(resultadoPlaySound);

      //console.log(`☎️ enemyAttackAnimation() desde enemy.js`);
      const resultadoEnemyAttackAnimation = await animations.enemyAttackAnimation();
      console.log(resultadoEnemyAttackAnimation);

      //console.log(`☎️ hero.takeDamage(${this.attackPower}) desde enemy.js`);
      hero.takeDamage(this.attackPower);

      // Async function resuelve automáticamente la promesa al retornar
      return '✅ enemy.attack() completado';

    } catch (error) {
      console.error("❌ Error en enemy.attack:", error);
      // Async function rechaza automáticamente la promesa si se lanza un error
      throw error; // Relanzar el error para que quien llamó a attack se entere
    }
  },

  // Funcion de recibir daño
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


//player.js
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

  // Funcion que ejecuta el ataque del enemigo
  async attack() {
    console.log(`⚙️ hero.attack(${this.attackPower})`);
    try {
      //console.log(`☎️ playSound(heroAttack) desde hero.js`);
      const resultadoPlaySound = await playSound("heroAttack");
      console.log(resultadoPlaySound);

      //console.log(`☎️ heroAttackAnimation() desde hero.js`);
      const resultadoHeroAttackAnimation = await animations.heroAttackAnimation();
      console.log(resultadoHeroAttackAnimation);

      //console.log(`☎️ hero.takeDamage(${this.attackPower}) desde hero.js`);
      enemy.takeDamage(this.attackPower);

      // Mensaje de promesa resuelta
      return '✅ hero.attack() completado';

    } catch (error) {
      console.error("❌ Error en hero.attack:", error);
      throw error;
    }
  },

  // Funcion de recibir daño
  async takeDamage(damage) {
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



La funcionalidad que quiero implantar es que cuando se llame a heroAttackAnimation()  (por ejemplo), se cambie la imagen del heroe (shadow2.webp) en <img class="heroArena" src="/assets/img/shadow2.webp"></img> por una nueva shadow3.webp, desplazarlo hacia la derecha hasta tocar al enemigo, cambiar la imagen a shadow4.webp (haciendo como que le da un puñetazo) volver a cambiar a shadow2.webp volver a la posicion inicial, y volver a cambiar la imagen a shadow2.webp.

Primero, dime la estrategia a seguir sin codigo, y hacer una lista de pasos. Después si te doy el ok, me das el codigo para implantarlo.