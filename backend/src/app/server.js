import app from "./app.js";
import dotenv from "dotenv";
import { initModels } from "../database/index.js";

dotenv.config();

const port = process.env.PORT || 5000;

// Initialize Database Models and start server
try {
    await initModels();
    app.listen(port, () => {
        console.log(`🚀 Server running on http://localhost:${port}`);
    });
} catch (error) {
    console.error("❌ Failed to initialize database:", error);
    process.exit(1);
}
