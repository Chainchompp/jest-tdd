

const { 
    tipoDeCambio,
    bancoDepositoDisponible,
    transactions
} = require('./depositoConstants')

function deposito(cuenta,bancoDestino,bancoOrigen, montoTotal){
    if(bancoDestino == 'InterBank'){
        depositoInterbank(cuenta,montoTotal,bancoOrigen)
    }
    
    if(bancoDestino == 'ScotiaBank'){
        depositoScotiabank(cuenta,montoTotal,bancoOrigen)
    }
}

function validarDepositoScotiaBank(cuenta){
    if(cuenta.ScotiaBank*tipoDeCambio['soles-dolares']>1000){
        bancoDepositoDisponible.ScotiaBank = false
        return
    }
    bancoDepositoDisponible.ScotiaBank = true
}

function validarCantidadDepositadaScotiaBank(monto){
    const montoSobrante = monto%50
    const montoParaDepositar = monto - montoSobrante
   
    return {
        montoParaDepositar,
        montoSobrante
    }
     
}
function validarCantidadDepositadaInterBank(monto){
    const montoEnDolares = monto*tipoDeCambio['soles-dolares']
    const montoSobrante = montoEnDolares%1000
    const montoParaDepositar = montoEnDolares-montoSobrante
   
    return {
        montoParaDepositar,
        montoSobrante
    }
     
}

function depositoScotiabank(cuenta,montoTotal,bancoOrigen){
    validarDepositoScotiaBank(cuenta)
    if(bancoDepositoDisponible.ScotiaBank==true){
        const {montoParaDepositar,montoSobrante} = validarCantidadDepositadaScotiaBank(montoTotal)
        cuenta.ScotiaBank = montoParaDepositar + cuenta.ScotiaBank
        cuenta[bancoOrigen] = montoSobrante + cuenta[bancoOrigen]
        bancoDepositoDisponible.InterBank= true
        bancoDepositoDisponible.ScotiaBank= true
        transactions.push({
            bancoOrigen: bancoOrigen,
            bancoDestino: 'ScotiaBank',
            montoTransferido: montoParaDepositar,
            fecha: 'hoy'
        })
        return
    }
    if(bancoOrigen == 'Efectivo' && bancoDepositoDisponible.InterBank ==true){
        deposito(cuenta,'InterBank',bancoOrigen, montoTotal)
    }

}

function depositoInterbank(cuenta,montoTotal,bancoOrigen){
    validarDepositoInterBank(montoTotal)
    if(bancoDepositoDisponible.InterBank == true){
        const {montoParaDepositar,montoSobrante} = validarCantidadDepositadaInterBank(montoTotal)
        const traspaso = (bancoOrigen=='ScotiaBank') ? 0 : cuenta[bancoOrigen] 
        cuenta.InterBank = montoParaDepositar + cuenta.InterBank
        cuenta[bancoOrigen] = montoSobrante*tipoDeCambio['dolares-soles'] + traspaso 
        bancoDepositoDisponible.InterBank= true
        bancoDepositoDisponible.ScotiaBank= true
        transactions.push({
            bancoOrigen: bancoOrigen,
            bancoDestino: 'InterBank',
            montoTransferido: montoParaDepositar,
            fecha: 'hoy'
        })
        return
    }
    if(bancoOrigen == 'Efectivo' && bancoDepositoDisponible.ScotiaBank ==true){
        deposito(cuenta,'ScotiaBank',bancoOrigen, montoTotal)
    }else{
        deposito(cuenta,'InterBank','ScotiaBank', cuenta.ScotiaBank+montoTotal)
    }
}

function validarDepositoInterBank(montoTotal){
    if(montoTotal*tipoDeCambio['soles-dolares']<1000){
        bancoDepositoDisponible.InterBank = false
        return
    }
    bancoDepositoDisponible.InterBank = true

}



module.exports = {
    deposito,
    validarDepositoScotiaBank
}