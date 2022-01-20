

function fibonnaci(numero){

    if( numero < iniciales.primero){
        return iniciales.valorExcepcion
    }
    if(esInicial(numero)){
        return iniciales.base
    }
    
    const terminoPenultimo = numero-iniciales.paso
    const terminoAntepenultimo= numero-2*iniciales.paso

    return fibonnaci(terminoPenultimo) + fibonnaci(terminoAntepenultimo)
}

function esInicial(numero){
    return numero==iniciales.primero || numero==iniciales.segundo
}

const iniciales = {
    primero: 1,
    segundo: 2,
    base: 1,
    paso: 1,
    valorExcepcion: 0
}

//es6 miss u
module.exports = fibonnaci