export const heroesConfig = {
  1: {
    type: 'hero',
    name: 'Shadow',
    attackPower: 10,
    maxHealth: 100,
    health: 100,
    images: {
      original: '/assets/img/heroes/shadow/heroOrigin1.webp',
      forward: '/assets/img/heroes/shadow/heroForward1.webp',
      impact: '/assets/img/heroes/shadow/heroImpact1.webp',
      comeback: '/assets/img/heroes/shadow/heroReturn1.webp'
    },
    sounds: {
      attack: '/assets/sounds/heroes/shadow/heroAttack1.mp3',
      impact: '/assets/sounds/heroes/shadow/heroImpact1.mp3',
      movement: '/assets/sounds/heroes/shadow/heroMovement1.mp3',
      pain: '/assets/sounds/heroes/shadow/heroPain1.mp3',
      takeDamage: '/assets/sounds/heroes/shadow/heroTakeDamage1.mp3',
      victory: '/assets/sounds/heroes/shadow/heroVictory1.mp3',
      death: '/assets/sounds/heroes/shadow/heroDeath1.mp3',
      deathb: '/assets/sounds/heroes/shadow/heroDeath1b.mp3',
    },
    cssClasses: {
      forward: 'hero-attack-move',
      impact: 'hero-impact-frame',
      comeback: 'hero-attack-return',
      idle: 'hero-idle',
      damage: 'hero-take-damage'
    }
  }
};