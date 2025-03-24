document.addEventListener('DOMContentLoaded', () => {
  // Captura de elementos
  const confirmButton = document.querySelector('#confirmButton');
  const eraseButton = document.querySelector('#eraseButton');
  const backButton = document.querySelector('#backButton');
  const lettersSlots = document.querySelectorAll('.letterSlot');
  const alphabetContainer = document.querySelector('.alphabetContainer');
  const resetButton = document.querySelector('#resetButton');
  let namePlayer = [];

  //Lógica pulsacion alfabeto con eventBubbling
  alphabetContainer.addEventListener('click', (event) => {
    //Guardamos en una constante la pulsación
    const button = event.target;

    //Comprobamos si el elemento pulsado es un botón
    if (button.classList.contains('letterBttn')) {
      //Guardamos la letra del botón pulsado
      const letra = button.dataset.letra;

      //Comprobamos si el nombre del jugador tiene menos de 6 letras
      if(namePlayer.length < 6) {
        //Añadimos la letra al nombre del jugador
        namePlayer.push(letra);
        //Mostramos la letra en el hueco correspondiente
        lettersSlots[namePlayer.length - 1].textContent = letra;
      }
    }
  });

  // Lógica botón Nueva Partida
  confirmButton.addEventListener('click', () => {
    if(namePlayer.length === 0) {
      console.log('Introduce tu nombre!');
      return;
    } else {
      namePlayer = namePlayer.join('');
      console.log('Nombre del jugador:', namePlayer);
    }
  });

  // Lógica botón Continuar
  resetButton.addEventListener('click', () => {
    namePlayer = [];
    lettersSlots.forEach(slot => slot.textContent = '_');
    console.log('Borrado!');
  });

  // Lógica botón Salir
  backButton.addEventListener('click', (event) => {
    event.preventDefault();
    document.body.classList.remove('fade-in');
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = '/';
    }, 800
    );
  });

});