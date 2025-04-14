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
        resolve(`🏁 playSound(${soundName}) completado`);
      })
      .catch((error) => {
        console.error(`❌ Error al reproducir el sonido: ${error}`);
        reject(error);
      });
  });

}
