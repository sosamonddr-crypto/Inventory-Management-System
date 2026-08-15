import { sequelize } from "../config/database.js";
import { AuthService } from "../services/authService.js";
import "../models/index.js";

// Usage: node scripts/createAdmin.js <username> <password>
const run = async () => {
    const [, , username, password] = process.argv;
    if (!username || !password) {
        console.error("Usage: node scripts/createAdmin.js <username> <password>");
        process.exit(1);
    }
    try {
        await sequelize.sync();
        const result = await AuthService.register({ username, password });
        console.log("Admin user created:", result.username);
        process.exit(0);
    } catch (err) {
        console.error("Failed to create admin:", err.message);
        process.exit(1);
    }
};

run();
