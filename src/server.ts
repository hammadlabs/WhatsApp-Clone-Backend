import express from "express";
import session from "express-session";
import type { Application } from "express";
import cookieParser from "cookie-parser";
const app: Application = express();
const PORT = 3000;
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import { authentication } from "./middlewares/authMiddleware";
import { logger } from "./middlewares/logger";

//MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(logger);
// app.use(
//   session({
//     secret: "Your Secret key",
//     resave: false,
//     saveUninitialized: true,
//     rolling: true,
//   }),
// );

//ROUTES
app.use("/auth", authRoutes);
app.use("/user", authentication, userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
