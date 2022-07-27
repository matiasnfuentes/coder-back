const axios = require("axios");

// Add

const testProduct = {
  name: "test-product",
  description: "just for testing, you know",
  code: "xxxx0002",
  thumbnail: "www.image.com/a-foto",
  price: 500,
  stock: 100,
};

const printSeparator = () =>
  console.log(
    "----------------------------------------------------------------"
  );
const printTestFailed = () => {
  console.log("<<<<<<<<<<<</TEST FAILED>>>>>>>>>>>>");
  printSeparator();
};

const testAddProduct = async () => {
  try {
    printSeparator();
    console.log("Testing add product endpoint");
    const res = await axios.post(
      "http://localhost:8080/api/products/",
      testProduct
    );
    const id = res.data._id;
    console.log(`The test was successful. The product id is ${id}`);
    printSeparator();
    return id;
  } catch (e) {
    printTestFailed();
  }
};

const testGetProducts = async (productID) => {
  try {
    printSeparator();
    console.log("Testing get products endpoint");
    const res = await axios.get("http://localhost:8080/api/products/");
    const products = res.data;
    const index = products.findIndex((p) => p._id === productID);
    if (index === -1) {
      throw "Test error";
    }
    console.log(
      `The test was successful. The list contains the product with id ${productID}`
    );
    printSeparator();
  } catch (e) {
    printTestFailed();
  }
};

const testUpdateProduct = async (productID) => {
  try {
    printSeparator();
    console.log("Testing update product endpoint");
    const res = await axios.put(
      `http://localhost:8080/api/products/${productID}`,
      {
        stock: 150,
      }
    );
    const newStock = res.data.stock;
    console.log(
      `The test was successful. The new stock for ${productID}  is ${newStock}`
    );
    printSeparator();
  } catch (e) {
    printTestFailed();
  }
};

const testDeleteProduct = async (productID) => {
  try {
    printSeparator();
    console.log("Testing delete product endpoint");
    const res = await axios.delete(
      `http://localhost:8080/api/products/${productID}`
    );
    console.log(`The test was successful. ${productID}  was deleted`);
    printSeparator();
  } catch (e) {
    printTestFailed();
  }
};

const test = async () => {
  const productID = await testAddProduct();
  await testGetProducts(productID);
  await testUpdateProduct(productID);
  await testDeleteProduct(productID);
};
test();
