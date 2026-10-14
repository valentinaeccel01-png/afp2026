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

    if (x < 50 && y < 50){
        console.log("Siamo a sinistra");
    }else {
        console.log("Siamo a destra ´");
    }
});