const {
    deposito,
    validarDepositoScotiaBank
} = require('./depositos')

const {
    bancoDepositoDisponible
} = require('./depositoConstants')


test('No se puede realizar un deposito en ScotiaBank si este supera los 1000 dolares ',()=>{
    const cuenta = {
        ScotiaBank: 7000,
        InterBank: 2000,
        Efectivo: 100
    }
    validarDepositoScotiaBank(cuenta)
    expect(bancoDepositoDisponible.ScotiaBank).toBe(false)
})

test('Solo se puede realizar depositos con billetes de 100 y 50 en ScotiaBank',()=>{
    const cuenta = {
        ScotiaBank: 1000,
        InterBank: 2000,
        Efectivo: 5070
    }
    const bancoOrigen = 'Efectivo'
    const bancoDestino = 'ScotiaBank'
    const efectivoActual = cuenta.Efectivo
    const scotiaActual = cuenta.ScotiaBank 
    deposito(cuenta,bancoDestino,bancoOrigen,5070)
    expect(cuenta.Efectivo).toBe(efectivoActual+20)
    expect(cuenta.ScotiaBank).toBe(scotiaActual+5050)

})


test('Los depositos en InterBank se realizan en miles de dolares',()=>{
    const cuenta = {
        ScotiaBank: 1000,
        InterBank: 2000,
        Efectivo: 100
    }
    const bancoOrigen = 'Efectivo'
    const bancoDestino = 'InterBank'
    const efectivoActual = cuenta.Efectivo
    const InterBankActual = cuenta.InterBank 
    deposito(cuenta,bancoDestino,bancoOrigen,5000)
    expect(cuenta.InterBank).toBe(InterBankActual+1000)
    expect(cuenta.Efectivo).toBe(efectivoActual+1152)
   
})

test('Si no se puede depositar de Efectivo a ScotiaBank, se deposita de Efectvio a InterBank',()=>{
    const cuenta = {
        ScotiaBank: 6000,
        InterBank: 2000,
        Efectivo: 100
    }
    const bancoOrigen = 'Efectivo'
    const bancoDestino = 'ScotiaBank'
    const efectivoActual = cuenta.Efectivo
    const InterBankActual = cuenta.InterBank 
    deposito(cuenta,bancoDestino,bancoOrigen,5000)
    expect(cuenta.InterBank).toBe(InterBankActual+1000)
    expect(cuenta.Efectivo).toBe(efectivoActual+1152)
})

test('Si no se puede depositar de Efectivo a InterBank, se deposita de Efectvio a ScotiaBank',()=>{
    const cuenta = {
        ScotiaBank: 1000,
        InterBank: 2000,
        Efectivo: 100
    }
    const bancoOrigen = 'Efectivo'
    const bancoDestino = 'InterBank'
    const efectivoActual = cuenta.Efectivo
    const scotiaActual = cuenta.ScotiaBank 
    deposito(cuenta,bancoDestino,bancoOrigen,670)
    expect(cuenta.ScotiaBank).toBe(scotiaActual+650)
    expect(cuenta.Efectivo).toBe(efectivoActual+20)
   
})

test('Si no se puede depositar de Efectivo a InterBank ni ScotiaBank, se transfiere TODO de ScotiaBank a InterBank',()=>{
    const cuenta = {
        ScotiaBank: 7000,
        InterBank: 2000,
        Efectivo: 100
    } 
    const bancoOrigen = 'Efectivo'
    const bancoDestino = 'ScotiaBank'
    const interActual = cuenta.InterBank
    deposito(cuenta,bancoDestino,bancoOrigen,670)
    expect(cuenta.InterBank).toBe(interActual+1000)
    expect(cuenta.ScotiaBank).toBe(3817.728)
    
})

