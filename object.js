let persona = {
    nome:"Mario",
    cognome : "Rossi",
    eta : 30,
    professore : true,
    saluta :(fnCallBack) => {
        fnCallBack();
    },
    residenza : {
        via : "via Roma",
        citta : "Milano",
        cap : 20100
    }
}

function salutoCordiale (){
    console.log("buongiorno, come va la giornata");
}

function salutoAlBro (){
    console.log("ciao bro, come va la giornata");
}

persona.saluta(salutoCordiale, salutoAlBro);
console.log(()=>{
    console.log("Buongiorno signor presidente");
});



//console.log(persona.nome); //"Mario"
//persona.cognome = "Milani";
//console.log(persona.residenza.citta);