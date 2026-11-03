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
            immagine: "gatto.png" // img
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
const checkFiltri = document.querySelector("#enable-adv-filter")

const btnImg = document.querySelector("#btn-only-img");
const btnImgJpg = document.querySelector("#btn-only-img-jpg");
const btnText = document.querySelector("#btn-only-text");
const btnAll = document.querySelector("#btn-all");

btnImg.addEventListener("click", () => {
    categoriaAttiva = Categorie.IMMAGINI;
    applicaFiltriGlobali();
});

btnText.addEventListener("click", () => {
    categoriaAttiva = Categorie.TESTO;
    applicaFiltriGlobali();
});

btnAll.addEventListener("click", () => {
    categoriaAttiva = Categorie.TUTTI;
    applicaFiltriGlobali();
});

btnImgJpg.addEventListener("click", () => {
    categoriaAttiva = Categorie.JPG;
    applicaFiltriGlobali();
});

filtroInput.addEventListener("input", (e) => {
    testoRicerca = e.target.value.toLowerCase();

    if (!filtriAvanzatiAttivi) categoriaAttiva = Categorie["TUTTI"]; // SAME AS categoriaAttiva = Categorie.TUTTI

    applicaFiltriGlobali();
});

checkFiltri.addEventListener("change", (e) => {
    filtriAvanzatiAttivi = e.target.checked;

    if (!filtriAvanzatiAttivi && testoRicerca !== "") categoriaAttiva = Categorie.TUTTI;

    applicaFiltriGlobali();
});


const Categorie = Object.freeze({
    TUTTI: "TUTTI",
    IMMAGINI: "IMMAGINI",
    TESTO: "TESTO",
    JPG: "JPG"
});


// let categoriaAttiva = "TUTTI" // "IMMAGINI", "TESTO"
let categoriaAttiva = Categorie.TUTTI // "IMMAGINI", "TESTO"
let testoRicerca = "";
let filtriAvanzatiAttivi = false;


function applicaFiltriGlobali(){
    // A) Aggiornare stile bottoni
    resetAllFilterButton();
    if (categoriaAttiva === Categorie.TUTTI) enableBtn(btnAll);
    if (categoriaAttiva === Categorie.IMMAGINI) enableBtn(btnImg);
    if (categoriaAttiva === Categorie.TESTO) enableBtn(btnText);
    if (categoriaAttiva === Categorie.JPG) enableBtn(btnImgJpg);

    // B) Copiare vett `cardList` localmente
    let risCorrenti = cardList;

    // STEP 1. filtri Per categoria
    if (categoriaAttiva === Categorie.IMMAGINI){
        risCorrenti = risCorrenti.filter(
            item => item.contenuto.immagine !== ""
        );
    }else if(categoriaAttiva === Categorie.TESTO){
        risCorrenti = risCorrenti.filter(
            item => item.contenuto.immagine === ""
        )
    }else if(categoriaAttiva === Categorie.JPG){
        risCorrenti = risCorrenti.filter(
            item => item.contenuto.immagine.endsWith(".jpg")
        )
    }

    // STEP 2. Filtro specifico via testo
    if (testoRicerca !== ""){
        risCorrenti = risCorrenti.filter((item) => {
            const titoloCard = item.contenuto.titolo.toLowerCase();

            //return titoloCard.toLowerCase() === testoRicerca.toLowerCase();
            return titoloCard.includes(testoRicerca);
        })
    }

    // C) Disegnare le card
    renderizzaCards(risCorrenti);
}

applicaFiltriGlobali();

// -- FN OPERATIVE --
function disableBtn(btn){
    btn.classList.remove("btn-active");
}
function enableBtn(btn){
    btn.classList.add("btn-active");
}
function resetAllFilterButton(){
    disableBtn(btnImg);
    disableBtn(btnText);
    disableBtn(btnAll);
    disableBtn(btnImgJpg);
}
// const renderizzaCards = (listaCard) => {...}
function renderizzaCards(listaCard){
    cardContainer.innerHTML = "";

    listaCard.forEach((item) => {
        // Crea elemento Card dai dati dell'oggetto item
        const cardTmp = createCardElement(item);

        // Aggiungi evento click per cambiare lo sfondo della card
        // (item) => {} -- item => {}
        cardTmp.addEventListener(
            "click",
            () => cardTmp.classList.toggle("card-active")
        );

        // Aggiungi la card al contenitore principale
        cardContainer.appendChild(cardTmp);
    });
}
function createCardElement(cardData){
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