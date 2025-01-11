import { CookieParams } from "./types";

export const cookieParams: CookieParams = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000,
};

export const cookieParamsWithoutAge: CookieParams = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
};
