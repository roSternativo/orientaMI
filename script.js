function leggiPagina() {

  speechSynthesis.cancel();

  let testiDaLeggere = [];



  // Legge il testo introduttivo della Home, se presente

  const testoHome = document.querySelector(".testo-home");

  if (testoHome) {

    let testoIntro = testoHome.innerText.trim();

    if (testoIntro !== "") {
      testiDaLeggere.push(testoIntro);
    }
  }



  // Legge i testi dei pulsanti visibili, senza emoticon

  const pulsanti = document.querySelectorAll("button");

  pulsanti.forEach(function(pulsante) {

    const visibile = pulsante.offsetParent !== null;

    if (visibile) {

      let testo = pulsante.innerText;

      // elimina emoji e simboli, mantiene lettere, numeri, spazi e accenti italiani
      testo = testo.replace(/[^\p{L}\p{N}\sàèéìòùÀÈÉÌÒÙ']/gu, "");

      testo = testo.trim();

      if (testo !== "") {
        testiDaLeggere.push(testo);
      }
    }
  });



  let testoFinale = testiDaLeggere.join(". ");



  // Correzioni per migliorare la pronuncia della voce

  testoFinale = testoFinale
    .replaceAll("OrientaMI", "Orienta Mi")
    .replaceAll("Studium", "Stùdium")
    .replaceAll("Ecotekne", "Eco tekne")
    .replaceAll("PORTAMI", "Portami")
    .replaceAll("I Piano", "Primo piano")
    .replaceAll("II Piano", "Secondo piano")
    .replaceAll("Piano Terra", "Piano terra")
    .replaceAll("Uffici docenti", "Uffici docenti")
    .replaceAll("Aula Studio", "Aula studio")
    .replaceAll("Blocca audio percorso", "Blocca audio percorso")
    .replaceAll("Ascolta pagina", "Ascolta pagina")
    .replaceAll("Blocca lettura", "Blocca lettura")
    .replaceAll("Alto contrasto", "Alto contrasto")
    .replaceAll("Testo grande", "Testo grande");



  const voce = new SpeechSynthesisUtterance(testoFinale);

  voce.lang = "it-IT";

  // Velocità voce
  voce.rate = 1.60;

  // Tono voce
  voce.pitch = 1.05;

  voce.volume = 1;

  speechSynthesis.speak(voce);
}



function bloccaLettura() {

  speechSynthesis.cancel();
}



function attivaContrasto() {

  document.body.classList.toggle("contrasto");
}



function testoGrande() {

  document.body.classList.toggle("grande");
}



function cercaDocente() {

  const input = document.getElementById("barraRicerca");

  if (!input) {
    return;
  }

  const filtro = input.value.toLowerCase();

  const docenti = document.querySelectorAll(".docente-item");

  docenti.forEach(function(docente) {

    const testo = docente.innerText.toLowerCase();

    if (testo.includes(filtro)) {
      docente.style.display = "block";
    } else {
      docente.style.display = "none";
    }

  });
}



function ricercaVocale() {

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("La ricerca vocale non è supportata da questo browser. Usa Google Chrome.");
    return;
  }

  const riconoscimento = new SpeechRecognition();

  riconoscimento.lang = "it-IT";
  riconoscimento.interimResults = false;
  riconoscimento.maxAlternatives = 1;
  riconoscimento.continuous = false;

  riconoscimento.start();

  riconoscimento.onresult = function(event) {

    const testo = event.results[0][0].transcript;

    const barra = document.getElementById("barraRicerca");

    if (barra) {
      barra.value = testo;
      cercaDocente();
    }
  };

  riconoscimento.onerror = function(event) {

    if (
      event.error === "no-speech" ||
      event.error === "audio-capture" ||
      event.error === "network"
    ) {
      alert("Non ho sentito bene, riprova");
    } else if (event.error === "not-allowed") {
      alert("Permesso microfono non attivo. Consenti l’uso del microfono dal browser.");
    } else {
      alert("Non ho sentito bene, riprova");
    }
  };
}


let audioPercorso = null;



function fermaAudioPercorsoCorrente() {

  if (audioPercorso) {
    audioPercorso.pause();
    audioPercorso.currentTime = 0;
  }
}



function avviaStudium5() {

  fermaAudioPercorsoCorrente();

  audioPercorso = new Audio("studium5.mp3");

  audioPercorso.play();
}



function avviaAulaStudio() {

  fermaAudioPercorsoCorrente();

  audioPercorso = new Audio("aula-studio.mp3");

  audioPercorso.play();
}



function avviaPercorsoKatia() {

  fermaAudioPercorsoCorrente();

  audioPercorso = new Audio("katia-lotteria.mp3");

  audioPercorso.play();
}



function bloccaAudioPercorso() {

  fermaAudioPercorsoCorrente();
}
function vaiHome() {
  window.location.href = "index.html";
}

function vaiIndietro() {
  history.back();
}

function vaiAvanti() {
  history.forward();
}