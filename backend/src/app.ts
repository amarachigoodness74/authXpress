import express, { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import compression from "compression";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import { connectDB, corsOptions } from "./utils";
import { acountLimiter } from "./middlewares";

const app = express();

// Middleware
app.use(
  acountLimiter,
  cors(corsOptions),
  compression(),
  express.json(),
  express.urlencoded({ extended: false })
);

// Routes
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send({ message: "Welcome 🐻" });
});

app.get("/healthcheck", (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createError.NotFound());
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    status: "error",
    errors: err.message,
  });
});

// Connect to MongoDB
connectDB();

export default app;
