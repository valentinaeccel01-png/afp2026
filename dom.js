//intercettare elementi html

let header = document.getElementById("header_afp");
//let mainContent = document.getElementById("main_content");

let maniContent= document.querySelector("#main-content")
let Card = document.querySelectorAll(".card");
console.log(header);
console.log(Card);
console.log(maniContent);

maniContent.style.border = "8px dotted orange";
header.style.color ="red"

header.addEventListener("click", (event) => {
    console.log("header cliccato ")
    let x = event.x;
    let y = event.y;

    if (x < 50 ){
        console.log("Siamo a sinistra");
        let bgActive =header.classList.toggle("bg-green");

    }else {
        console.log("Siamo a destra ´");
    }

    switch (true){
        case x<50:
            console.log("x<50 andiamo a sx");
            break;
        case x>50 && x<200:
            console.log("x<50 andiamo a dx");
            break;
        default:
            console.log("fuori range")
    };
});

let lettere =["B", false, 56, () => {return Nan}, null];

lettere.slice(2, 1);

for (let i = 0; i < lettere.length; i++) {
    //let item = lettere.at(i);
    let item = lettere[i];
    console.log(typeof item);

    if (Array.isArray(item)) {
       console.log("elemento in posizione" + i + "è un array");
       continue
    }

    if (item === null) {
        console.log("elemento in posizione" + i + "è null");
        continue
    }

    if (item() === "object"){
        console.log("elemento in posizione" + i + "è object");
        continue;
    }

    if (isNaN(item)) {
        console.log("elemento in posizione" + i + "è NaN");
        continue
    }

    console.log(`elemento in posizione${i} : ${item} di tipo ${typeof item}`);
}

lettere.map(() => {
    console.log(item);
});
