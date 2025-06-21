import { levelsConfig } from './levelsConfig.js';
import { gameState } from './gameState.js';

// Renderiza los anillos en el contenedor especificado
export function renderRings(containerSelector, rings) {
  return new Promise((resolve, reject) => {
    console.warn('⚙️ renderRings() en ui.js');
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
        img.src = `/assets/img/rings/ring.webp`;
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

export function renderLetterRings() {
  return new Promise((resolve, reject) => {
    //console.log('⚙️ [letterRings()] %cin%c [ui.js]', "color:cyan;", "");
    try{

      //Guardamos el objeto del nivel actual
      const ringsArray = levelsConfig[gameState.currentLevel].phases[gameState.currentPhase].rings;
      console.log(`Rings renderizados: ${ringsArray}`);
      
     //Capturmos el footer
     const footer = document.querySelector('footer');
     //Capturamos el contenedor donde irán los anillos
     const container = document.querySelector('.ringsContainer');

     //Ocultamos el footer
     //footer.classList.remove('visible');
     //footer.classList.add('hidden');
     
     //Vaciamos el contenedor
     container.innerHTML = "";
    
     //Añadimos los anillos
     ringsArray.forEach(ring => {
      //Mostramos la letra del anillo actual
      //console.log(`Ring ${ring} renderizado!`);
    
      const ringDiv = document.createElement("div");
      ringDiv.classList.add("ring");
      ringDiv.dataset.syllable = ring;
    
    
      const img = document.createElement("img");
      img.src = `/assets/img/rings/ring.webp`;
      img.alt = `Ring ${ring}`;
    
      const span = document.createElement("span");
      span.innerText = ring;
    
      ringDiv.append(span);
      ringDiv.append(img);
      container.append(ringDiv);
     });

     resolve('✅ letterRings() completado');
    }catch(error){
      reject(error);
    }
  }
  );
 
}

export function renderSyllableRings() {
  return new Promise((resolve, reject) => {
    //console.log('⚙️ [letterRings()] %cin%c [ui.js]', "color:cyan;", "");
    try{

      //Guardamos el objeto del nivel actual
      const ringsArray = levelsConfig[gameState.currentLevel].phases[gameState.currentPhase].rings;
      console.log(`Rings renderizados: ${ringsArray}`);
      
     //Capturmos el footer
     const footer = document.querySelector('footer');
     //Capturamos el contenedor donde irán los anillos
     const container = document.querySelector('.ringsContainer');

     //Ocultamos el footer
     //footer.classList.remove('visible');
     //footer.classList.add('hidden');
     
     //Vaciamos el contenedor
     container.innerHTML = "";
    
     //Añadimos los anillos
     ringsArray.forEach(ring => {
      //Mostramos la letra del anillo actual
      //console.log(`Ring ${ring} renderizado!`);
    
      const ringDiv = document.createElement("div");
      ringDiv.classList.add("ring");
      ringDiv.dataset.syllable = ring;
    
    
      const img = document.createElement("img");
      img.src = `/assets/img/rings/ring.webp`;
      img.alt = `Ring ${ring}`;
    
      const span = document.createElement("span");
      span.innerText = ring;
    
      ringDiv.append(span);
      ringDiv.append(img);
      container.append(ringDiv);
     });

     resolve('✅ letterRings() completado');
    }catch(error){
      reject(error);
    }
  }
  );
 
}

// Muestra el contenedor de anillos
export function showRings() {
  return new Promise((resolve, reject) => {
    console.log('⚙️ [showRings()] %cin%c [ui.js]', "color:cyan;", "");
    try {
      const container = document.querySelector('.ringsContainer');
      const footer = document.querySelector('footer');
      footer.classList.remove('hidden');
      footer.classList.add('visible');
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
      const container = document.querySelector('footer');
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