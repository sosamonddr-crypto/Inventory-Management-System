import { ProductService } from "../services/productService.js";

export async function getProducts(req, res) {
    const products = await ProductService.getAllProducts(req.query);
    res.json(products);
}

export async function getProductById(req, res) {
    const product = await ProductService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "not found" });
    res.json(product);
}

export async function createProduct(req, res) {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const product = await ProductService.createProduct({ ...req.body, imageUrl });
    res.status(201).json(product);
}

export async function updateProduct(req, res) {
    const data = { ...req.body };
    if (req.file) {
        data.imageUrl = `/uploads/${req.file.filename}`;
    }
    const updated = await ProductService.updateProduct(req.params.id, data);
    if (!updated) return res.status(404).json({ message: "not found" });
    res.json(updated);
}

export async function deleteProduct(req, res) {
    const deleted = await ProductService.deleteProduct(req.params.id);
    if (!deleted) return res.status(404).json({ message: "not found" });
    res.status(204).send();
}
