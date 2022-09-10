const express = require('express');
const productsController = require('../controllers/products.controller');
const validateNameOfProduct = require('../middleware/validationNameValue');

const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/:id', productsController.getProductById);

router.post('/', validateNameOfProduct.validateName, productsController.postProduct);

module.exports = router;