/*
  Verbindung zu Elementen aus der HTML-Datei.
*/
const begruessung = document.querySelector("#begruessung");
const tagesText = document.querySelector("#tagesText");
const uhrzeit = document.querySelector("#uhrzeit");
const datum = document.querySelector("#datum");

const statistikLinks = document.querySelector("#statistikLinks");
const statistikZeichen = document.querySelector("#statistikZeichen");
const statistikStatus = document.querySelector("#statistikStatus");

const linkFormular = document.querySelector("#linkFormular");
const linkNameEingabe = document.querySelector("#linkNameEingabe");
const linkUrlEingabe = document.querySelector("#linkUrlEingabe");
const linkBeschreibungEingabe = document.querySelector("#linkBeschreibungEingabe");
const linkListe = document.querySelector("#linkListe");
const linkZaehler = document.querySelector("#linkZaehler");
const standardLinksButton = document.querySelector("#standardLinksButton");
const linkSucheEingabe = document.querySelector("#linkSucheEingabe");
const linkSucheInfo = document.querySelector("#linkSucheInfo");

const notizEingabe = document.querySelector("#notizEingabe");
const notizZeichenText = document.querySelector("#notizZeichenText");
const notizSpeichernButton = document.querySelector("#notizSpeichernButton");
const notizLeerenButton = document.querySelector("#notizLeerenButton");

const testButton = document.querySelector("#testButton");
const meldung = document.querySelector("#meldung");

/*
  Namen für den Speicherplatz im Browser.
  localStorage merkt sich Daten lokal im Browser.
*/
const notizSpeicherName = "persoenlicheStartseiteNotiz";
const linksSpeicherName = "persoenlicheStartseiteLinks";

/*
  Standardlinks, falls noch keine eigenen Links gespeichert sind.
*/
const standardLinks = [
  {
    id: 1,
    name: "Google",
    url: "https://www.google.de",
    beschreibung: "Suchen und recherchieren"
  },
  {
    id: 2,
    name: "YouTube",
    url: "https://www.youtube.com",
    beschreibung: "Videos und Lernen"
  },
  {
    id: 3,
    name: "GitHub",
    url: "https://github.com",
    beschreibung: "Code-Projekte speichern"
  },
  {
    id: 4,
    name: "ChatGPT",
    url: "https://chatgpt.com",
    beschreibung: "Hilfe beim Lernen und Programmieren"
  }
];

/*
  In diesem Array liegen alle aktuellen Links.
*/
let links = [];

