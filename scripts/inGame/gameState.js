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