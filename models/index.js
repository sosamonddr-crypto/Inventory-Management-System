import { Product } from "./productModel.js";
import { Supplier } from "./supplierModel.js";
import { User } from "./userModel.js";

Supplier.hasMany(Product, { foreignKey: "supplierId" });
Product.belongsTo(Supplier, { foreignKey: "supplierId" });

export { Product, Supplier, User };
