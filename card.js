"use strict";

const cardList = [
    {
        contenuto: {
            titolo: "Primo posto", // h1
            sottotitolo:"Sci aplinismo", // h2
            testo: "Primo classificato alle olimpiadi", // p
            immagine: "TriageColorEntity.png" // img
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
            immagine: "TriageColorEntity.png" // img
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

document.querySelector("#btn-only-img")
    .addEventListener("click", soloImmagini);
    // .addEventListener("click", () => soloImmagini())

document.querySelector("#btn-only-text")
    .addEventListener("click", soloTesto);

document.querySelector("#btn-all")
    .addEventListener("click", mostraTutto);


/**
 * Crea un elemento card basato sui dati forniti.
 * @param cardData - Oggetto contenente i dati della card.
 * @returns {HTMLDivElement} - L'elemento card creato.
 */
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

const renderizzaCards = (listaCard) => {
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

function soloImmagini(){
    console.log("Mostra solo immagini");
    const listTmp = cardList.filter(
        item => item.contenuto.immagine !== ""
    );

    renderizzaCards(listTmp);
}

function soloTesto(){
    console.log("Mostra solo testo");

    const listaTmp = cardList.filter(
        item => item.contenuto.immagine === ""
    );

    renderizzaCards(listaTmp);
}

function mostraTutto(){
    console.log("Mostra tutto");
    renderizzaCards(cardList);
}


renderizzaCards(cardList);