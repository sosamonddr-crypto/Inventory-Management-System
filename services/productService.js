import { Product, Supplier } from "../models/index.js";
import { Op } from "sequelize";

export const ProductService = {
    getAllProducts: (query = {}) => {
        const where = {};
        if (query.search) {
            where.name = { [Op.like]: `%${query.search}%` };
        }
        if (query.supplierId) {
            where.supplierId = query.supplierId;
        }
        return Product.findAll({ where, include: Supplier });
    },

    getProductById: (id) => Product.findByPk(id, { include: Supplier }),

    createProduct: (data) =>
        Product.create({
            name: data.name,
            description: data.description,
            price: data.price,
            quantity: data.quantity,
            supplierId: data.supplierId,
            imageUrl: data.imageUrl,
        }),

    updateProduct: async (id, data) => {
        const product = await Product.findByPk(id);
        if (!product) return null;
        if (data.name !== undefined) product.name = data.name;
        if (data.description !== undefined) product.description = data.description;
        if (data.price !== undefined) product.price = data.price;
        if (data.quantity !== undefined) product.quantity = data.quantity;
        if (data.supplierId !== undefined) product.supplierId = data.supplierId;
        if (data.imageUrl !== undefined) product.imageUrl = data.imageUrl;
        await product.save();
        return product;
    },

    deleteProduct: async (id) => {
        const product = await Product.findByPk(id);
        if (!product) return null;
        await product.destroy();
        return true;
    },
};
