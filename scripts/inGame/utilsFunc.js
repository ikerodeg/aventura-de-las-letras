import { gameState } from './gameState.js';
import { heroesConfig } from './heroesConfig.js';
import { enemiesConfig } from './enemiesConfig.js';
import { playFxSound, characterFxSound, playSound } from './soundManager.js';

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

export async function letterPhaseHandler(turnConfig) {
  console.warn('📯 Fase "letter" 📯');
  console.log(`Prompt letras: ${turnConfig.prompt}`);

  //Reproduce el audio de las letras
  //console.log(`☎️ [playSound()] %cfrom%c [utilsFunc.js]`, "color:tomato;", "");
  await playSound(turnConfig.sound);
}

export async function syllablePhaseHandler(turnConfig) {
  console.warn('📯 Fase "syllable" 📯');
  console.log(`Prompt sílabas: ${turnConfig.prompt}`);

  //Reproduce el audio de las sílabas
  //console.log(`☎️ [playSound()] %cfrom%c [utilsFunc.js]`, "color:tomato;", "");
  await playSound(turnConfig.sound);
}