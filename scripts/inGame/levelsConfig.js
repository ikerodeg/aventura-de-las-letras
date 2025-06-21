import { gameState } from './gameState.js';
import { soundPaths } from './soundManager.js';
import { enemiesConfig } from './enemiesConfig.js';
import { enemyHeroCareoAnimation } from './animations.js';

export const levelsConfig = {
  1: {
    // Ejecuta la animacion de careo
    careoAnimation: enemyHeroCareoAnimation,
    phases: [
      {
        type: 'letter',           // Fase 1: Reconocer consonante + vocal
        // Audio explicacion de la fase
        introAudio: '/assets/sounds/phases/letterPhase/intro_letter_phase1.mp3',
        // Transcript: "Tienes que elegir las letras que yo digo"
        minRoundsToPlay: 2, // Jugar al menos 2 rondas
        maxRounds: 4,       // Máximo de 4 rondas si no hay perfección
        minDamagePercent: 30, // Se mantiene por si se usa para otra cosa, pero no para pasar fase
        rings: ['B A', 'B E', 'B I', 'B O', 'B U'],
        turns: [
          { prompt: 'B A', sound: soundPaths[1].letterPhase.ba, expected: 'B A' },
          { prompt: 'B E', sound: soundPaths[1].letterPhase.be, expected: 'B E' },
          { prompt: 'B I', sound: soundPaths[1].letterPhase.bi, expected: 'B I' },
          { prompt: 'B O', sound: soundPaths[1].letterPhase.bo, expected: 'B O' },
          { prompt: 'B U', sound: soundPaths[1].letterPhase.bu, expected: 'B U' }
        ],
      },
      {
        type: 'syllable',         // Fase 2: Reconocer la sílaba que dice
        introAudio: '/assets/sounds/phases/syllablePhase/intro_syllable_phase2.mp3',
        // Transcript: "Tienes que elegir la sílaba que yo digo"
        minRoundsToPlay: 2, // Jugar al menos 2 rondas
        maxRounds: 4,       // Máximo de 4 rondas si no hay perfección
        minDamagePercent: 60,
        rings: ['BA', 'BE', 'BI', 'BO', 'BU'],
        turns: [
          { prompt: 'BA', sound: soundPaths[1].syllablePhase.ba, expected: 'BA' },
          { prompt: 'BE', sound: soundPaths[1].syllablePhase.be, expected: 'BE' },
          { prompt: 'BI', sound: soundPaths[1].syllablePhase.bi, expected: 'BI' },
          { prompt: 'BO', sound: soundPaths[1].syllablePhase.bo, expected: 'BO' },
          { prompt: 'BU', sound: soundPaths[1].syllablePhase.bu, expected: 'BU' }
        ]
      },
      {
        type: 'semantic',         // Fase 3: Animal/cosa que empieza con la sílaba
        introAudio: '/assets/sounds/phases/semanticPhase/intro_semantic_phase3.mp3',
        // Transcript: "Tienes que elegir la sílaba por la que empieza el animal/cosa que yo digo"
        roundsRequired: Infinity,
        minDamagePercent: 100,
        turns: [
          { word: 'Ballena', image: '/assets/img/ballena.png', expected: 'BA' },
          { word: 'Beso',   image: '/assets/img/beso.png',   expected: 'BE' },
          { word: 'Bicicleta', image: '/assets/img/bicicleta.png', expected: 'BI' },
          { word: 'Bota',    image: '/assets/img/bota.png',    expected: 'BO' },
          { word: 'Burro',   image: '/assets/img/burro.png',   expected: 'BU' }
        ]
      }
    ],
    heroRewards: {
      onVictory: {
        healthBonus: 20,
        newAttack: 'spinKick'
      }
    }
  }
};