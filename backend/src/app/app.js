import express from "express";
import cors from "cors";
import router from "./routes.js";
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "../docs/swagger.js";
import { errorHandler, notFound } from "../shared/middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json()); 

app.get("/", (req, res) => {
  res.send("Server is running");
});

// swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", router);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;