import express from "express";
import cors from "cors";
import "./models/index.js";
import { loggers } from "./middlewares/loggers.js";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use(loggers);
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serves uploaded product images

app.get("/", (req, res) => {
    res.send("api running");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/suppliers", supplierRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
