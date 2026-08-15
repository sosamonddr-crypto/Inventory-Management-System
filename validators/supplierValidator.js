import { body, param } from "express-validator";

export const createSupplierValidator = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("contactEmail")
        .trim()
        .notEmpty().withMessage("Contact email is required")
        .isEmail().withMessage("Must be a valid email"),
    body("phone").trim().notEmpty().withMessage("Phone is required"),
];

export const updateSupplierValidator = [
    param("id").isInt().withMessage("id must be an integer").toInt(),
    body("name").optional().trim().notEmpty().withMessage("Name must not be empty"),
    body("contactEmail").optional().trim().isEmail().withMessage("Must be a valid email"),
    body("phone").optional().trim().notEmpty().withMessage("Phone must not be empty"),
];

export const idParamValidator = [
    param("id").isInt().withMessage("id must be an integer").toInt(),
];
