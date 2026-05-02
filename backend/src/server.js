import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 5000;

// Connect to database before starting server
await connectDB();

app.listen(port, () => {
    console.log(`Server run on http://localhost:${port}`);
});

