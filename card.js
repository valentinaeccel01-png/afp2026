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
const filtroInput = document.querySelector("#filter-input");

const btnImg = document.querySelector("#btn-only-img");
const btnText = document.querySelector("#btn-only-text");
const btnAll = document.querySelector("#btn-all");

const checkFiltri = document.querySelector("#enable-adv-filter")

let adv_filter_enabled = false;

btnImg.addEventListener("click", soloImmagini);
//btnText.addEventListener("click", () => soloImmagini())
btnText.addEventListener("click", soloTesto);
btnAll.addEventListener("click", mostraTutto);

filtroInput.addEventListener("input", (e) => {
    resetAllFilterButton();
    enableBtn(btnAll);
    const txtDigitato = e.target.value.toLowerCase();

    const cardTrovate = cardList.filter((item) => {
        const title = item.contenuto.titolo.toLowerCase();
        console.log(`Target: ${txtDigitato}, Titolo: ${title}`);

        // return txtDigitato !== title; // Filtro puntuale
        return title.includes(txtDigitato);
    });

    renderizzaCards(cardTrovate);
})

checkFiltri.addEventListener("click", (e) => {
    adv_filter_enabled = e.target.checked;
    console.log(adv_filter_enabled ? "Abilitato" : "Disabilitato");
});

function enableBtn(btn){
    btn.classList.add("btn-active");
}
function disableBtn(btn){
    btn.classList.remove("btn-active");
}
function resetAllFilterButton(){
    disableBtn(btnImg);
    disableBtn(btnText);
    disableBtn(btnAll);
}

/**
 * CLEAR -- rimuovo
 * DISABLE --
 *
 */

//
// filtroInput["abilitato"] = true;
// filtroInput.abilitato2 = true;
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
    resetAllFilterButton();
    const listTmp = cardList.filter(
        item => item.contenuto.immagine !== ""
    );
    enableBtn(btnImg);
    renderizzaCards(listTmp);
}

function soloTesto(){
    console.log("Mostra solo testo");
    resetAllFilterButton();
    const listaTmp = cardList.filter(
        item => item.contenuto.immagine === ""
    );

    enableBtn(btnText);
    renderizzaCards(listaTmp);
}

function mostraTutto(){
    console.log("Mostra tutto");
    resetAllFilterButton()
    enableBtn(btnAll);
    renderizzaCards(cardList);
}


renderizzaCards(cardList);
enableBtn(btnAll);