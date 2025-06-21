import { levelsConfig } from './levelsConfig.js';

export const gameState = {
  currentLevel: 1,
  currentPhase: 0,
  currentRound: 0,
  currentTurn: 0,

  // Salud  --------- cambiar A DINAMICAMENTE---------------
  heroHealth: null,
  enemyHealth: null,

  // Contadores
  countdowns: { getReady: 3, answer: 3 },

  // Estadísticas de respuestas
  answers: {
    correct: 0,
    incorrect: 0
  },

  isGameOver: false,
  isGameActive: false,

  config: levelsConfig,

  characters: {
    hero: { instance: null, element: null },
    enemy: { instance: null, element: null }
  }
};
