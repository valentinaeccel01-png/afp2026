"use strict";
let cardList = [
    {
        id: "0",
        contenuto: {
            titolo: "Primo posto", // h1
            sottotitolo:"Sci aplinismo", // h2
            testo: "Primo classificato alle olimpiadi", // p
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
        id: "1",
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
        id: "2",
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
        id: "3",
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
        id: "4",
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

const form = document.querySelector("#card-form");

const inputTitolo = document.querySelector("#titolo");
const inputSottotitolo = document.querySelector("#sottotitolo");
const inputTesto = document.querySelector("#testo");
const inputImmagine = document.querySelector("#immagine");

const formTitle = document.querySelector("#card-form>h3");
const btnSubmit = document.querySelector("#card-form>button[type='submit']");
const btnRollbackEdit = document.querySelector("#btn-rollback-edit");

// Variabile per tenere traccia della card in modifica
let idCardinModifica = null;


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

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // RECUPERARE I VALORI DEGLI INPUT
    const titolo = inputTitolo.value.trim();
    const sottotitolo = inputSottotitolo.value.trim();
    const testo = inputTesto.value.trim();
    const immagine = inputImmagine.value.trim();

    // CONTROLLO VALORI NON VUOTI
    if (!titolo || titolo.length < 3) {
        alert("Titolo non valido");
        return;
    }
    if (!sottotitolo || sottotitolo.length < 3) {
        alert("Sottotitolo non valido");
        return;
    }
    if (!testo) {
        alert("Testo non valido");
        return;
    }
    // if (immagine.length === 0) alert("Immagine non valida"); CONTROLLO SALTABILE

    if (idCardinModifica !== null){
        // MODIFICA CARD ESISTENTE
        const cardTarget = cardList.find(card => card.id === idCardinModifica);
        if (cardTarget){
            cardTarget.contenuto.titolo = titolo;
            cardTarget.contenuto.sottotitolo = sottotitolo;
            cardTarget.contenuto.testo = testo;
            cardTarget.contenuto.immagine = immagine;
        }
        resetFormModifica();
    }else{
        // CREARE NUOVA CARD
        const nuovaCard = {
            id: Date.now().toString(),
            contenuto: {
                titolo: titolo,
                sottotitolo: sottotitolo,
                testo: testo,
                immagine: immagine,
            },
            bordo: {
                colore: "",
                stile: "",
                dimensione: "",
                raggio: ""
            }
        };
        cardList.push(nuovaCard);
    }

    // RESET DELLA FORM
    form.reset();

    // RENDERIZZARE LE CARD NUOVE
    applicaFiltriGlobali();
})


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

    /**
     * - margin top: 10px
     * - flex
     * - gap: 8px
     * @type {HTMLDivElement}
     */
    const boxAzioni = document
        .createElement("div");
    boxAzioni.style.marginTop = "10px";
    boxAzioni.style.display = "flex";
    boxAzioni.style.gap = "10px";

    // BTN MODIFICA
    const btnModifica = document
        .createElement("button");
    btnModifica.textContent = "Modifica";
    btnModifica.style.cursor = "pointer";
    btnModifica.addEventListener("click", (e) => {
        e.stopPropagation();
        preparaModificaCard(cardData);
    });

    // BTN ELIMINA
    const btnElimina = document.createElement("button");
    btnElimina.textContent = "Elimina";
    btnElimina.style.cursor = "pointer";
    btnElimina.addEventListener("click", (e) => {
        e.stopPropagation();
        eliminaCard(cardData.id);
    });

    boxAzioni.appendChild(btnModifica);
    boxAzioni.appendChild(btnElimina);

    cardElement.appendChild(boxAzioni);

    return cardElement;
}

function preparaModificaCard(cardData){
    // Impostiamo la form in modalità modifica
    idCardinModifica = cardData.id;

    // Valorizziamo la form con in dati della card da modificare
    inputTitolo.value = cardData.contenuto.titolo;
    inputSottotitolo.value = cardData.contenuto.sottotitolo;
    inputTesto.value = cardData.contenuto.testo;
    inputImmagine.value = cardData.contenuto.immagine;

    if (formTitle) formTitle.textContent = "Modifica card con ID: " + idCardinModifica;
    if (btnSubmit) btnSubmit.textContent = "Salva Modifiche";
    if (btnRollbackEdit) btnRollbackEdit.style.display = "inline-block";

    form.scrollIntoView({behavior: "smooth"});
}

function resetFormModifica(){
    idCardinModifica = null;

    if (formTitle) formTitle.textContent = "Crea nuova card";
    if (btnSubmit) btnSubmit.textContent = "Crea card";
    if (btnRollbackEdit) btnRollbackEdit.style.display = "none";
}

function eliminaCard(id){
    if (!confirm("Vuoi eliminare la card con ID: " + id + "?")) return;

    cardList = cardList.filter(card => card.id !== id);

    if (idCardinModifica === id){
        form.reset();
        resetFormModifica();
    }

    applicaFiltriGlobali();
}


// --- CODICE OPERATIVO ---
applicaFiltriGlobali();

if (btnRollbackEdit){
    btnRollbackEdit.addEventListener("click", () => {
        form.reset();
        resetFormModifica();
    });
}