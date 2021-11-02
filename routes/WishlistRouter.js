const WishlistController = require('../controllers/WishlistController');
const router = require('express').Router();

router.get('/', WishlistController);
router.post('/:id', WishlistController.createWishlist);
router.delete('/:id', WishlistController.deleteWishlist);

module.exports = router;