const express = require('express');
const salesController = require('../controllers/sales.controller');

const router = express.Router();

router.get('/', salesController.listSales);

router.post('/', salesController.doSale);

router.get('/:id', salesController.listSaleById);

router.delete('/:id', salesController.deleteSale);

router.put('/:id', salesController.updateSale);

module.exports = router;