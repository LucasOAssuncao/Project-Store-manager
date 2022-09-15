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

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const sale = await saleService.listSaleById(id);

  if (!sale) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  await saleService.deleteSale(id);
  return res.sendStatus(204);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  const { message } = validateProduct(update);

  if (message.includes('is required')) { return res.status(400).json({ message }); }

  if (message.includes('must be')) {
    return res.status(422).json({ message });
  }

  const sale = await saleService.listSaleById(id);

  if (!sale) return res.status(404).json({ message: 'Sale not found' });

  try {
    await saleService.updateSale(id, update);
    return res
      .status(200)
      .json({ saleId: id, itemsUpdated: update });
  } catch (e) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = {
  doSale,
  listSales,
  listSaleById,
  deleteSale,
  updateSale,
};