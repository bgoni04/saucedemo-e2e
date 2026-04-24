function classifyTriangle(a, b, c) {
  // 1. Validar numero de parametros
  if (arguments.length !== 3) {
    return "Invalido";
  }

  const sides = [a, b, c];

  // 2. Validar tipos
  if (!sides.every(x => Number.isInteger(x) && Number.isFinite(x))) {
    return "Invalido";
  }

  // 3. Validar no cero y no negativo
  if (sides.some(x => x <= 0)) {
    return "Invalido";
  }

  // 4. Desigualdad triangular
  if (a + b <= c || a + c <= b || b + c <= a) {
    return "Invalido";
  }

  // 5. Clasificación
  if (a === b && b === c) return "Equilatero";
  if (a === b || a === c || b === c) return "Isosceles";
  return "Escaleno";
}

module.exports = classifyTriangle;