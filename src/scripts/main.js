document.addEventListener('DOMContentLoaded', () => {
  // Captura de elementos
  const newGameButton = document.querySelector('#newGameButton');
  const continueButton = document.querySelector('#continueGameButton');
  const exitButton = document.querySelector('#exitGameButton');

  // Lógica botón Nueva Partida
  newGameButton.addEventListener('click', (event) => {
    event.preventDefault();
    document.body.classList.remove('fade-in');
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = '/newGame';
    }, 800
    );
    console.log('Botón Nueva Partida pulsado!');
  });

  // Lógica botón Continuar
  continueButton.addEventListener('click', () => {
    console.log('Botón Continuar Partida pulsado!');
  });

  // Lógica botón Salir
  exitButton.addEventListener('click', () => {
    console.log('Botón Salir Partida pulsado!');
  });
});