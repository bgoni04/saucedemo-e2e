const classifyTriangle = require('./classifyTriangle');

  // =============================
  // 1. TEST PARA TRIANGULOS VALIDOS
  // =============================

test('Triangulo es equilatero', () => {
  expect(classifyTriangle(3, 3, 3)).toBe("Equilatero");
});

test('Triangulo es isosceles', () => {
  expect(classifyTriangle(3, 3, 5)).toBe("Isosceles");
});

test('Triangle es escaleno', () => {
  expect(classifyTriangle(3, 4, 5)).toBe("Escaleno");
});

  // =============================
  // 2. TEST PARA TRIANGULOS INVALIDOS
  // =============================

test('Triángulos imposibles', () => {

  const cases = [
    [10, 3, 4],
    [3, 10, 4],
    [3, 4, 10],
  ];

  cases.forEach(([a, b, c]) => {
    expect(classifyTriangle(a, b, c)).toBe("Invalido");
  });
});

test('Triangulos con lados de longitud 0', () =>{

  const cases = [
    [10, 3, 0],
    [10, 0, 0],
    [0, 0, 0],
  ];

    cases.forEach(([a, b, c]) => {
    expect(classifyTriangle(a, b, c)).toBe("Invalido");
  });

})

test('Triangulos con lados negativos', () =>{

  const cases = [
    [-3, 3, 3],
    [3, -3, 3],
    [3, 3, -3],
  ];

    cases.forEach(([a, b, c]) => {
    expect(classifyTriangle(a, b, c)).toBe("Invalido");
  });

})

test('Triangulos con lados con punto flotante', () =>{

  const cases = [
    [3.2, 3, 3],
    [3, 3.2, 3],
    [3, 3, 3.2],
  ];

    cases.forEach(([a, b, c]) => {
    expect(classifyTriangle(a, b, c)).toBe("Invalido");
  });

})

test('Triangulos con parametros faltantes', () =>{

  const cases = [
    [3, 2, 1],
    [3, 3],
    [3],
  ];

    cases.forEach(([a, b, c]) => {
    expect(classifyTriangle(a, b, c)).toBe("Invalido");
  });

})

