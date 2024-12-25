import { Request, Response, NextFunction } from "express";

const allowedOrigins: string[] = JSON.parse(process.env.ALLOWED_ORIGINS);

export const credentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const origin: string = req.headers.origin || "";

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Expose-Headers", "authorization");

    next();
  } else {
    console.warn(`Blocked CORS request from origin: ${origin}`);
    res.status(403).json({ message: "CORS policy: Access denied" });
  }
};
