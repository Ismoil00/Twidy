import { Request, Response } from "express";
import { cookieParamsWithoutAge } from "../../helpers/constants";

const cleanCookies = async (req: Request, res: Response) => {
  res.clearCookie("refreshToken", cookieParamsWithoutAge);
  res.sendStatus(204);
};

export default cleanCookies;
