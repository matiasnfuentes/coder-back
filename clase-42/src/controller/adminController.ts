import { DOMAIN } from "../config/config";

export const agregarProducto = (req, res) => {
  res.render("agregar-producto", {
    layout: "agregar-producto",
  });
};
