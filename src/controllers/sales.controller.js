const saleService = require('../services/sales.service');
const {
  validateProduct,
} = require('../middleware/validationProductId');

const listSales = async (_req, res) => {
  const resp = await saleService.listSales();
  console.log('oi');
  res.status(200).json(resp);
};

const listSaleById = async (req, res) => {
  const { id } = req.params;
  const resp = await saleService.listSaleById(id);
  if (!resp) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  res.status(200).json(resp);
};

const doSale = async (req, res) => {
  const requisition = req.body;
  const { message } = validateProduct(requisition);

  if (message.includes('is required')) {
    return res.status(400).json({ message });
  }
  if (message.includes('must be')) {
    return res.status(422).json({ message });
  }

  try {
    const { saleId } = await saleService.doSale(requisition);
    return res.status(201).json({ id: saleId, itemsSold: requisition });
  } catch (e) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = {
  doSale,
  listSales,
  listSaleById,
};