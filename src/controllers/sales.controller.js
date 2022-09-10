const saleService = require('../services/sales.service');
const {
  validateProduct,
} = require('../middleware/validationProductId');

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
};