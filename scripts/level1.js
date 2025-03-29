// Captura de elementos
const heroContainer = document.querySelector('.heroContainer');
const heroImage = document.querySelector('.heroImage');
const heroNameP = document.querySelector('.heroNameP');
const playerName = localStorage.getItem('playerName');
const heroName = localStorage.getItem('heroName');



heroImage.setAttribute('src', `../assets/img/${heroName}Avatar.webp`);
heroNameP.textContent = playerName;

console.log(`Nombre del jugador: ${playerName}`);
console.log(`Nombre del héroe: ${heroName}`);










