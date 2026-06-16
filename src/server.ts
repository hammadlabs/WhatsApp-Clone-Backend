import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import type { Application } from "express";
import cookieParser from "cookie-parser";
import { verifyAccessToken } from "./utils/jwt.util";
const app: Application = express();
const PORT = 3000;

//Routes Import
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoutes";

//Custom Middleware Import
import { authentication } from "./middlewares/authMiddleware";
import { logger } from "./middlewares/logger";

//MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(logger);

//CREATE HTTP SERVER
const httpServer = createServer(app);

//CREATING SOCKET SERVER
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//ROUTES
app.use("/auth", authRoutes);
app.use("/user", authentication, userRoutes);
app.use("/chat", authentication, chatRoutes);

//Socket Authentication Middleware
io.use((socket, next) => {
  const token = socket.handshake.headers["access_token"] as string;

  if (!token) {
    next(new Error("No Token given"));
  }
  console.log("Token Received: ", token);
  //Verify the token
  const isValid = verifyAccessToken(token);
  if (!isValid) {
    next(new Error("Authentication error"));
  }
});

//SOCKET EVENTS
io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);
  socket.send("Welcome to the Socket.IO server!");

  socket.on("disconnect", () => {
    console.log("A user disconnected: " + socket.id);
  });

  //CUSTOM EVENTS
  socket.on("userId", (data) => {
    console.log("User ID received: ", data);
  });

  socket.on("message", (data) => {
    console.log("Received message", data);
    socket.send("We receied the message ", data);
  });

  socket.on("report", (data) => {
    console.log("Received message", data);
    socket.send("We receied the report ", data);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { io };
