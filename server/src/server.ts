import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import dotenv from "dotenv";
import { corsOptions } from "./configs/cors";
import { credentials } from "./middlewares/handleCredentials";
import { errorHandler } from "./middlewares/handleErrors";
import { logger } from "./middlewares/handleLogEvents";
import { default as profileRouter } from "./routes/profile";
import { default as authRouter } from "./routes/auth";

const app = express();
dotenv.config();

// MIDDLEWARES:
app.use(logger); // saving all types [allowd/not-allowed] requests
app.use(cors(corsOptions));
app.use(credentials);
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES - not authentication & authorization:

// ROUTES:
app.use("/profile", profileRouter);
app.use("/auth", authRouter);

// ERROR MIDDLEWARE:
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log("listening on port " + process.env.PORT)
);
