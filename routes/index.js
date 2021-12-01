const router = require('express').Router();
const errorHandler = require('../middlewares/errorHandler');
const UserRouter = require('./UserRouter');

router.use('/users', UserRouter);


router.use(errorHandler);

module.exports = router;