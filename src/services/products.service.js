const productsModel = require('../models/products.model');

const getProducts = async () => {
  const products = await productsModel.getProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);

  return product;
};

const postProduct = async (name) => {
  const productPosted = await productsModel.postProduct(name);

  return { type: null, message: productPosted };
};

module.exports = {
  getProducts,
  getProductById,
  postProduct,
};
