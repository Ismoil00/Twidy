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
import useragent from "express-useragent";

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
app.use(useragent.express()); // to get information about user device

app.set("trust proxy", true); // it may be deleted later

// ROUTES - not authentication & authorization:
app.use("/auth", authRouter);

// ROUTES:
app.use("/profile", profileRouter);

// ERROR MIDDLEWARE:
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log("listening on port " + process.env.PORT)
);
