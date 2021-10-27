const { Product } = require('../models');

class ProductContoller {

    static async getProducts(req, res, next) {
        try {
            const result = await Product.findAll()
            res.status(200).json(result)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ProductContoller