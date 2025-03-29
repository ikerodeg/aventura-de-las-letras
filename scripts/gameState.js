// Exportacion del estado global del juego.
export const gameState = {
  //ronda actual del juego
  currentRound: 1,      
  
  //Secuencia de sonidos que el enemigo reproducirá.
  soundSequence: ['BA', 'BE', 'BI', 'BO', 'BU'],
  
  //ndice del sonido actual que se está reproduciendo.
  currentSoundIndex: 0,
  
  //iempo límite para responder en la ronda actual.
  timeLimit: 10
};
