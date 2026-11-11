const controlloNUmerico = 
    new Promise((resolve, reject) => {
        const numero = Math.floor(Math.random() * 10);

        if (numero >= 5) {
            resolve(`[OK] - Numero estratto maggiore di 5`);
        }else {
            reject(new Error(`[OK] - Numero estratto minore di 5`));
        }
    });

console.log(controlloNUmerico);

/**
 * .then()   try
 * .catch()  catch
 * .finally()
 */


controlloNUmerico
    .then((res) => console.log(res))
    .catch((err) => console.log("Errore intercettato" , err.message))
    .finally(() => console.log('Termine della promise'));