export const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin)
    return res.status(403).send({
      error: -1,
      descripcion: `ruta ${req.baseUrl + req.path} método ${
        req.method
      } no autorizada`,
    });
  next();
};
