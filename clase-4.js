const fs = require("fs");

export class Contenedor {
  constructor(nombreDelArchivo) {
    this.nombreDelArchivo = nombreDelArchivo;
  }

  async contenidoActual() {
    const contenido = await fs.promises.readFile(
      "./" + this.nombreDelArchivo,
      "utf-8"
    );
    return JSON.parse(contenido);
  }

  async save(object) {
    try {
      const productos = await this.contenidoActual();
      const id = productos[productos.length - 1].id + 1;
      await fs.promises.writeFile(
        this.nombreDelArchivo,
        JSON.stringify([...productos, { ...object, id: id }])
      );
      return id;
    } catch (e) {
      try {
        await fs.promises.writeFile(
          this.nombreDelArchivo,
          JSON.stringify([{ ...object, id: 0 }])
        );
        return 0;
      } catch (e) {
        console.log("No se pudo guardar el objeto");
      }
    }
  }

  async getById(number) {
    try {
      const productos = await this.contenidoActual();
      return productos[number];
    } catch (e) {
      console.log(
        "No se pudo leer el contedio del archivo, problablemente no exista o este vacío"
      );
    }
  }

  async getAll() {
    try {
      const prod = await this.contenidoActual();
      return prod;
    } catch (e) {
      console.log(
        "No se pudo leer el contedio del archivo, problablemente no exista o este vacío"
      );
    }
  }

  async deleteById(id) {
    try {
      let productos = await this.contenidoActual();
      productos.splice(id, 1);
      await fs.promises.writeFile(
        this.nombreDelArchivo,
        JSON.stringify(productos)
      );
    } catch (e) {
      console.log("No se puede eliminar el producto con ese id");
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.nombreDelArchivo, JSON.stringify([]));
    } catch (e) {
      console.log(
        "No se pudieron eliminar los productos , intente nuevamente."
      );
    }
  }
}

const contenedor = new Contenedor("archivo.txt");

const main = async () => {
  console.log("Guardo dos productos: ");

  const idProdCero = await contenedor.save({
    title: "Pelota",
    price: 100,
    thumbnail: "pelota.jpg",
  });

  console.log("Guarde el producto con id : " + idProdCero);

  const idProdUno = await contenedor.save({
    title: "Paleta",
    price: 100,
    thumbnail: "Paleta.jpg",
  });

  console.log("Guarde el producto con id : " + idProdUno);

  const prodUno = await contenedor.getById(0);
  console.log("El producto con el id 0 es: " + JSON.stringify(prodUno));

  const prodDos = await contenedor.getById(1);
  console.log("El producto con el id 1 es: " + JSON.stringify(prodDos));

  const todosLosProductos = await contenedor.getAll();

  console.log("Todos los productos son: " + JSON.stringify(todosLosProductos));

  await contenedor.deleteAll();
};

main();
