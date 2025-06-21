export const enemiesConfig = {
  1: {
    type: 'enemy',
    name: 'Dr. Eggman',
    attackPower: 10,
    maxHealth: 1000,
    health: 1000,
    images: {
      original: `/assets/img/enemies/1/enemyOrigin1.webp`,
      forward: `/assets/img/enemies/1/enemyForward1.webp`,
      impact: `/assets/img/enemies/1/enemyImpact1.webp`,
      comeback: `/assets/img/enemies/1/enemyReturn1.webp`
    },
    sounds: {
      movement: '/assets/sounds/enemies/level1/enemyMovement1.mp3',
      impact: '/assets/sounds/enemies/level1/enemyImpact1.mp3',
      pain: '/assets/sounds/enemies/level1/enemyPain1.mp3',
      death: '/assets/sounds/enemies/level1/enemyDeath1.mp3',
      deathb: '/assets/sounds/enemies/level1/enemyDeath1b.mp3',
    },
    cssClasses: {
      forward: 'enemy-attack-move',
      impact: 'enemy-impact-frame',
      comeback: 'enemy-attack-return',
      idle: 'enemy-idle',
      damage: 'enemy-take-damage'
    },
    animations: {
      death: {
        step1: '/assets/img/enemies/1/enemyDeath01.webp',
        step2: '/assets/img/enemies/1/enemyDeath02.webp',
        step3: '/assets/img/enemies/1/enemyDeath03.webp',
        step4: '/assets/img/enemies/1/enemyDeath04.webp',
        step5: '/assets/img/enemies/1/enemyDeath05.webp',
        step6: '/assets/img/enemies/1/enemyDeath06.webp',
        step7: '/assets/img/enemies/1/enemyDeath07.webp',
      }
    }
  }
};