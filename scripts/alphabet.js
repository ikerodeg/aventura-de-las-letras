export function generateAlphabet(container) {
  const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  alphabet.forEach((letra) => {
    const button = document.createElement('button');
    button.className = 'letterBttn letterBttn${letra}';
    button.dataset.letra = letra;
    button.textContent = letra;
    container.append(button);
  });
}
