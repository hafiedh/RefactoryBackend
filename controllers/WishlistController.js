const { Wishlist } = require('../models');

class WishlistController {
    static async Wishlists(req, res, next) {
        try {
            const { id } = req.user;

            const result = await Wishlist.findAll({
                where: { UserId: id }
            })

            res.status(200).json(result)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async createWishlist(req, res, next) {
        try {
            const { id: UserId } = req.user;
            const { quantity } = req.body;
            const { id: ProductId } = req.params;

            const result = await Wishlist.create({ UserId, quantity, ProductId })

            res.status(201).json(result)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async deleteWishlist(req, res, next) {
        try {
            const { id } = req.params;

            await Wishlist.destroy({ where: { id }})

            res.status(200).json({
                message: "Product removed"
            })
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = WishlistController