import { playSound } from "./soundManager.js";


// Animaciones careo para el héroe y el enemigo.
export function enemyHeroCareoAnimation(duracion = 5000) {
  return new Promise((resolve) => {
    //console.log("⚙️ enemyHeroCareoAnimation() en animations.js");
    setTimeout(() => {
      resolve('🏁 enemyHeroCareoAnimation() completado');
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

// Animación completa de ataque enemigo
export function enemyAttackAnimation() {
  const enemyImg = document.querySelector('.enemyArena');
  const originalTransform = getComputedStyle(enemyImg).transform;
  const originalPosition = {
    left: enemyImg.style.left,
    bottom: enemyImg.style.bottom
  };

  return new Promise((resolve) => {
    (async () => {
      try {
        // 1. Imagen de avance hacia el héroe
        await setImage('enemy', '/assets/img/eggman2.webp');
        
        // 2. Movimiento hacia el héroe
        enemyImg.classList.add('enemy-attack-move');
        playSound("engine");
        enemyImg.style.transform = 'translateX(-55vw) scale(1.08)';
        await new Promise(resolve => enemyImg.addEventListener('transitionend', resolve, { once: true }));
        
        // 3. Imagen de impacto contra el héroe
        await setImage('enemy', '/assets/img/explosion.webp');
        enemyImg.classList.add('enemy-impact-frame');
        playSound("explosion");
        await new Promise(resolve => setTimeout(resolve, 180));
        
        // 4. Imagen de vuelta a posición
        await setImage('enemy', '/assets/img/eggman4.webp');
        enemyImg.classList.remove('enemy-impact-frame');
        await new Promise(resolve => setTimeout(resolve, 50));
        
        // 5. Movimiento de regreso a posición
        enemyImg.classList.remove('enemy-attack-move');
        enemyImg.classList.add('enemy-attack-return');
        playSound("engine");
        enemyImg.style.transform = originalTransform;
        await new Promise(resolve => enemyImg.addEventListener('transitionend', resolve, { once: true }));
        
        // 6. Reset a posición inicial
        enemyImg.classList.remove('enemy-attack-return');
        await setImage('enemy', '/assets/img/eggman.webp');
        enemyImg.style.left = originalPosition.left;
        enemyImg.style.bottom = originalPosition.bottom;
      } catch (error) {
        console.error('Enemy Animation error:', error);
      } finally {
        resolve(`🏁 enemyAttackAnimation() completado`);
      }
    })();
  });
}

export function enemyTakeDamageAnimation() {
  return new Promise((resolve) => {
    const enemy = document.querySelector('.enemyArena');
    enemy.classList.add('enemy-take-damage');
    setTimeout(() => enemy.classList.remove('enemy-take-damage'), 300);
    resolve('🏁 enemyTakeDamageAnimation() completado');
  })
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

// Animación completa de ataque
export function heroAttackAnimation() {
  const heroImg = document.querySelector('.heroArena');
  const originalTransform = getComputedStyle(heroImg).transform;
  const originalPosition = {
    left: heroImg.style.left,
    bottom: heroImg.style.bottom
  };

  return new Promise((resolve) => {
    (async () => {
      try {
        // 1. Imagen de avance hacia el enemigo
        await setImage('hero', '/assets/img/shadow2.webp');
        
        // 2. Movimiento hacia el enemigo
        heroImg.classList.add('hero-attack-move');
        heroImg.style.transform = 'translateX(60vw) scale(1.08)';
        await new Promise(resolve => heroImg.addEventListener('transitionend', resolve, { once: true }));
        
        // 3. Impacto contra el enemigo
        await setImage('hero', '/assets/img/shadow4.webp');
        heroImg.classList.add('hero-impact-frame');
        await new Promise(resolve => setTimeout(resolve, 180));
        
        // 4. Imagen de vuelta a posición
        await setImage('hero', '/assets/img/shadow3.webp');
        heroImg.classList.remove('hero-impact-frame');
        await new Promise(resolve => setTimeout(resolve, 50));
        
        // 5. Movimiento de regreso a posición
        heroImg.classList.remove('hero-attack-move');
        heroImg.classList.add('hero-attack-return');
        heroImg.style.transform = originalTransform;
        await new Promise(resolve => heroImg.addEventListener('transitionend', resolve, { once: true }));
        
        // 6. Reset a posición inicial
        heroImg.classList.remove('hero-attack-return');
        await setImage('hero', '/assets/img/shadow2.webp');
        heroImg.style.left = originalPosition.left;
        heroImg.style.bottom = originalPosition.bottom;
      } catch (error) {
        console.error('Animation error:', error);
      } finally {
        resolve(`🏁 heroAttackAnimation() completado`);
      }
    })();
  });
}

export function heroTakeDamageAnimation() {
  return new Promise((resolve) => {
    const hero = document.querySelector('.heroArena');
    hero.classList.add('hero-take-damage');
    setTimeout(() => hero.classList.remove('hero-take-damage'), 300);
    resolve('🏁 heroTakeDamageAnimation() completado');
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

// Precarga las imagenes
export const preloadHeroImages = () => {
  const images = [
    '/assets/img/shadow2.webp',
    '/assets/img/shadow3.webp',
    '/assets/img/shadow4.webp'
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

// Función auxiliar para cambiar imagen durante ataque
const setImage = (heroOrEnemy, src) => {
  return new Promise((resolve) => {
    const img = document.querySelector(`.${heroOrEnemy}Arena`);
    if (img.src.endsWith(src)) return resolve();
    
    img.src = src;
    img.onload = () => resolve();
    img.onerror = resolve;
  });
};