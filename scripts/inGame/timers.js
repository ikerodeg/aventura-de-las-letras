let countdownTimerId = null;

// Cuenta regresiva de 3 segundos antes de iniciar la ronda
export function getReadyCountdown() {
  console.log(`⚙️ [getReadyCountdown()] %cin%c [timers.js]`, "color: cyan;", "");
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
export function startAnswerCountdown(duration, onTick, onComplete) {
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