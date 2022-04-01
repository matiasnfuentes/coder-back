/*

Se implementará una clase llamada Perimetro que contenga tres métodos 
estáticos para calcular el perímetro de un cuadrado, un rectángulo y un círculo. 
Esta clase se guardará en un archivo llamado perimetro.ts  

*/

import { Cuadrado, Rectangulo, Circulo } from "./figuras";

class Perimetro {
  static cuadrado(cuadrado: Cuadrado) {
    return cuadrado.lado * 4;
  }
  static rectangulo(rectangulo: Rectangulo) {
    return rectangulo.base * 2 + rectangulo.altura * 2;
  }
  static circulo(circulo: Circulo) {
    return 2 * Math.PI * circulo.radio;
  }
}

export default Perimetro;
