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
import verifyAccessToken from "./middlewares/verifyAccessToken";
import { GET_ALL_SESSIONS } from "./helpers/queries";
import { query } from "./configs/db";

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
app.use(verifyAccessToken);
app.use("/profile", profileRouter);

app.post("/session", async function (req, res) {
  try {
    console.log("METHOD: ", req.method)
    const response = await query(GET_ALL_SESSIONS);
    if (response.status !== 200) throw response;
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ERROR MIDDLEWARE:
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log("listening on port " + process.env.PORT)
);
