import { Router } from "express";
import { ADMIN_EMAIL } from "../../config/config";
import { transporter, twilioClient } from "../../services/messageService";
import { User } from "../../modelo/types";
import { CarritoService } from "../../services/carritoService";

export const carrito = Router();

carrito.post("/", async (req, res) => {
  const { email } = req.user as User;
  try {
    res.send(await CarritoService.crearCarrito(email));
  } catch (e) {
    res.status(500).send("No se pudo crear el carrito");
  }
});

carrito.post("/:id/productos", async (req, res) => {
  try {
    const carritoId: string = req.params.id;
    const { id, nombre, precio, cantidad, descripcion, codigo, foto } =
      req.body;
    await CarritoService.agregarProductos(carritoId, [
      { id, nombre, precio, stock: cantidad, descripcion, codigo, foto },
    ]);
    res.redirect("/carrito");
  } catch (e: any) {
    res.status(e.status || 500).send(e.message);
  }
});

carrito.get("/finalizar", async (req, res) => {
  const { email, nyap, telefono } = req.user as User;
  try {
    const { productos } = await CarritoService.getByOwnerEmail(email);

    // Notificaciones al admin

    const productList = productos.reduce(
      (prev, current) =>
        prev +
        `<div>Código: ${current.codigo} Nombre: ${current.nombre} Precio: $${current.precio} Cantidad: ${current.stock}</div>`,
      ""
    );
    const mailOptions = {
      from: "E-commerce",
      to: ADMIN_EMAIL,
      subject: "Nuevo pedido",
      html: `<h1>Se ha generado un nuevo pedido:</h1>
      ${productList}`,
    };
    const adminWppNotification = {
      body: `Nuevo pedido de ${nyap}. Mail: ${email}`,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+5491123458427",
    };

    twilioClient.messages.create(adminWppNotification);
    transporter.sendMail(mailOptions);

    // Notificación al usuario
    const userNotification = {
      body: `Tu pedido al e-commerce ha sido recibido y está en proceso.`,
      from: "+19895348213",
      to: telefono,
    };
    twilioClient.messages.create(userNotification);

    // Eliminación del carrito
    await CarritoService.deleteByEmail(email);
    res.redirect("/");
  } catch (e) {
    res.status(500).send("No se pudo concretar la compra");
  }
});
