import { Request, Response, NextFunction } from "express";
import { logEvents } from "./handleLogEvents";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logEvents(`${err.name}: ${err.message}`, "errLogs.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
};
