const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');

const doSale = async (arr) => {
  const productsInDataBase = await Promise.all(
    arr.map(({ productId }) => productsModel.getProductById(productId)),
  );

  const invalidProductId = productsInDataBase.some((e) => !e[0]);

  if (invalidProductId) throw new Error('Product not found');

  const saleId = await salesModel.insertSaleDate();

  await Promise.all(arr.map((e) => salesModel.insertSale({ saleId, ...e })));

  return { saleId }; 
};

const listSales = async () => {
  const sales = await salesModel.listSales();
  return sales;
};

const listSaleById = async (id) => {
  const product = await salesModel.listSaleById(id);

  return product;
};

const deleteSale = async (id) => { 
  await salesModel.deleteSale(id);
};
const updateSale = async (saleId, update) => {
  const productsList = await Promise.all(
    update.map(({ productId }) => productsModel.getProductById(productId)),
  );

  const invalidProduct = productsList.some(
    (product) => !product[0],
  );

  if (invalidProduct) throw new Error('Product not found');

  await salesModel.deleteInSaleProducts(saleId);

  await Promise.all(
    update.map((product) => salesModel.insertSale({ saleId, ...product })),
  );
};

module.exports = {
  doSale,
  listSales,
  listSaleById,
  deleteSale,
  updateSale,
};
