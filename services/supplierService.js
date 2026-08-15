import { Supplier } from "../models/index.js";

export const SupplierService = {
    getAllSuppliers: () => Supplier.findAll(),

    getSupplierById: (id) => Supplier.findByPk(id),

    createSupplier: (data) =>
        Supplier.create({
            name: data.name,
            contactEmail: data.contactEmail,
            phone: data.phone,
        }),

    updateSupplier: async (id, data) => {
        const supplier = await Supplier.findByPk(id);
        if (!supplier) return null;
        if (data.name !== undefined) supplier.name = data.name;
        if (data.contactEmail !== undefined) supplier.contactEmail = data.contactEmail;
        if (data.phone !== undefined) supplier.phone = data.phone;
        await supplier.save();
        return supplier;
    },

    deleteSupplier: async (id) => {
        const supplier = await Supplier.findByPk(id);
        if (!supplier) return null;
        await supplier.destroy();
        return true;
    },
};
