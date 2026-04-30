import express from "express";
import cors from "cors";
import router from "./routes/index.route.js";
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./docs/swagger.js";

const app = express();

app.use(cors());
app.use(express.json()); 

app.get("/", (req, res) => {
  res.send("Server is running");
});

// swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", router);

export default app;