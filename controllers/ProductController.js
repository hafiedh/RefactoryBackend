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
                include: [Store]
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
            const result = await Product.update({ name, type, price, stock, imgUrl, description }, {
                where: { id },
                returning: true
            })
            res.status(200).json(result[1][0])
        } catch (err) {
            console.log(err);
            next(err)
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

    static async deleteProduct(req, res, next) {
        try {
            const { id } = req.params;

            await Product.destroy({ where: { id } })
            res.status(200).json({
                message: "Product deleted"
            })
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = ProductContoller