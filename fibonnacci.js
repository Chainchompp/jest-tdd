const iniciales = {
    primero: 1,
    segundo: 2,
    base: 1,
    paso: 1,
    valorExcepcion: 0
}


function esInicial(numero){
    return numero==iniciales.primero || numero==iniciales.segundo
}

function fibonnaci(numero){

    if( numero < iniciales.primero){
        return iniciales.valorExcepcion
    }
    if(esInicial(numero)){
        return iniciales.base
    }
    
    const terminoPenultimo = numero-iniciales.paso
    const terminoAntepenultimo= terminoPenultimo-iniciales.paso

    return fibonnaci(terminoPenultimo) + fibonnaci(terminoAntepenultimo)
}




//es6 miss u
module.exports = fibonnaci