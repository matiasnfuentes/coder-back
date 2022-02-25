class Usuario {
  constructor(nombre, apellido, libros = [], mascotas = []) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    return `${this.nombre}  ${this.apellido}`;
  }

  addMascota(nombre) {
    this.mascotas.push(nombre);
  }

  countMascotas() {
    return this.mascotas.length;
  }

  addLibro(nombre, autor) {
    this.libros.push({ nombre: nombre, autor: autor });
  }

  getBookNames() {
    return this.libros.map((libro) => libro.nombre);
  }
}

/* // Utilización.

let matias = new Usuario(
  "Matias",
  "Fuentes",
  [
    { nombre: "Lord of the Rings", autor: "J. R. R. Tolkien" },
    { nombre: "The Dark Tower", autor: "Stephen King" },
  ],
  ["Luna", "Lady", "Picu", "Negru", "Mockiu", "Gizmo"]
);

// Get nombre
console.log(
  "El nombre completo del usuario es: " + matias.getFullName() + "\n"
);

// Add Mascota
matias.addMascota("Dogui");
console.log("Las mascotas del usuario después de agregar a Dogui son: ");
console.log(matias.mascotas);
console.log("\n")

// Count mascotas
console.log(
  "La cantidad de mascotas del usuario es: " + matias.countMascotas() + "\n"
);

// Add libro
matias.addLibro("Harry Potter", "J. K. Rowling");
console.log("Los libros del usuario después de agregar a Harry Potter son: ");
console.table(matias.libros);
console.log("\n");

// GetBookNames
console.log("Los nombres de los libros del usuario son: ");
console.log(matias.getBookNames());

 */

let sinLibros = new Usuario("sin", "libros");
console.log(sinLibros);

let conLibros = new Usuario("con", "libros", ["asd"], ["asdasd"]);
console.log(conLibros);
