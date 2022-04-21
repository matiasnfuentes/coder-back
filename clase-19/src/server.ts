import mongoose from "mongoose";
import { listaDeEstudiantes } from "./listaDeEstudiantes";

/*
Realizar un proyecto en Node.js que se conecte a una base de datos MongoDB local llamada colegio. Utilizar mongoose importándolo en Módulo (import) y gestionar sus acciones a través de promesas.

Crear una colección llamada ‘estudiantes’ que incorporará 10 documentos con la siguiente estructura y datos que se detallan a continuación:
nombre: tipo string
apellido: tipo string
edad: tipo number
dni: tipo string (campo único)
curso: tipo string
nota: tipo number
Todos los campos deben ser requeridos obligatoriamente ({ required: true })

Tomar los valores del siguiente array de objetos
[
    { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
    { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
    { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
    { nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
    { nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
    { nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
    { nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
    { nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
    { nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
    { nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 }
]

Verificar con el cliente Mongo Shell (CLI) que los datos estén almacenados en la base y colección que corresponda.


*/
const mongotest = async () => {
  const URLMONGO: string = "mongodb://localhost:27017/colegio";
  const respuesta = await mongoose.connect(URLMONGO);
  const estudiantesCollection: string = "estudiantes";
  const EstudianteSchema = new mongoose.Schema({
    nombre: { type: String, require: true },
    apellido: { type: String, require: true },
    edad: { type: Number, require: true },
    dni: { type: String, require: true, unique: true },
    curso: { type: String, require: true },
    nota: { type: Number, require: true },
  });
  const Estudiante = mongoose.model(estudiantesCollection, EstudianteSchema);
  //for (const e of listaDeEstudiantes) {
  //  try {
  //    const estudianteSaveModel = new Estudiante(e);
  //    await estudianteSaveModel.save();
  //  } catch (e: any) {
  //    console.log("El usuario: " + e + " ya existe");
  //  }
  //}

  console.log("estudiantes ordenados por sus nombres");
  const estudiantesOrdenadosPorNombre = await Estudiante.find({}).sort({
    nombre: 1,
  });
  console.log(estudiantesOrdenadosPorNombre.map((e) => e.nombre));

  console.log("estudiante mas joven");
  const estudianteMasJoven = await Estudiante.find({})
    .sort({ edad: 1 })
    .limit(1);
  console.log(estudianteMasJoven[0].nombre);

  console.log("estudiantes que pertenecen al curso 2A");
  const estudiantesDosA = await Estudiante.find({ curso: "2A" });
  console.log(estudiantesDosA.map((e) => e.nombre));

  console.log("segundo estudiante mas joven");
  const segundoEstudianteMasJoven = await Estudiante.find({})
    .sort({ edad: 1 })
    .skip(1)
    .limit(1);
  console.log(segundoEstudianteMasJoven[0].nombre);

  console.log("estudiantes ordenados por sus apellido");
  const estudiantesOrdenadosPorApellidoDescendente = await Estudiante.find(
    {},
    { nombre: 1, apellido: 1, curso: 1 }
  ).sort({
    apellido: -1,
  });
  console.log(estudiantesOrdenadosPorApellidoDescendente);

  console.log("estudiantes que sacaron 10: ");

  const estudiantesDe10 = await Estudiante.find({ nota: 10 }, { nombre: 1 });
  console.log(estudiantesDe10);

  console.log("Promedio: ");

  const notas = await Estudiante.find({}, { nota: 1 });
  const cantDeEstudiantes = await Estudiante.countDocuments();
  console.log(
    notas.reduce(
      (previousValue, currentValue) =>
        previousValue + parseInt(currentValue.nota),
      0
    ) / cantDeEstudiantes
  );

  console.log("Promedio del curso 1A: ");

  const notasUnoA = await Estudiante.find({ curso: "1A" }, { nota: 1 });
  const cantDeEstudiantesUnoA = await Estudiante.countDocuments({
    curso: "1A",
  });
  console.log(
    notasUnoA.reduce(
      (previousValue, currentValue) =>
        previousValue + parseInt(currentValue.nota),
      0
    ) / cantDeEstudiantesUnoA
  );
  await Estudiante.updateOne(
    { dni: "30355874" },
    { $set: { dni: "20355875" } }
  );
  await Estudiante.updateMany(
    {},
    { $set: { ingreso: false } },
    { strict: false }
  );

  await Estudiante.updateMany(
    { curso: "1A" },
    { $set: { ingreso: true } },
    { strict: false }
  );
  console.log(await Estudiante.find({ nota: { $gte: 4 } }, { _id: 0, __v: 0 }));
  console.log("Estudiantes con ingreso en true");
  console.log(
    await Estudiante.find(
      { ingreso: true },
      { _id: 0, __v: 0 },
      {
        strict: false,
      }
    )
  );
  await Estudiante.deleteMany({ ingreso: true }, { strict: false });
};

mongotest();
console.log("finish");
