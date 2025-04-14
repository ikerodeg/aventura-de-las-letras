import * as rounds from "./rounds.js";

export function currentPhase() {
  // Inicio de ejecucion de la fase
  //console.log("⚙️ currentPahse() en phases.js");

  // Llama a la función de inicio de ronda
  //console.log("☎️ currentRound() desde phases.js");
  rounds.currentRound();
}
