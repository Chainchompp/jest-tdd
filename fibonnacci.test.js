
fibonnaci = require('./fibonnacci')

test('fibbonacci de 1 debe retornar 1', 
()=>{
    expect(fibonnaci(1)).toBe(1)
})

test('fibbonacci de 2 debe retornar 1', 
()=>{
    expect(fibonnaci(2)).toBe(1)
})

test('fibbonacci de 3 debe retornar 2', 
()=>{
    expect(fibonnaci(3)).toBe(2)
})


test('fibbonacci de 4 debe retornar 3', 
()=>{
    expect(fibonnaci(4)).toBe(3)
})

test('fibbonacci de 10 debe retornar 55', 
()=>{
    expect(fibonnaci(10)).toBe(55)
})

test('fibbonacci de 0 debe retornar 0', 
()=>{
    expect(fibonnaci(0)).toBe(0)
})

test('fibbonacci de -1 debe retornar 0', 
()=>{
    expect(fibonnaci(-1)).toBe(0)
})

