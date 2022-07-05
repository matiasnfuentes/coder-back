import express from "express";
import { faker } from "@faker-js/faker";
import { Producto } from "../modelo/types";

faker.locale = "es";

const { Router } = express;

export const products = Router();

// Fake api
const createProducts = (id): Producto => {
  const producto: Producto = {
    id: Math.round(Math.random() * 10000000).toString(),
    descripcion: "un produc",
    codigo: "ABC" + Math.round(Math.random() * 10000000).toString(),
    stock: Math.ceil(Math.random() * 10),
    nombre: faker.commerce.product(),
    precio: parseFloat(faker.finance.amount()),
    foto: faker.image.avatar(),
  };

  return producto;
};

const getAll = (): Producto[] => {
  const productos: Producto[] = [];
  for (let i = 0; i < 5; i++) {
    productos.push(createProducts(i));
  }
  return productos;
};

export const productService = { getAll };
