import "./config/env.ts";
import e from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import userRoutes from "./routes/userRoutes.ts";
import { healthCheck, rootHandler } from "./controllers/healthControllers.ts";
import { notFound, errorHandler } from "./middleware/errorHandler.ts";

const app = e();
const PORT = process.env.PORT || 4000;

// Core middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(e.json());

// Routes
app.get("/", rootHandler);
app.get("/api/health", healthCheck);
app.use("/api/users", userRoutes);

// Error handling (must be last)
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});