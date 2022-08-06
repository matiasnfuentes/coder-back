import { React, ReactDOMServer } from "./deps.ts";
import { createApp } from "./deps.ts";
import View from "./views/view.tsx";

const app = createApp();
const colors = ["red", "blue"];

app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(View({ colors: colors })),
  });
});

app.post("/color", async (req) => {
  const color = (await req.text()).split("color=")[1];
  colors.push(color);
  req.redirect("/");
});

app.listen({ port: 8888 });
