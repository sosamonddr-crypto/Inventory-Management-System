import { Router } from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productControllers.js";
import { validate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import { upload } from "../middlewares/upload.js";
import {
    createProductValidator,
    updateProductValidator,
    idParamValidator,
} from "../validators/productValidator.js";

const router = Router();

router.use(requireAuth); // every route below requires a valid login

router.get("/", getProducts);
router.get("/:id", idParamValidator, validate, getProductById);
router.post("/", upload.single("image"), createProductValidator, validate, createProduct);
router.put("/:id", upload.single("image"), updateProductValidator, validate, updateProduct);
router.delete("/:id", idParamValidator, validate, deleteProduct);

export default router;
