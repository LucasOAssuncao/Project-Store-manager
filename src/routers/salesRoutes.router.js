const express = require('express');
const salesController = require('../controllers/sales.controller');

const router = express.Router();

router.get('/', salesController.listSales);

router.post('/', salesController.doSale);

router.get('/:id', salesController.listSaleById);

module.exports = router;