/*
  Diese Funktion aktualisiert Uhrzeit und Datum.
*/
function uhrAktualisieren() {
  const jetzt = new Date();

  /*
    toLocaleTimeString macht aus der Uhrzeit ein deutsches Uhrzeitformat.
  */
  const aktuelleUhrzeit = jetzt.toLocaleTimeString("de-DE");

  /*
    toLocaleDateString macht aus dem Datum ein deutsches Datumsformat.
  */
  const aktuellesDatum = jetzt.toLocaleDateString("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  uhrzeit.textContent = aktuelleUhrzeit;
  datum.textContent = aktuellesDatum;
}

/*
  Diese Funktion setzt eine passende Begrüßung.
  Dafür schauen wir auf die aktuelle Stunde.
*/
function begruessungAktualisieren() {
  const jetzt = new Date();
  const stunde = jetzt.getHours();

  /*
    Nacht: 0 bis 4 Uhr
  */
  if (stunde >= 0 && stunde < 5) {
    begruessung.textContent = "Gute Nacht, Vladi";
    tagesText.textContent = "Es ist spät. Eine ruhige Startseite hilft, ohne viel Ablenkung den Überblick zu behalten.";
    return;
  }

  /*
    Morgen: 5 bis 11 Uhr
  */
  if (stunde >= 5 && stunde < 12) {
    begruessung.textContent = "Guten Morgen, Vladi";
    tagesText.textContent = "Starte ruhig in den Tag: Uhrzeit prüfen, wichtige Links öffnen und eine kurze Notiz im Blick behalten.";
    return;
  }

  /*
    Tag/Nachmittag: 12 bis 17 Uhr
  */
  if (stunde >= 12 && stunde < 18) {
    begruessung.textContent = "Schönen Tag, Vladi";
    tagesText.textContent = "Hier hast du deine wichtigsten Links und Informationen gesammelt an einem Ort.";
    return;
  }

  /*
    Abend: 18 bis 23 Uhr
  */
  begruessung.textContent = "Guten Abend, Vladi";
  tagesText.textContent = "Ein ruhiger Überblick für den Abend: Links, Uhrzeit und deine eigene Notiz.";
}

/*
  Diese Funktion aktualisiert die kleinen Statistik-Karten.
*/
function statistikAktualisieren() {
  const zeichenAnzahl = notizEingabe.value.length;

  statistikLinks.textContent = links.length;
  statistikZeichen.textContent = zeichenAnzahl;
  statistikStatus.textContent = "OK";

  notizZeichenText.textContent = `${zeichenAnzahl} Zeichen`;
}

/*
  Diese Funktion zeigt alle gespeicherten Links auf der Webseite an.
*/
function linksAnzeigen() {
  /*
    Erst leeren wir die Liste, damit nichts doppelt angezeigt wird.
  */
  linkListe.innerHTML = "";

  /*
    Suchbegriff aus dem Suchfeld lesen.
    Wenn kein Suchfeld vorhanden ist, wird einfach alles angezeigt.
  */
  const suchbegriff = linkSucheEingabe ? linkSucheEingabe.value.trim().toLowerCase() : "";

  /*
    Links nach Name und Beschreibung filtern.
  */
  const gefilterteLinks = links.filter(function (link) {
    const suchText = `${link.name} ${link.beschreibung}`.toLowerCase();

    return suchbegriff === "" || suchText.includes(suchbegriff);
  });

  /*
    Wenn nichts gefunden wurde, zeigen wir eine freundliche Meldung.
  */
  if (gefilterteLinks.length === 0) {
    const leerMeldung = document.createElement("div");
    leerMeldung.classList.add("link-leer-meldung");
    leerMeldung.textContent = "Keine passenden Links gefunden.";

    linkListe.appendChild(leerMeldung);
  }

  /*
    Für jeden passenden Link erstellen wir eine kleine Linkkarte.
  */
  gefilterteLinks.forEach(function (link) {
    const linkEintrag = document.createElement("div");
    linkEintrag.classList.add("link-eintrag");

    const linkKarte = document.createElement("a");
    linkKarte.classList.add("link-karte");
    linkKarte.href = link.url;
    linkKarte.target = "_blank";
    linkKarte.rel = "noopener noreferrer";

    const linkName = document.createElement("strong");
    linkName.textContent = link.name;

    const linkBeschreibung = document.createElement("small");
    linkBeschreibung.textContent = link.beschreibung;

    const loeschenButton = document.createElement("button");
    loeschenButton.classList.add("link-loeschen-button");
    loeschenButton.textContent = "Link löschen";

    /*
      Beim Klick wird genau dieser Link gelöscht.
    */
    loeschenButton.addEventListener("click", function () {
      linkLoeschen(link.id);
    });

    linkKarte.appendChild(linkName);
    linkKarte.appendChild(linkBeschreibung);

    linkEintrag.appendChild(linkKarte);
    linkEintrag.appendChild(loeschenButton);

    linkListe.appendChild(linkEintrag);
  });

  /*
    Der Zähler zeigt die aktuell sichtbaren Links.
  */
  linkZaehler.textContent = gefilterteLinks.length;

  /*
    Infotext für die Suche aktualisieren.
  */
  if (linkSucheInfo) {
    if (suchbegriff === "") {
      linkSucheInfo.textContent = "Alle Links werden angezeigt.";
    } else {
      linkSucheInfo.textContent = `${gefilterteLinks.length} von ${links.length} Links gefunden.`;
    }
  }

  /*
    Auch die Statistik wird danach aktualisiert.
  */
  statistikAktualisieren();
}

/*
  Diese Funktion speichert alle Links im Browser.
*/
function linksSpeichern() {
  localStorage.setItem(linksSpeicherName, JSON.stringify(links));
}

/*
  Diese Funktion lädt gespeicherte Links aus dem Browser.
*/
function linksLaden() {
  const gespeicherteLinks = localStorage.getItem(linksSpeicherName);

  /*
    Falls noch keine Links gespeichert sind,
    nehmen wir die Standardlinks.
  */
  if (gespeicherteLinks === null) {
    links = standardLinksKopieren();
    linksSpeichern();
    return;
  }

  links = JSON.parse(gespeicherteLinks);
}

/*
  Diese Funktion kopiert die Standardlinks.
  So verändern wir nicht aus Versehen die Original-Liste.
*/
function standardLinksKopieren() {
  return standardLinks.map(function (link) {
    return {
      id: link.id,
      name: link.name,
      url: link.url,
      beschreibung: link.beschreibung
    };
  });
}

/*
  Diese Funktion stellt die Standardlinks wieder her.
*/
function standardLinksWiederherstellen() {
  const bestaetigung = confirm("Möchtest du die Standardlinks wirklich wiederherstellen? Eigene Links werden dadurch ersetzt.");

  if (bestaetigung === false) {
    return;
  }

  links = standardLinksKopieren();
  linksSpeichern();
  linksAnzeigen();

  meldung.textContent = "Standardlinks wurden wiederhergestellt.";
}

/*
  Diese Funktion ergänzt https://, wenn der Nutzer es nicht eintippt.
  Beispiel:
  github.com wird zu https://github.com
*/
function urlVorbereiten(url) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return "https://" + url;
}

