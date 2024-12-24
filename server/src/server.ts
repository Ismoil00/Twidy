import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import { corsOptions } from "./configs/cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.listen(process.env.PORT, () =>
  console.log("listening on port " + process.env.PORT)
);
