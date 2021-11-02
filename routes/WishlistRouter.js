const WishlistController = require('../controllers/WishlistController');
const router = require('express').Router();
const authentication = require('../middlewares/authentication');

router.use(authentication);

router.get('/', WishlistController.Wishlists);
router.post('/', WishlistController.createWishlist);
router.delete('/:id', WishlistController.deleteWishlist);

module.exports = router;