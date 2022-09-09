const productService = require('../services/products.service');

const getProducts = async (_req, res) => {
  const resp = await productService.getProducts();
  res.status(200).json(resp);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const resp = await productService.getProductById(id);
  if (!resp[0]) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(resp[0]);
};

const postProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productService.postProduct(name);
  if (type) return res.status(type).json({ message });
  res.status(201).json(message);
};

module.exports = {
  getProducts,
  getProductById,
  postProduct,
};
