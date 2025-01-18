import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers["Authorization"] as string;

  if (!accessToken || !accessToken?.startsWith("Bearer ")) {
    res.status(403).json({
      msg: !accessToken ? "No token provided" : "Invalid Access-Token",
      redirect: "/login",
    });
    return;
  }

  const token = accessToken.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (error, decoded) => {
    if (!error) {
      next();
      return;
    }

    if (error.name === "TokenExpiredError") {
      res.status(401).json({ msg: "Access-Token has expired" });
      return;
    }

    res.status(403).json({
      msg: "Verification failed. Invalid Access-Token",
      redirect: "/login",
    });
  });
};

export default verifyAccessToken;
