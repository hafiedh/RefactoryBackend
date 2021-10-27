
const ProductController = require('../controllers/ProductController')
const router = require('express').Router();

router.get('/products', ProductController.getProducts)
module.exports = router;