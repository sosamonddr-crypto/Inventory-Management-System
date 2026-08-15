import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Product = sequelize.define(
    "Product",
    {
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: { min: 0 },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 0 },
        },
        imageUrl: { type: DataTypes.STRING, allowNull: true },
    },
    {
        tableName: "products",
        timestamps: true,
    },
);
