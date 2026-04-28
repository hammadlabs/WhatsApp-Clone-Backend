import express from "express";
import type { Application } from "express";
import cookieParser from "cookie-parser";
const app: Application = express();
const PORT = 3000;
import authRoutes from "./routes/authRoutes";

//MIDDLEWARE
app.use(express.json());
app.use(cookieParser());

//ROUTES
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
