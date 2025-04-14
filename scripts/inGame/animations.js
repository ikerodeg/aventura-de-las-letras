


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

export function enemyAttackAnimation() {
  //console.log(`⚙️ enemyAttackAnimation() en animations.js`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('🏁 enemyAttackAnimation() completado');
    }, 1000);
  });
}

export function enemyTakeDamageAnimation() {
  const enemy = document.querySelector('.enemyArena');
  enemy.classList.add('enamy-take-damage');
  setTimeout(() => enemy.classList.remove('enamy-take-damage'), 300);
  console.log('🏁 enemyTakeDamageAnimation() completado');
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
        // 1. Frame inicial de ataque
        await setHeroImage('/assets/img/shadow3.webp');
        
        // 2. Movimiento hacia adelante
        heroImg.classList.add('hero-attack-move');
        heroImg.style.transform = 'translateX(60vw) scale(1.08)';
        await new Promise(r => heroImg.addEventListener('transitionend', r, { once: true }));
        
        // 3. Frame de impacto (si existe)
        await setHeroImage('/assets/img/shadow4.webp');
        heroImg.classList.add('hero-impact-frame');
        await new Promise(r => setTimeout(r, 180));
        
        // 4. Restaurar frame de ataque
        await setHeroImage('/assets/img/shadow3.webp');
        heroImg.classList.remove('hero-impact-frame');
        await new Promise(r => setTimeout(r, 50));
        
        // 5. Regreso a posición
        heroImg.classList.remove('hero-attack-move');
        heroImg.classList.add('hero-attack-return');
        heroImg.style.transform = originalTransform;
        await new Promise(r => heroImg.addEventListener('transitionend', r, { once: true }));
        
        // 6. Reset final
        heroImg.classList.remove('hero-attack-return');
        await setHeroImage('/assets/img/shadow2.webp');
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

// Función auxiliar para cambiar imagen
const setHeroImage = (src) => {
  return new Promise((resolve) => {
    const heroImg = document.querySelector('.heroArena');
    if (heroImg.src.endsWith(src)) return resolve();
    
    heroImg.src = src;
    heroImg.onload = () => resolve();
    heroImg.onerror = resolve; // Continuar aunque falle
  });
};