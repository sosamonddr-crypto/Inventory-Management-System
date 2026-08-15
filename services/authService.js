import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { config } from "../config/index.js";

export class AuthError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = "AuthError";
        this.statusCode = statusCode;
    }
}

function issueToken(user) {
    const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, {
        expiresIn: "1d",
    });
    return { token, id: user.id, username: user.username };
}

export const AuthService = {
    register: async ({ username, password }) => {
        if (!username || !password) {
            throw new AuthError("Username and password are required", 400);
        }
        const existing = await User.findOne({ where: { username } });
        if (existing) {
            throw new AuthError("Username already taken", 409);
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, passwordHash });
        return issueToken(user);
    },

    login: async ({ username, password }) => {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            throw new AuthError("Invalid username or password", 401);
        }
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
            throw new AuthError("Invalid username or password", 401);
        }
        return issueToken(user);
    },
};
