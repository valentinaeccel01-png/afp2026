"use strict";

const cardList = [
    {
        contenuto: {
            titolo: "Primo posto", // h1
            sottotitolo:"Sci aplinismo", // h2
            testo: "Primo classificato alle olimpiadi", // p
            immagine: "Federica_Brignone.jpg" // img
        },
        bordo: {
            colore: "",
            stile: "",
            dimensione: "",
            raggio: ""
        }
    },
    {
        contenuto: {
            titolo: "Secondo posto", // h1
            sottotitolo:"Sci aplinismo", // h2
            testo: "Secondo classificato alle olimpiadi", // p
            immagine: "" // img
        },
        bordo: {
            colore: "",
            stile: "",
            dimensione: "",
            raggio: ""
        }
    },
    {
        contenuto: {
            titolo: "Terzo posto", // h1
            sottotitolo:"Sci aplinismo", // h2
            testo: "Terzo classificato alle olimpiadi", // p
            immagine: "" // img
        },
        bordo: {
            colore: "",
            stile: "",
            dimensione: "",
            raggio: ""
        }
    },
    {
        contenuto: {
            titolo: "Quarto posto", // h1
            sottotitolo:"Sci aplinismo", // h2
            testo: "Quarto classificato alle olimpiadi", // p
            immagine: "Federica_Brignone.jpg" // img
        },
        bordo: {
            colore: "",
            stile: "",
            dimensione: "",
            raggio: ""
        }
    },
    {
        contenuto: {
            titolo: "Quinto", // h1
            sottotitolo:"Sci aplinismo", // h2
            testo: "Quarto classificato alle olimpiadi", // p
            immagine: "gatto.png" // img
        },
        bordo: {
            colore: "",
            stile: "",
            dimensione: "",
            raggio: ""
        }
    }
];

const cardContainer = document.querySelector("#card-container-main");
const filtroInput = document.querySelector("#filter-input");
const btnImg = document.querySelector("#btn-only-img");
const btnText = document.querySelector("#btn-only-text");
const btnAll = document.querySelector("#btn-all");
const checkFiltri = document.querySelector("#enable-adv-filter");

// Variabili di Stato Globali dell'Interfaccia
let categoriaAttiva = "TUTTI"; // Può essere: "TUTTI", "IMMAGINI", "TESTO"
let testoRicerca = "";
let filtriAvanzatiAttivi = false;

// --- GESTIONE EVENTI ---

// 1. Click sui Bottoni
btnImg.addEventListener("click", () => {
    categoriaAttiva = "IMMAGINI";
    applicaFiltriGlobali();
});

btnText.addEventListener("click", () => {
    categoriaAttiva = "TESTO";
    applicaFiltriGlobali();
});

btnAll.addEventListener("click", () => {
    categoriaAttiva = "TUTTI";
    applicaFiltriGlobali();
});

// 2. Input Testuale
filtroInput.addEventListener("input", (e) => {
    testoRicerca = e.target.value.toLowerCase();

    // Se i filtri avanzati NON sono attivi, scrivendo disabilito la categoria (comportamento richiesto)
    if (!filtriAvanzatiAttivi) {
        categoriaAttiva = "TUTTI";
    }

    applicaFiltriGlobali();
});

// 3. Click sulla Checkbox
checkFiltri.addEventListener("change", (e) => {
    filtriAvanzatiAttivi = e.target.checked;
    // Se disabilito la checkbox mentre c'è testo, forzo la categoria a "TUTTI"
    if (!filtriAvanzatiAttivi && testoRicerca !== "") {
        categoriaAttiva = "TUTTI";
    }
    applicaFiltriGlobali();
});


// --- LA FUNZIONE MOTORE (PIPELINE) ---
function applicaFiltriGlobali() {
    // Gestione Grafica dei bottoni attivi
    resetAllFilterButton();
    if (categoriaAttiva === "TUTTI") enableBtn(btnAll);
    if (categoriaAttiva === "IMMAGINI") enableBtn(btnImg);
    if (categoriaAttiva === "TESTO") enableBtn(btnText);

    // Partiamo dall'array originale completo
    let risultatiCorrenti = cardList;

    // STEP 1: Filtro Categoria
    if (categoriaAttiva === "IMMAGINI") {
        risultatiCorrenti = risultatiCorrenti.filter(item => item.contenuto.immagine !== "");
    } else if (categoriaAttiva === "TESTO") {
        risultatiCorrenti = risultatiCorrenti.filter(item => item.contenuto.immagine === "");
    }

    // STEP 2: Filtro Testuale (Cascata sul risultato precedente)
    if (testoRicerca !== "") {
        risultatiCorrenti = risultatiCorrenti.filter((item) => {
            const titoloCard = item.contenuto.titolo.toLowerCase();
            return titoloCard.includes(testoRicerca);
        });
    }

    // STEP 3: Disegno a schermo
    renderizzaCards(risultatiCorrenti);
}

// --- FUNZIONI DI SUPPORTO (Grafica e Creazione DOM) ---

function enableBtn(btn) { btn.classList.add("btn-active"); }
function disableBtn(btn) { btn.classList.remove("btn-active"); }
function resetAllFilterButton() {
    disableBtn(btnImg);
    disableBtn(btnText);
    disableBtn(btnAll);
}

function createCardElement(cardData) {
    const cardElement = document.createElement("div");
    const titolo = document.createElement("h1");
    const sottoTitolo = document.createElement("h2");
    const testo = document.createElement("p");

    cardElement.classList.add("card");

    titolo.textContent = cardData.contenuto.titolo;
    sottoTitolo.textContent = cardData.contenuto.sottotitolo;
    testo.textContent = cardData.contenuto.testo;


    cardElement.appendChild(titolo);
    cardElement.appendChild(sottoTitolo);
    cardElement.appendChild(testo);

    if (cardData.contenuto.immagine) {
        const img = document.createElement("img");
        img.src = cardData.contenuto.immagine;
        img.alt = "Immagine di esempio";
        img.width = 200;
        cardElement.appendChild(img);
    }

    return cardElement;
}

function renderizzaCards(listaCard) {
    cardContainer.innerHTML = "";
    listaCard.forEach((item) => {
        const cardTmp = createCardElement(item);
        cardTmp.addEventListener("click", () => cardTmp.classList.toggle("card-active"));
        cardContainer.appendChild(cardTmp);
    });
}

// Inizializzazione avvio pagina
applicaFiltriGlobali();