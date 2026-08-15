import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Supplier = sequelize.define(
    "Supplier",
    {
        name: { type: DataTypes.STRING, allowNull: false },
        contactEmail: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
    },
    {
        tableName: "suppliers",
        timestamps: true,
    },
);
