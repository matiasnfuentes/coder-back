/*

Realizar un proyecto TypeScript node.js que genere un color aleatorio en formato RGB (canal rojo, verde y azul entre 0 y 255) y lo muestre por consola.
La funcionalidad debe estar implementada dentro de una clase en un archivo color.ts y deberá utilizar sintaxis Typescript tipada. 
El proyecto deberá convertir este código TS a JS5 en forma automática con TSC CLI

*/

// run compilation in watch mode : node_modules/.bin/tsc ./typescript/index.ts -w

const generarColorAleatorio = (): number => Math.round(Math.random() * 256);

const red: number = generarColorAleatorio();
const green: number = generarColorAleatorio();
const azul: number = generarColorAleatorio();

const RGB: string = `(${red}, ${green}, ${azul})`;

console.log(RGB);

export {};
