
const ProductController = require('../controllers/ProductController')
const router = require('express').Router();

router.get('/products', ProductController.getProducts)
router.post('/products', ProductController.createProduct)
module.exports = router;