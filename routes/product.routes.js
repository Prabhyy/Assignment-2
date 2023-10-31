//importing the express app and controller
const express = require('express');
const productController = require('../controllers/product.controller');

//configuring routes and exporting at end
const router = express.Router();

router.get('/api/products', productController.getAllProducts);
router.get('/api/products/:id', productController.getProductById);
router.post('/api/products', productController.createProduct);
router.put('/api/products/:id', productController.updateProduct);
router.delete('/api/products/:id', productController.deleteProduct);
router.delete('/api/products', productController.deleteAllProducts);
router.get('/api/products', productController.getProductsByName);

module.exports = router;
