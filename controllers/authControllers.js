import { AuthService, AuthError } from "../services/authService.js";

export async function register(req, res) {
    try {
        const result = await AuthService.register(req.body);
        res.status(201).json(result);
    } catch (err) {
        if (err instanceof AuthError) {
            return res.status(err.statusCode).json({ error: err.message });
        }
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function login(req, res) {
    try {
        const result = await AuthService.login(req.body);
        res.json(result);
    } catch (err) {
        if (err instanceof AuthError) {
            return res.status(err.statusCode).json({ error: err.message });
        }
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function logout(req, res) {
    res.status(200).json({ message: "Logged out" });
}
