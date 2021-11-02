const { Product, Store } = require('../models');

class ProductContoller {

    static async getProducts(req, res, next) {
        try {
            const result = await Product.findAll()
            res.status(200).json(result)
        } catch (error) {
            console.log(error);
        }
    }

    static async detailProduct(req, res, next) {
        try {
            const { id } = req.params;

            const product = await Product.findByPk(id, {
                include: [ Store ]
            })
            res.status(200).json(product)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async editProduct(req, res, next) {
        try {
            const { id } = req.params;
            const { name, type, price, stock, imgUrl, description } = req.body;
            // const { id: StoreId } = req.store; >> SETELAH AUTHENTIKASI

            const result = await Product.update({ name, type, price, stock, imgUrl, description, StoreId }, {
                where: { id },
                returning: true
            })

            res.status(200).json(result[1][0])
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = ProductContoller