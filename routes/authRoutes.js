import { Router } from "express";
import { register, login, logout } from "../controllers/authControllers.js";
import { validate } from "../middlewares/validate.js";
import { registerValidator, loginValidator } from "../validators/authValidator.js";

const router = Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);
router.post("/logout", logout);

export default router;
