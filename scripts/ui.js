/**
 * Muestra un mensaje de bienvenida en pantalla con el nombre del jugador.
 * @param {string} name - El nombre del jugador.
 */
export function showWelcomeMessage(name) {
  //Crear un nuevo div para el mensaje
  const messageDiv = document.createElement("div");
  
  //Asignar un id
  messageDiv.id = "welcomeMessage";
  
  //Establecer el contenido del mensaje
  messageDiv.textContent = `💪🏻 ¡Vamos ${name}! 💪🏻`;
  
  //Aplica estilos directamente para centrar el mensaje en pantalla
  messageDiv.style.position = "fixed";
  messageDiv.style.top = "50%";
  messageDiv.style.left = "50%";
  messageDiv.style.transform = "translate(-50%, -50%)";
  messageDiv.style.backgroundColor = "hsla(0, 0%, 0%, 0.8)";
  messageDiv.style.color = "hsl(0, 0%, 100%)";              
  messageDiv.style.padding = "1rem 2rem";
  messageDiv.style.borderRadius = "0.3em";
  messageDiv.style.fontSize = "3rem";
  messageDiv.style.zIndex = "1000";
  
  //Se añade el mensaje al DOM
  document.body.append(messageDiv);

  //Reproduce audio
  const audio = new Audio('/assets/sounds/ringLossFx.mp3')
  audio.play()
    .then(() => {
      console.log(`Reproduciendo audio: ringFx.mp3`);
    })
    .catch((err) => {
      console.log(`Error al reproducir el audio ringFx.mp3`);
    })
  
  // Depuración
  console.log(`%cMensaje mostrado: ${messageDiv.textContent}`, "color: hsl(0, 0%, 100%); background: hsl(0, 0%, 0%);");
}
