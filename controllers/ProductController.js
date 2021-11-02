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

    static async createProduct(req, res, next) {
        try {
            let { StoreId, name, type, stock, imgUrl, description } = req.body;
            const result = await Product.create({ StoreId, name, type, stock, imgUrl, description });
            res.status(201).json({
                name: result.name,
                storeId: result.StoreId,
                type: result.type,
                stock: result.stock,
                imgUrl: result.imgUrl,
                description: result.description,
                id: result.id
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ProductContoller