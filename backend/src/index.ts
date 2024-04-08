import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import { createIO } from "./config/createIO";
import connectDB from "./config/db";

// App setup
const port = process.env.BACKEND_PORT || 3001;
const corsOptions = {
  origin: process.env.FRONTEND_URL || "",
};

const app = express();
const httpServer = createServer(app);
const io = createIO(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "",
  },
});

io.on("connection", socket => {
  console.log(`Socket connected: ${socket.id}`);
});

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

// Import routes
import ledRoute from "./routes/led.route";
import fanRoute from "./routes/fan.route";
// import lightRoute from "./routes/light.route";

// Binding routes
app.use("/api/v1/led", ledRoute);
app.use("/api/v1/fan", fanRoute);
// app.use("/api/v1/light", lightRoute);

// Default error handler
app.use(
  (
    err: Error & { status: number },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err);
    res.status(err.status || 500).json({
      message: err.message || "Server is down! Please try again later!",
    });
  }
);

// Listening for requests
httpServer.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}...`);
});

connectDB();
