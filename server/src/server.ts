import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import { corsOptions } from "./configs/cors";
import { credentials } from "./middlewares/handleCredentials";
import dotenv from "dotenv";

const app = express();
dotenv.config();

// MIDDLEWARES:
app.use(cors(corsOptions));
app.use(credentials);
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES:

app.listen(process.env.PORT, () =>
  console.log("listening on port " + process.env.PORT)
);
