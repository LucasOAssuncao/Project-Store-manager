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

const listSales = async () => {
  const [result] = await connection.execute(
    `SELECT sale_id as saleId, date, product_id as productId, quantity 
      FROM StoreManager.sales_products as sp
      JOIN sales as s
      ON sp.sale_id = s.id
      ORDER BY sale_id, product_id`,
  );
  return result;
};

const listSaleById = async (id) => {
  const [salesId] = await connection.execute(
    `SELECT date, product_id as productId, quantity 
      FROM StoreManager.sales_products as sp
      JOIN sales as s
      ON sp.sale_id = s.id
      WHERE sp.sale_id = ?
      ORDER BY sale_id, product_id`,
    [id],
  );
  if (salesId.length === 0) return null;
  return salesId;
};

module.exports = {
  insertSale,
  insertSaleDate,
  listSales,
  listSaleById,
};
