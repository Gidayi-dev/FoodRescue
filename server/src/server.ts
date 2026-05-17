import e from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config, configDotenv } from "dotenv";

configDotenv()
const app = e();
const PORT = process.env.PORT

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(e.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is healthy",
    uptime: process.uptime(),
  });
});

app.get("/", (req, res) => {
  res.send("Busia Food Rescue API running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});