console.log("Ciao a tutti");

const p =3.14;
let nStudenti = 15;
var nProfessori = 1;

let presentiInAula; //undefined 

console.log("valore pi "+ p)
console.log("numero studenti " + nStudenti);
console.log("numero professori " + nProfessori);
console.log("numero presnti in aula " + presentiInAula);

presentiInAula = nProfessori+nStudenti;

console.log("totale presenti: ", presentiInAula);

let pranzo = undefined;
let esame = null;
let NomeStudente = NaN; 

let parole = "casa";
let char = 'g';
let vettori =[];
let oggetti = {};
let bandiera = true;
let simboli = Symbol;  

function NomeFunzione (){
    
};

function Somma (a, b){
    let res = a + b;
    return res; 
};

 Somma(); 

console.log(Somma(3,4));

const sottrazione = (a,b) => {return a-b;};

console.log(sottrazione(5,2));
