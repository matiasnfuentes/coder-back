import { React } from "../deps.ts";
import ColorList from "./colorList.tsx";

interface Proptypes {
  colors: string[];
}

const view = ({ colors }: Proptypes) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>servest</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        ></link>
      </head>
      <body>
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center h-100">
          <form
            method="POST"
            action="/color"
            encType="application/x-www-form-urlencoded"
          >
            <div className="mb-3">
              <label htmlFor="color" className="form-label">
                Color:
              </label>
              <input
                id="color"
                name="color"
                type="text"
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Enviar color
            </button>
          </form>
          <ColorList colors={colors} />
        </div>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
};

export default view;
