export const isAdmin = async (ctx, next) => {
  if (!ctx.state.user.isAdmin)
    return ctx.throw(403, {
      error: -1,
      descripcion: `ruta ${ctx.baseUrl + ctx.path} método ${
        ctx.method
      } no autorizada`,
    });
  await next();
};
