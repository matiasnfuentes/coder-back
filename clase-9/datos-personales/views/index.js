const template = Handlebars.compile(
  `
<h1>Datos Personales</h1>
<ul>
    <li>{{nombre}})</li>
    <li>{{apellido}}</li>
    <li>{{edad}})</li>
    <li>{{email}}</li>
    <li>{{telefono}}</li>
</ul>
`
); // compila la plantilla

const html = template({
  nombre: "Matias",
  apellido: "Fuentes",
  edad: 29,
  email: "miMail@gmail.com",
  telefono: "4205-9999",
}); // genera el html

document.getElementById("container").innerHTML = html; // inyecta el resultado en la vista
