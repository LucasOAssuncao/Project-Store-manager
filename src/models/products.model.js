const connection = require('./connection');

const getProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};

const getProductById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return result;
};

const postProduct = async (name) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  const product = { id: result.insertId, name };
  return product;
};

const updateProduct = async ({ id, name }) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = (?) WHERE id = (?)',
    [name, id],
  );

  const updatedProduct = await getProductById(id);

  return updatedProduct;
};

module.exports = {
  getProducts,
  getProductById,
  postProduct,
  updateProduct,
};
