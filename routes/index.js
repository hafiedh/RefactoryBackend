const router = require('express').Router();
const errorHandler = require('../middlewares/errorHandler');
const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const StoreRouter = require('./storeRouter');

router.use('/users', UserRouter);
router.use('/', ProductRouter);
router.use('/store', StoreRouter);

router.use(errorHandler);

module.exports = router;