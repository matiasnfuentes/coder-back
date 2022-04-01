/*

En otro archivo llamado superficie.ts se implementará una clase llamada Superficie que 
contenga tres métodos estáticos para calcular la superficie de las mismas tres figuras.
Los dos módulos se importarán en server.js.

*/

import { Cuadrado, Rectangulo, Circulo } from "./figuras";

class Superficie {
  static cuadrado(cuadrado: Cuadrado) {
    return Math.pow(2, cuadrado.lado);
  }

  static rectangulo(rectangulo: Rectangulo) {
    return rectangulo.base * rectangulo.altura;
  }

  static circulo(circulo: Circulo) {
    return Math.PI * Math.pow(circulo.radio, 2);
  }
}

export default Superficie;
