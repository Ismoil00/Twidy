import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
const fsPromise = fs.promises;

export const logEvents = async (message: string, fileName: string) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      fsPromise.mkdir(path.join(__dirname, "..", "logs"));
    }

    await fsPromise.appendFile(
      path.join(__dirname, "..", "logs", fileName),
      logItem
    );
  } catch (error) {
    console.error("Error writing Log Event:", error);
  }
};

export const logger = (req: Request, res: Response, next: NextFunction) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  console.log(`${req.method} ${req.path}`);
  next();
};
