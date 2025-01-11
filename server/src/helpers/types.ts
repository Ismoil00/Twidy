type UUID = string;

export type User4Params = ["userId", "firstname", "lastname", "description"];

export interface CookieParams {
  httpOnly: true;
  secure: true;
  sameSite: "strict";
  maxAge?: number;
}
