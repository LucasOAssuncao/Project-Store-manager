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

const updateProduct = async (req, res) => { 
const { id } = req.params;
const { name } = req.body;

if (!name) {
  return res.status(400).json({ message: '"name" is required' });
}

if (name.length < 5) {
  return res.status(422).json({
    message: '"name" length must be at least 5 characters long',
  });
}

const [updated] = await productService.updateProduct({ id, name });

if (!updated) {
  return res.status(404).json({ message: 'Product not found' });
}

return res.status(200).json(updated);
};

const deleteProduct = async (request, response) => {
  const { id } = request.params;

  const resp = await productService.getProductById(id);

  if (!resp[0]) {
    return response.status(404).json({ message: 'Product not found' });
  }

  await productService.deleteProduct(id);
  return response.sendStatus(204);
};

module.exports = {
  getProducts,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
};
