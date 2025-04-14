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