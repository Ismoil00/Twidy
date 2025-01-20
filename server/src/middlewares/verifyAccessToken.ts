import { Request, Response, NextFunction } from "express";
import { cookieParamsWithoutAge } from "../helpers/constants";
import jwt from "jsonwebtoken";
import { query } from "../configs/db";
import { DEELTE_SESSION_VIA_REFRESHTOKEN } from "../helpers/queries";

const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.headers["authorization"] as string;
    const refreshToken: string = req.cookies["refreshToken"];

    if (!accessToken || !accessToken?.startsWith("BearerS ")) {
      const clearRefToken = await clearRefreshToken(res, refreshToken);
      if (clearRefToken) throw clearRefToken;

      res.status(403).statusMessage = "RedirectToLoginPage";
      res.json({
        msg: !accessToken ? "No token provided" : "Invalid Access-Token",
        redirect: "/login",
      });
      return;
    }

    const token = accessToken.split(" ")[1];
    let error = undefined;
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      async (error, decoded) => {
        if (!error) {
          next();
          return;
        }

        if (error.name === "TokenExpiredError") {
          res.status(401).statusMessage = "TokenExpiredError";
          res.json({ msg: "Access-Token has expired" });
          return;
        }

        const clearRefToken = await clearRefreshToken(res, refreshToken);
        if (clearRefToken) {
          error = clearRefToken;
          return;
        }

        res.status(403).statusMessage = "RedirectToLoginPage";
        res.json({
          msg: "Verification failed. Invalid Access-Token",
          redirect: "/login",
        });
      }
    );

    if (error) throw error;
  } catch (error) {
    console.error("ERROR in Access-Token Verification: ", error);
    res.status(500).json({ msg: `Internal Server Error: ${error}` });
  }
};

async function clearRefreshToken(res: Response, token: string) {
  let error = undefined;
  if (token) {
    res.clearCookie("refreshToken", cookieParamsWithoutAge);
    const sessionDeleted = await query(DEELTE_SESSION_VIA_REFRESHTOKEN, [
      token,
    ]);
    if (sessionDeleted.status !== 200) error = sessionDeleted;
  }
  return error;
}

export default verifyAccessToken;
