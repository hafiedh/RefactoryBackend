const router = require('express').Router();
const StoreController = require('../controllers/StoreController');
const authentication = require('../middlewares/authentication');

router.use(authentication);

router.get('/', StoreController.getStore);
router.post('/', StoreController.createStore);
router.put('/:id', StoreController.editStore);

module.exports = router;