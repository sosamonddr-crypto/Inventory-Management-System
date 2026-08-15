import { Router } from "express";
import {
    getSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier,
} from "../controllers/supplierControllers.js";
import { validate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import {
    createSupplierValidator,
    updateSupplierValidator,
    idParamValidator,
} from "../validators/supplierValidator.js";

const router = Router();

router.use(requireAuth);

router.get("/", getSuppliers);
router.get("/:id", idParamValidator, validate, getSupplierById);
router.post("/", createSupplierValidator, validate, createSupplier);
router.put("/:id", updateSupplierValidator, validate, updateSupplier);
router.delete("/:id", idParamValidator, validate, deleteSupplier);

export default router;
