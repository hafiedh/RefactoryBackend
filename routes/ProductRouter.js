
const ProductController = require('../controllers/ProductController')
const router = require('express').Router();

router.get('/products', ProductController.getProducts);
router.get('/products/:id', ProductController.detailProduct);
router.post('/products/:id', ProductController.editProduct);
module.exports = router;