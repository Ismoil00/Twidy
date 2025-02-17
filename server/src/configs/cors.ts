import { CorsOptions } from "./types";
import dotenv from "dotenv";
dotenv.config();

const allowedOrigins: string[] = JSON.parse(process.env.ALLOWED_ORIGINS);

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error(`CORS Error: Origin ${origin} is not allowed.`);
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false,
};
