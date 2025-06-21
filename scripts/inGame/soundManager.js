// Diccionario que asocia el nombre de cada sonido con su ruta.
export const soundPaths = {
  fx: {
    ringFx: "/assets/sounds/fxRings/ringFx.mp3",
    countdown: "/assets/sounds/countDown/countDown.mp3",
  },
  answers: {
    correct: "/assets/sounds/answersHandler/correct.mp3",
    incorrect: "/assets/sounds/answersHandler/incorrect.mp3",
  },
  1: {
    musicLevel: "/assets/sounds/musicLevel/musicLevel1.mp3",
    letterPhase: {
      intro: "/assets/sounds/phases/letterPhase/intro_letter_phase1.mp3",
      ba: "/assets/sounds/phases/letterPhase/b_a.mp3",
      be: "/assets/sounds/phases/letterPhase/b_e.mp3",
      bi: "/assets/sounds/phases/letterPhase/b_i.mp3",
      bo: "/assets/sounds/phases/letterPhase/b_o.mp3",
      bu: "/assets/sounds/phases/letterPhase/b_u.mp3",
    },
    syllablePhase: {
      intro: "/assets/sounds/phases/syllablePhase/intro_syllable_phase2.mp3",
      ba: "/assets/sounds/phases/syllablePhase/ba.mp3",
      be: "/assets/sounds/phases/syllablePhase/be.mp3",
      bi: "/assets/sounds/phases/syllablePhase/bi.mp3",
      bo: "/assets/sounds/phases/syllablePhase/bo.mp3",
      bu: "/assets/sounds/phases/syllablePhase/bu.mp3",
    },
  },
};

// Reproduce el sonido especificado y resuelve cuando termine
export function playSound(soundPath) {
  return new Promise((resolve, reject) => {
    if (!soundPath) {
      console.error(`❌ Sonido no encontrado: ${soundPath}`);
      reject(new Error(`Sonido no encontrado: ${soundPath}`));
      return;
    }

    const audio = new Audio(soundPath);
    
    // Resuelve cuando el audio termine de reproducirse
    audio.addEventListener('ended', () => {
      //console.log(`✅ Audio terminado: ${soundPath}`);
      resolve(`🏁 playSound(${soundPath}) completado`);
    }, { once: true });
    
    // Maneja errores
    audio.addEventListener('error', (error) => {
      console.error(`❌ Error al reproducir el sonido: ${soundPath}`, error);
      reject(error);
    }, { once: true });
    
    // Inicia la reproducción
    audio.play().catch(error => {
      console.error(`❌ Error al iniciar reproducción: ${soundPath}`, error);
      reject(error);
    });
    
    console.log(`🎵 Reproduciendo: ${soundPath}`);
  });
}

// Reproduce el sonido especificado sin esperar
function getSoundPathFromString(pathString) {
  return pathString.split('.').reduce((obj, key) => obj && obj[key], soundPaths);
}

export function playFxSound(pathString) {
  const soundPath = getSoundPathFromString(pathString);
  if (!soundPath) {
    console.error(`❌ Sonido no encontrado: ${pathString}`);
    return;
  }
  const audio = new Audio(soundPath);
  audio.play().catch(error => {
    console.error(`❌ Error al reproducir el sonido: ${pathString}`, error);
  });
  console.log(`🎵 Reproduciendo: ${pathString}`);
}

export function characterFxSound(sound, characterInstance) {
  const fxPath = characterInstance.sounds[sound];
  const audio = new Audio(fxPath);
  audio.play();
  console.log(`🎵 Character Fx: ${sound}`);
}