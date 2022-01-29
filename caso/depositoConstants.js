

const tipoDeCambio = {
    'dolares-soles': 3.84,
    'soles-dolares': 0.26
}


const bancoDepositoDisponible = {
   ScotiaBank: true,
   InterBank: true 
}

const transactions = []

module.exports = {
    tipoDeCambio,
    bancoDepositoDisponible,
    transactions
}



/*

scotia -> dolares y Soles -> realiza cambio y se acepta en billetes de 50 y 100 soles
inter -> dolares


yo quiero depositar 300 dolares -> 300*factorCambio -> function cantidadBilletesScotia(valor) -> 

valor = 50x + 100y + algo
valor - algo = valorAdepositar
depositoScotia(valorAdepositar)
cuenta va a slair en dolares
*/