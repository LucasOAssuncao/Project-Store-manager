const express = require('express');
const productsController = require('../controllers/products.controller');
const validateNameOfProduct = require('../middleware/validationNameValue');

const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/:id', productsController.getProductById);

router.put('/:id', productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

router.post('/', validateNameOfProduct.validateName, productsController.postProduct);

module.exports = router;