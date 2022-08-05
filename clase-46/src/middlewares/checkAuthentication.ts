export const checkAuthentication = async (ctx, next) => {
  console.log("middleware");
  console.log(ctx.isAuthenticated());
  if (ctx.isAuthenticated()) {
    console.log("is good");
    await next();
  } else {
    ctx.redirect("/login");
  }
};
