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

const updateProduct = async ({ id, name }) => {
  const updatedProduct = await productsModel.updateProduct({ id, name });

  return updatedProduct;
};

const deleteProduct = async (id) => { 
  await productsModel.deleteProduct(id);
};

module.exports = {
  getProducts,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
};
