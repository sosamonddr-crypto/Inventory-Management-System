import { SupplierService } from "../services/supplierService.js";

export async function getSuppliers(req, res) {
    res.json(await SupplierService.getAllSuppliers());
}

export async function getSupplierById(req, res) {
    const supplier = await SupplierService.getSupplierById(req.params.id);
    if (!supplier) return res.status(404).json({ message: "not found" });
    res.json(supplier);
}

export async function createSupplier(req, res) {
    const supplier = await SupplierService.createSupplier(req.body);
    res.status(201).json(supplier);
}

export async function updateSupplier(req, res) {
    const updated = await SupplierService.updateSupplier(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "not found" });
    res.json(updated);
}

export async function deleteSupplier(req, res) {
    const deleted = await SupplierService.deleteSupplier(req.params.id);
    if (!deleted) return res.status(404).json({ message: "not found" });
    res.status(204).send();
}
