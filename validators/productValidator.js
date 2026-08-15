import { body, param } from "express-validator";

export const createProductValidator = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("price")
        .notEmpty().withMessage("Price is required")
        .isFloat({ min: 0 }).withMessage("Price must be a positive number"),
    body("quantity")
        .notEmpty().withMessage("Quantity is required")
        .isInt({ min: 0 }).withMessage("Quantity must be a positive whole number"),
    body("supplierId")
        .notEmpty().withMessage("Supplier is required")
        .isInt().withMessage("Supplier must be valid"),
];

export const updateProductValidator = [
    param("id").isInt().withMessage("id must be an integer").toInt(),
    body("name").optional().trim().notEmpty().withMessage("Name must not be empty"),
    body("price")
        .optional()
        .isFloat({ min: 0 }).withMessage("Price must be a positive number"),
    body("quantity")
        .optional()
        .isInt({ min: 0 }).withMessage("Quantity must be a positive whole number"),
    body("supplierId").optional().isInt().withMessage("Supplier must be valid"),
];

export const idParamValidator = [
    param("id").isInt().withMessage("id must be an integer").toInt(),
];
