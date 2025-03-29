  // Captura de elementos
  const backButton = document.querySelector('#backButton');
  const heroSelectionContainer = document.querySelector('.heroSelectionContainer');



  heroSelectionContainer.addEventListener('click', (event) => {
    const img = event.target;
    if (img.classList.contains('imgHero')){
      //Guardamos el nombre del heroe seleccionado
      const heroName = img.dataset.hero;
      console.log(heroName);

      //Guardamos el heroe seleccionado en el localStorage
      localStorage.setItem('heroName', heroName);

      //Efecto transicion y redireccion a heroSelect.html
      setTimeout(() => {
        document.body.classList.remove('fade-in');
        document.body.classList.add('fade-out');
        window.location.href = '../screens/levelSelect.html';
      }, 600
      );
    }
  });



  // Lógica botón volver
  backButton.addEventListener('click', (event) => {
    event.preventDefault();

    //Elimina el nombre del jugador del localStorage
    localStorage.removeItem('playerName');
    document.body.classList.remove('fade-in');
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = '../screens/nameSelect.html';
    }, 800
    );
  });