
const ProductController = require('../controllers/ProductController')
const router = require('express').Router();

router.get('/products', ProductController.getProducts);
router.get('/products/:id', ProductController.detailProduct);
router.put('/products/:id', ProductController.editProduct);
router.post('/products', ProductController.createProduct);
router.delete('/products/:id', ProductController.deleteProduct);

module.exports = router;