const { describe } = require("mocha");

const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;

const testProduct = {
  name: "test-product",
  description: "just for testing, you know",
  code: "xxxx0002",
  thumbnail: "www.image.com/a-foto",
  price: 500,
  stock: 100,
};

describe("Get products", async () => {
  let id;

  it("Al pedir los productos a la api se debería retornar una lista con todos los productos agregados hasta el momento", async () => {
    let response = await request.get("/api/products/");
    expect(response.status).to.eql(200);
  });

  it("Al agregar un producto la api debe devolver el mismo agregando el ID que se le asigno", async () => {
    let response = await request
      .post("/api/products/", testProduct)
      .send(testProduct);
    id = response.body._id;
    expect(response.status).to.eql(200);
    expect(id).not.to.undefined;
  });

  it("La api debe devolver un 200 con los cambios efectuados al producto", async () => {
    let response = await request
      .put(`/api/products/${id}`)
      .send({ stock: 150 });
    const nuevoStock = response.body.stock;
    expect(response.status).to.eql(200);
    expect(nuevoStock).to.eql(150);
  });

  it("La API debe devolver un 200 si el producto se elimina correctamente", async () => {
    let response = await request.delete(`/api/products/${id}`);
    expect(response.status).to.eql(200);
  });
});