/*
  Diese Funktion erstellt eine neue eindeutige ID.
*/
function neueIdErstellen() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

/*
  Diese Funktion fügt einen neuen Link hinzu.
*/
function linkHinzufuegen(name, url, beschreibung) {
  const neuerLink = {
    id: neueIdErstellen(),
    name: name,
    url: urlVorbereiten(url),
    beschreibung: beschreibung
  };

  links.push(neuerLink);
  linksSpeichern();
  linksAnzeigen();

  meldung.textContent = "Neuer Link wurde gespeichert.";
}

/*
  Diese Funktion löscht einen Link.
*/
function linkLoeschen(linkId) {
  const bestaetigung = confirm("Möchtest du diesen Link wirklich löschen?");

  if (bestaetigung === false) {
    return;
  }

  links = links.filter(function (link) {
    return link.id !== linkId;
  });

  linksSpeichern();
  linksAnzeigen();

  meldung.textContent = "Link wurde gelöscht.";
}

/*
  Formular absenden:
  Neue Linkdaten prüfen und speichern.
*/
linkFormular.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = linkNameEingabe.value.trim();
  const url = linkUrlEingabe.value.trim();
  const beschreibung = linkBeschreibungEingabe.value.trim();

  if (name === "" || url === "" || beschreibung === "") {
    meldung.textContent = "Bitte fülle alle Linkfelder aus.";
    return;
  }

  linkHinzufuegen(name, url, beschreibung);

  linkNameEingabe.value = "";
  linkUrlEingabe.value = "";
  linkBeschreibungEingabe.value = "";

  linkNameEingabe.focus();
});


/*
  Live-Suche:
  Während der Eingabe wird die Linkliste automatisch gefiltert.
*/
if (linkSucheEingabe) {
  linkSucheEingabe.addEventListener("input", function () {
    linksAnzeigen();
  });
}

/*
  Klick auf den Button für Standardlinks.
*/
standardLinksButton.addEventListener("click", function () {
  standardLinksWiederherstellen();
});

/*
  Diese Funktion speichert die Notiz im Browser.
*/
function notizSpeichern() {
  const notizText = notizEingabe.value.trim();

  if (notizText === "") {
    meldung.textContent = "Bitte schreibe zuerst eine Notiz.";
    return;
  }

  localStorage.setItem(notizSpeicherName, notizText);
  meldung.textContent = "Notiz wurde gespeichert.";

  statistikAktualisieren();
}

/*
  Diese Funktion lädt eine gespeicherte Notiz aus dem Browser.
*/
function notizLaden() {
  const gespeicherteNotiz = localStorage.getItem(notizSpeicherName);

  if (gespeicherteNotiz === null) {
    meldung.textContent = "Noch keine Notiz gespeichert.";
    statistikAktualisieren();
    return;
  }

  notizEingabe.value = gespeicherteNotiz;
  meldung.textContent = "Gespeicherte Notiz wurde geladen.";

  statistikAktualisieren();
}

/*
  Diese Funktion leert die Notiz und entfernt sie aus dem Speicher.
*/
function notizLeeren() {
  const bestaetigung = confirm("Möchtest du die Notiz wirklich leeren?");

  if (bestaetigung === false) {
    return;
  }

  notizEingabe.value = "";
  localStorage.removeItem(notizSpeicherName);
  meldung.textContent = "Notiz wurde geleert.";

  statistikAktualisieren();
}

/*
  Wenn im Notizfeld geschrieben wird,
  aktualisieren wir live den Zeichenzähler.
*/
notizEingabe.addEventListener("input", function () {
  statistikAktualisieren();
});

/*
  Klick auf den Speichern-Button.
*/
notizSpeichernButton.addEventListener("click", function () {
  notizSpeichern();
});

/*
  Klick auf den Leeren-Button.
*/
notizLeerenButton.addEventListener("click", function () {
  notizLeeren();
});

/*
  Der Testbutton prüft, ob JavaScript verbunden ist.
*/
testButton.addEventListener("click", function () {
  meldung.textContent = "JavaScript funktioniert. Die persönliche Startseite ist fertig.";
  testButton.textContent = "Test erfolgreich";
  statistikAktualisieren();
});

/*
  Uhr und Begrüßung direkt beim Start anzeigen.
*/
uhrAktualisieren();
begruessungAktualisieren();

/*
  Notiz und Links beim Start laden.
*/
linksLaden();
notizLaden();
linksAnzeigen();

/*
  Uhr jede Sekunde aktualisieren.
  1000 Millisekunden = 1 Sekunde.
*/
setInterval(uhrAktualisieren, 1000);

/*
  Begrüßung regelmäßig prüfen.
  60000 Millisekunden = 1 Minute.
*/
setInterval(begruessungAktualisieren, 60000);

/*
  Kontrollausgabe für die Entwicklerkonsole.
*/
console.log("Persönliche Startseite Version 7 ist gestartet.");