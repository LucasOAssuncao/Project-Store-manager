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

module.exports = {
  doSale,
};
