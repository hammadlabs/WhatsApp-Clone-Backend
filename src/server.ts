import express from "express";
import type { Application } from "express";
const app: Application = express();
const PORT = 3000;
import authRoutes from "./routes/authRoutes";

//MIDDLEWARE
app.use(express.json());

//ROUTES
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
