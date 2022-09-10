const connection = require('./connection');

const insertSale = async ({ saleId, productId, quantity }) => {
  const query = `
  INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?, ?, ?);`;
  await connection.execute(query, [saleId, productId, quantity]);
  return saleId;
};

const insertSaleDate = async () => {
  const query = `
  INSERT INTO StoreManager.sales (date)
  VALUES (NOW());`;
  const [sale] = await connection.execute(query);

  return sale.insertId;
};

module.exports = {
  insertSale,
  insertSaleDate,
};
