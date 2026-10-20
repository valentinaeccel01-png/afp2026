"use strict";

let card = {
    contenuto: {
        titolo: "Primo posto", // h1
        sottotitolo:"Sci aplinismo", // h2
        testo: "Primo classificato alle olimpiadi", // p
        immagine: "" // img
    },
    bordo: {
        colore: "",
        stile: "",
        dimensione: "",
        raggio: ""
    }
}

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
            immagine: "" // img
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

const listaFigli = cardContainer.children;
const nFigliTot = listaFigli.length;
``

for (let i = 0; i < nFigliTot; i++) {
    console.log(`Elemento figlio ${i}: `, listaFigli[0].children[0].textContent);
    cardContainer.removeChild(listaFigli[0]);
    // cardContainer.removeChild(listaFigli.item(i));
}

// CREARE UN NUOVO ELEMENTO

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

cardList.forEach((item) => {
    // Crea elemento Card dai dati dell'oggetto item
    const cardTmp = createCardElement(item);

    // Aggiungi evento click per cambiare lo sfondo della card
    cardTmp.addEventListener("click",() =>{
        cardTmp.classList.toggle("bg-green");
    });

    // Aggiungi la card al contenitore principale
    cardContainer.appendChild(cardTmp);
});


function soloImmagini(){
    console.log("Mostra solo immagini");
    cardContainer.innerHTML = "";

    cardList.forEach((item) => {
        if (item.contenuto.immagine){
            const cardTmp = createCardElement(item);
            cardContainer.appendChild(cardTmp);
        }
    });
}

function soloTesto(){
    console.log("Mostra solo testo");
    cardContainer.innerHTML = "";

    cardList.forEach((item) => {
        if(!item.contenuto.immagine){
            const cardTmp = createCardElement(item);
            cardContainer.appendChild(cardTmp);
        }
    })
}

function mostraTutto(){
    console.log("Mostra tutto");
    cardContainer.innerHTML = "";

    cardList.forEach((item) => {
        const cardTmp = createCardElement(item);
        cardContainer.appendChild(cardTmp);
    });
}