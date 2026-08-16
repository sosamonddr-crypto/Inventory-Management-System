import express from "express";
import cors from "cors";
import "./models/index.js";
import { loggers } from "./middlewares/loggers.js";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import { AuthService } from "./services/authService.js";

const app = express();

app.use(
    cors({
        origin: "https://inventory-frontend-yzun.onrender.com",
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use(loggers);
app.use(express.json());
app.use("/uploads", express.static("uploads"));s

app.get("/", (req, res) => {
    res.send("api running");
});


app.get("/setup-admin", async (req, res) => {
    try {
        const result = await AuthService.register({ username: "liveadmin", password: "YourPassword123" });
        res.json({ message: "Admin created", username: result.username });
    } catch (err) {
        res.json({ error: err.message });
    }
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/suppliers", supplierRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;